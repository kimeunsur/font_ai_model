from PIL import Image, ImageDraw, ImageFont
import os, cv2
import numpy as np

def augment_image(image):
    angle = np.random.uniform(-15, 15)
    h, w = image.shape[:2]
    M = cv2.getRotationMatrix2D((w//2, h//2), angle, 1)
    rotated = cv2.warpAffine(image, M, (w, h), borderValue=255)

    noise = np.random.normal(0, 10, image.shape).astype(np.int16)
    rotated = rotated.astype(np.int16)
    noisy_image = np.clip(rotated + noise, 0, 255).astype(np.uint8)  # clip 사용
    
    offset = 10
    pts1 = np.float32([[0, 0], [w - 1, 0], [0, h - 1]])
    pts2 = np.float32([[0 + offset, 0 + offset], [w - 1 - offset, 0], [0, h - 1 - offset]])

    M = cv2.getAffineTransform(pts1, pts2)
    distorted = cv2.warpAffine(noisy_image, M, (w, h), borderValue=255)

    return distorted


# 출력 폴더 생성
output_dir = "font_images/font_dataset"
os.makedirs(output_dir, exist_ok=True)

# 사용할 폰트 파일과 텍스트
font_dir = "/Users/kimeunsur/2024winter/4주차/font_ai_model/ai_model/src/more_font"  # 폰트 파일 경로
text_file = "/Users/kimeunsur/2024winter/4주차/font_ai_model/ai_model/src/training_text.txt"

if not os.path.exists(text_file):
    print(f"Error: Text file not found - {text_file}")
    exit()

if not os.path.exists(font_dir):
    print(f"Error: Font directory not found - {font_dir}")
    exit()

try:
    with open(text_file, "r", encoding="utf-8") as f:
        text = f.read().strip()  # 파일의 내용을 읽고 공백 제거
except FileNotFoundError:
    print(f"Error: File not found - {text_file}")
    text = ""

if not text:
    print("Error: No text found in the file.")
    exit()


font_files = [f for f in os.listdir(font_dir) if f.endswith(".ttf")]
if not font_files:
    print(f"No font files found in directory: {font_dir}")
else:
    print(f"Found {len(font_files)} font files.")

# 이미지 생성
for font_index, font_file in enumerate(font_files):
    font_path = os.path.join(font_dir, font_file)
    # 각 폰트 스타일 디렉토리 생성
    font_output_dir = os.path.join(output_dir, f"font_{font_index}")
    os.makedirs(font_output_dir, exist_ok=True)
    
    print(f"Processing font: {font_file} -> Saving to {font_output_dir}")
    for char_index, char in enumerate(text):
        img = Image.new("L", (128, 128), color=255)  # 흰 배경 이미지 생성
        draw = ImageDraw.Draw(img)
        try:
            font = ImageFont.truetype(font_path, 100)  # 폰트 설정
        except OSError as e:
            print(f"error loading font {font_file}: {e}")
            continue
        
        # 텍스트 크기 계산 (textbbox 사용)
        bbox = draw.textbbox((0, 0), char, font=font)  # (xmin, ymin, xmax, ymax) 반환
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]


        # 중앙 배치 좌표 계산
        x_pos = (128 - text_width) // 2
        y_pos = (128 - text_height) // 2

        draw.text((x_pos, y_pos), char, fill=0, font=font)  # 글자 그리기

        img_np = np.array(img)
        img_to_save = Image.fromarray(img_np)
        save_path = os.path.join(font_output_dir, f"img_{char_index}.png")
        img_to_save.save(save_path)
        
        augmented_img = augment_image(img_np)
        augmented_img = Image.fromarray(augmented_img)
        augmented_save_path = os.path.join(font_output_dir, f"augmented_img_{char_index}.png")
        augmented_img.save(augmented_save_path)
print("All images generated successfully.")