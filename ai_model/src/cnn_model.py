from tensorflow.keras import layers, Model

# Encoder
input_img = layers.Input(shape=(64, 64, 1))
x = layers.Conv2D(32, (3, 3), activation='relu', padding='same')(input_img)
x = layers.MaxPooling2D((2, 2))(x)
x = layers.Conv2D(64, (3, 3), activation='relu', padding='same')(x)
encoded = layers.MaxPooling2D((2, 2))(x)

num_styles = 100
# Style Embedding
style_input = layers.Input(shape=(num_styles,))
style_embedding = layers.Dense(128, activation='relu')(style_input)

# Decoder
x = layers.Conv2DTranspose(64, (3, 3), activation='relu', padding='same')(encoded)
x = layers.UpSampling2D((2, 2))(x)
x = layers.Conv2DTranspose(32, (3, 3), activation='relu', padding='same')(x)
x = layers.UpSampling2D((2, 2))(x)
decoded = layers.Conv2DTranspose(1, (3, 3), activation='sigmoid', padding='same')(x)

# 모델 생성
model = Model([input_img, style_input], decoded)
model.compile(optimizer='adam', loss='mse', metrics=['accuracy'])


import numpy as np
from tensorflow.keras.utils import to_categorical

# 가상의 데이터 생성
num_samples = 100  # 데이터 샘플 수
X_gothic = np.random.rand(num_samples, 64, 64, 1)  # 고딕체 이미지 (입력)
Y_target = np.random.rand(num_samples, 64, 64, 1)  # 타겟 폰트 이미지 (출력)

# 스타일 레이블 생성
style_labels = np.random.randint(0, num_styles, size=(num_samples,))
style_one_hot = to_categorical(style_labels, num_classes=num_styles)  # 원-핫 인코딩

# 정규화 (픽셀 값을 [0, 1]로 스케일링)
X_gothic = X_gothic / 255.0
Y_target = Y_target / 255.0