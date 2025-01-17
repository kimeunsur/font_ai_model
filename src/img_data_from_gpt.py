from PIL import Image, ImageDraw, ImageFont
import os

# 출력 폴더 생성
output_dir = "font_images"
os.makedirs(output_dir, exist_ok=True)

# 사용할 폰트 파일과 텍스트
font_path = "/usr/share/fonts/truetype/dejavu/AppleGothic.ttf"  # 폰트 파일 경로
text = "쩱붟뢁얇겮셸맽뫾햩쇔굿횿캶뿞모톤쭙퀔폿혁뻃솭봈삢챝료꿾햭괐쑎"

# 이미지 생성
for char in text:
    img = Image.new("L", (64, 64), color=255)  # 흰 배경 이미지 생성
    draw = ImageDraw.Draw(img)
    font = ImageFont.truetype(font_path, 48)  # 폰트 설정
    # 텍스트 크기 계산
    bbox = font.getbbox(char)  # (xmin, ymin, xmax, ymax) 반환
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    position = ((64 - text_width) // 2, (64 - text_height) // 2)
    draw.text(position, char, fill=0, font=font)  # 문자 그리기
    img.save(f"{output_dir}/{char}.png")  # 저장