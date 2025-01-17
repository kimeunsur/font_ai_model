from PIL import Image, ImageDraw, ImageFont
import os

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
        img = Image.new("L", (64, 64), color=255)  # 흰 배경 이미지 생성
        draw = ImageDraw.Draw(img)
        try:
            font = ImageFont.truetype(font_path, 48)  # 폰트 설정
        except OSError as e:
            print(f"error loading font {font_file}: {e}")
            continue
        # 텍스트 크기 계산
        bbox = font.getbbox(char)  # (xmin, ymin, xmax, ymax) 반환
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        position = ((64 - text_width) // 2, (64 - text_height) // 2)
        draw.text(position, char, fill=0, font=font)  # 문자 그리기
        img.save(f"{output_dir}/{char}{cnt}.png")  # 저장