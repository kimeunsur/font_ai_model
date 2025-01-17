from PIL import Image, ImageDraw, ImageFont
import numpy as np
import cv2, os
def create_image_template_with_korean_text(height, width, channels=3):
    """
    한국어 텍스트를 포함한 이미지 템플릿 생성.
    
    Parameters:
    - height: 이미지 높이
    - width: 이미지 너비
    - channels: 채널 수 (1 = 흑백, 3 = 컬러)
    
    Returns:
    - template: 생성된 이미지 템플릿 (NumPy 배열)
    """
    # 빈 이미지 생성 (흰 배경)
    template = np.ones((height, width, channels), dtype=np.uint8) * 255

    # OpenCV를 사용해 격자 및 중앙 사각형 추가
    grid_color = (200, 200, 200)  # 그리드 색상 (회색)
    step = 50
    for x in range(0, width, step):
        cv2.line(template, (x, 0), (x, height), grid_color, 1)
    for y in range(0, height, step):
        cv2.line(template, (0, y), (width, y), grid_color, 1)

    # 중앙 사각형
    rect_color = (0, 0, 255)
    rect_thickness = 2
    top_left = (width // 4, height // 4)
    bottom_right = (3 * width // 4, 3 * height // 4)
    cv2.rectangle(template, top_left, bottom_right, rect_color, rect_thickness)

    # OpenCV 이미지를 Pillow 이미지로 변환
    template_pil = Image.fromarray(cv2.cvtColor(template, cv2.COLOR_BGR2RGB))

    # Pillow로 한국어 텍스트 추가
    draw = ImageDraw.Draw(template_pil)
    font_path = "data/NanumGothic.ttf"  # 사용 가능한 한글 폰트 경로
    if not os.path.exists(font_path):
        print(f"Font file not found at {font_path}")
        exit(1)
    font = ImageFont.truetype(font_path, 40)  # 폰트 크기 설정
    text = "수"  # 한국어 텍스트

    # 텍스트 경계 계산
    bbox = font.getbbox(text)  # (xmin, ymin, xmax, ymax)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    # 텍스트 중앙 배치
    text_position = ((width - text_width) // 2, (height - text_height) // 2)
    draw.text(text_position, text, fill=(0, 0, 0), font=font)

    # Pillow 이미지를 OpenCV 이미지로 변환
    template = cv2.cvtColor(np.array(template_pil), cv2.COLOR_RGB2BGR)

    return template

# 템플릿 생성 및 저장
img1_template = create_image_template_with_korean_text(512, 512, 3)
cv2.imwrite("data/img2_template_korean_fixed.png", img1_template)