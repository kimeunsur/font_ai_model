import cv2
import numpy as np

def augment_image(image):
    # 회전
    angle = np.random.uniform(-15, 15)
    h, w = image.shape[:2]
    M = cv2.getRotationMatrix2D((w//2, h//2), angle, 1)
    rotated = cv2.warpAffine(image, M, (w, h), borderValue=255)

    # 노이즈 추가
    noise = np.random.normal(0, 10, image.shape).astype(np.uint8)
    noisy_image = cv2.add(rotated, noise)

    # 왜곡
    pts1 = np.float32([[5, 5], [20, 5], [5, 20]])
    pts2 = np.float32([[5, 10], [20, 5], [5, 25]])
    M = cv2.getAffineTransform(pts1, pts2)
    distorted = cv2.warpAffine(noisy_image, M, (w, h), borderValue=255)

    return distorted

import cv2
import numpy as np
import os

def augment_image(image):
    # 회전
    angle = np.random.uniform(-15, 15)
    h, w = image.shape[:2]
    M = cv2.getRotationMatrix2D((w//2, h//2), angle, 1)
    rotated = cv2.warpAffine(image, M, (w, h), borderValue=255)

    # 노이즈 추가
    noise = np.random.normal(0, 10, image.shape).astype(np.uint8)
    noisy_image = cv2.add(rotated, noise)

    # 왜곡
    pts1 = np.float32([[5, 5], [20, 5], [5, 20]])
    pts2 = np.float32([[5, 10], [20, 5], [5, 25]])
    M = cv2.getAffineTransform(pts1, pts2)
    distorted = cv2.warpAffine(noisy_image, M, (w, h), borderValue=255)

    return distorted

# 폴더 내 모든 파일 처리
input_folder = "font_images"
output_folder = "augmented_images"
os.makedirs(output_folder, exist_ok=True)

for file_name in os.listdir(input_folder):
    if file_name.endswith(".png"):
        input_path = os.path.join(input_folder, file_name)
        output_path = os.path.join(output_folder, file_name)

        # 이미지 읽기
        image = cv2.imread(input_path, cv2.IMREAD_GRAYSCALE)
        if image is not None:
            # 이미지 증강
            augmented = augment_image(image)
            # 결과 저장
            cv2.imwrite(output_path, augmented)

print(f"증강된 이미지는 '{output_folder}' 폴더에 저장되었습니다.")