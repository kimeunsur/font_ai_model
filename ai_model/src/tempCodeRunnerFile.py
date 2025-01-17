from PIL import Image, ImageDraw, ImageFont
import os

# 출력 폴더 생성
output_dir = "font_images/nanumgothic"
os.makedirs(output_dir, exist_ok=True)

# 사용할 폰트 파일과 텍스트
font_path = "NanumGothic.ttf"  # 폰트 파일 경로
text = "툚껱톛쾽음뾁쳲뙒꺫뚱쨏럗쎔봖교캖욿꺆뎾팵퀎쐒튕뛤챷떝썂뎓퐘뽺"
import os
print("Font path exists:", os.path.exists(font_path))
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