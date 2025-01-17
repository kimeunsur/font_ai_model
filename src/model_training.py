import tensorflow as tf
from tensorflow.keras import layers, models

# 간단한 CNN 모델
model = models.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(64, 64, 1)),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dense(30, activation='softmax')  # 문자 분류
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# 데이터 준비
from tensorflow.keras.preprocessing.image import ImageDataGenerator

datagen = ImageDataGenerator(rescale=1./255)
train_generator = datagen.flow_from_directory(
    "font_images/",
    target_size=(64, 64),
    color_mode='grayscale',
    class_mode='categorical'
)

# 모델 학습
model.fit(train_generator, epochs=10)