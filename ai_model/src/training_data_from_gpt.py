from PIL import Image, ImageDraw, ImageFont
import os, cv2
import numpy as np
def augment_image(image):
    angle = np.random.uniform(-15, 15)
    h, w = image.shape[:2]
    M = cv2.getRotationMatrix2D((w//2, h//2), angle, 1)
    rotated = cv2.warpAffine(image, M, (w, h), borderValue=255)

    noise = np.random.normal(0, 10, image.shape).astype(np.uint8)
    noisy_image = cv2.add(rotated, noise)

    pts1 = np.float32([[5, 5], [20, 5], [5, 20]])
    pts2 = np.float32([[5, 10], [20, 5], [5, 25]])
    M = cv2.getAffineTransform(pts1, pts2)
    distorted = cv2.warpAffine(noisy_image, M, (w, h), borderValue=255)

    return distorted


# 출력 폴더 생성
output_dir = "font_images/font_dataset"
os.makedirs(output_dir, exist_ok=True)

# 사용할 폰트 파일과 텍스트
font_dir = "/Users/kimeunsur/2024winter/4주차/font_ai_model/ai_model/src/more_font"  # 폰트 파일 경로
text_file = "/Users/kimeunsur/2024winter/4주차/font_ai_model/ai_model/src/training_text.txt"
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

cnt = 0
# 이미지 생성
for font_file in font_files:
    font_path = os.path.join(font_dir, font_file)
    print(f"processing font: {font_file}")
    cnt += 1
    for char in text:
        img = Image.new("L", (256, 256), color=255)  # 흰 배경 이미지 생성
        draw = ImageDraw.Draw(img)
        try:
            font = ImageFont.truetype(font_path, 200)  # 폰트 설정
        except OSError as e:
            print(f"error loading font {font_file}: {e}")
            continue
        # 텍스트 크기 계산
        bbox = font.getbbox(char)  # (xmin, ymin, xmax, ymax) 반환
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        position = ((256 - text_width) // 2, (256 - text_height) // 2)
        draw.text(position, char, fill=0, font=font)  # 문자 그리기
        img.save(f"{output_dir}/{char}{cnt}.png")  # 저장