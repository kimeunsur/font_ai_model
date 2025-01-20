from PIL import Image, ImageDraw, ImageFont
import os

# 출력 폴더 생성
output_dir = "font_images/nanumgothic"
os.makedirs(output_dir, exist_ok=True)

# 사용할 폰트 파일과 텍스트
font_file = "/Users/kimeunsur/2024winter/4주차/font_ai_model/ai_model/src/NanumGothic.ttf"  # 폰트 파일 경로
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


for char in text:
    img = Image.new("L", (128,128), color = 255)
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype(font_file, 100)  # 폰트 설정
    except OSError as e:
        print(f"error loading font {font_file}: {e}")
        continue

        # 텍스트 크기 계산
    bbox = font.getbbox(char)  # (xmin, ymin, xmax, ymax) 반환
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    position = ((128 - text_width) // 2, (128 - text_height) // 2)
    draw.text(position, char, fill=0, font=font)  # 문자 그리기
    img.save(f"{output_dir}/{char}.png")  # 저장