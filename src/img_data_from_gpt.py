from PIL import Image, ImageDraw, ImageFont
import os

# 출력 폴더 생성
output_dir = "font_images"
os.makedirs(output_dir, exist_ok=True)

# 사용할 폰트 파일과 텍스트
font_path = "/usr/share/fonts/truetype/dejavu/AppleGothic.ttf"  # 폰트 파일 경로
text = "음떬툮굅뿐춗퇘옦펧섷볇륩쐤쎔샬뎧랭꺫뇨꺆믭뙒뛤쨏쨪쫪윻타썂꽙맔뚱퇋쐐쳋겲봖뢁툳팑영교롦껱쳲릂쾽죲팵흭귛픝떝옞퇝룣낻캹쁚뎓캖럗촓뾁볂쪡뿪톛챷뎾홪튕솓횣휧퍗빞띮욿괭쐒콺쮛훎헛톄뽺퐘짿냁둅툚쵺뒆힙퀎놮뚮벓콘"

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