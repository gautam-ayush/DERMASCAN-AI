import os
import sys
import json
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt

from tensorflow.keras.utils import load_img
from tensorflow.keras.utils import img_to_array


# ============================================================
# CONFIG
# ============================================================

MODEL_PATH = "model/best_model.keras"

CLASSES_PATH = "model/classes.json"

IMG_SIZE = (224, 224)


# ============================================================
# CHECK ARGUMENT
# ============================================================

if len(sys.argv) < 2:

    print("\nUsage:")

    print(
        "python predict.py path/to/image.jpg"
    )

    sys.exit()


IMAGE_PATH = sys.argv[1]


# ============================================================
# CHECK IMAGE
# ============================================================

if not os.path.exists(IMAGE_PATH):

    print(
        f"\nImage not found: {IMAGE_PATH}"
    )

    sys.exit()


# ============================================================
# LOAD MODEL
# ============================================================

print("\nLoading model...")

model = tf.keras.models.load_model(
    MODEL_PATH
)


# ============================================================
# LOAD CLASSES
# ============================================================

with open(
    CLASSES_PATH,
    "r"
) as f:

    class_names = json.load(f)


# ============================================================
# LOAD IMAGE
# ============================================================

image = load_img(

    IMAGE_PATH,

    target_size=IMG_SIZE
)


image_array = img_to_array(
    image
)


image_array = np.expand_dims(

    image_array,

    axis=0
)


# ============================================================
# PREDICTION
# ============================================================

predictions = model.predict(

    image_array,

    verbose=0
)[0]


# ============================================================
# SORT PREDICTIONS
# ============================================================

sorted_indices = np.argsort(
    predictions
)[::-1]


# ============================================================
# MAIN PREDICTION
# ============================================================

predicted_index = sorted_indices[0]

predicted_class = class_names[
    predicted_index
]

confidence = predictions[
    predicted_index
] * 100


# ============================================================
# DISPLAY RESULT
# ============================================================

print("\n")
print("=" * 60)
print("SKIN DISEASE PREDICTION")
print("=" * 60)

print(
    f"\nPrediction: {predicted_class}"
)

print(
    f"Confidence: {confidence:.2f}%"
)


# ============================================================
# TOP 3
# ============================================================

print("\nTop 3 predictions:")
print("-------------------")

for index in sorted_indices[:3]:

    print(
        f"{class_names[index]:30s}"
        f"{predictions[index] * 100:.2f}%"
    )


# ============================================================
# ALL PREDICTIONS
# ============================================================

print("\nAll class probabilities:")
print("------------------------")

for index in sorted_indices:

    print(
        f"{class_names[index]:30s}"
        f"{predictions[index] * 100:.2f}%"
    )


# ============================================================
# SHOW IMAGE
# ============================================================

plt.figure(figsize=(6, 6))

plt.imshow(image)

plt.axis("off")

plt.title(
    f"{predicted_class}\n"
    f"Confidence: {confidence:.2f}%"
)

plt.tight_layout()

plt.show()