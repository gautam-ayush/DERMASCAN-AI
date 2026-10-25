import os
import json
import numpy as np
import pandas as pd
import tensorflow as tf
import matplotlib.pyplot as plt

from sklearn.metrics import (
    classification_report,
    confusion_matrix,
    ConfusionMatrixDisplay,
    accuracy_score
)


# ============================================================
# CONFIG
# ============================================================

MODEL_PATH = "model/best_model.keras"

TEST_CSV = "model/test.csv"

CLASSES_PATH = "model/classes.json"

IMG_SIZE = (224, 224)

BATCH_SIZE = 16


# ============================================================
# LOAD CLASSES
# ============================================================

with open(
    CLASSES_PATH,
    "r"
) as f:

    class_names = json.load(f)


NUM_CLASSES = len(class_names)


# ============================================================
# LOAD TEST DATA
# ============================================================

test_data = pd.read_csv(
    TEST_CSV
)

print(
    "Test images:",
    len(test_data)
)


# ============================================================
# LOAD IMAGE
# ============================================================

def load_image(path, label):

    image = tf.io.read_file(path)

    image = tf.image.decode_image(
        image,
        channels=3,
        expand_animations=False
    )

    image = tf.image.resize(
        image,
        IMG_SIZE
    )

    image = tf.cast(
        image,
        tf.float32
    )

    return image, label


# ============================================================
# CREATE DATASET
# ============================================================

dataset = tf.data.Dataset.from_tensor_slices(

    (
        test_data["path"].values,
        test_data["label"].values
    )

)

dataset = dataset.map(
    load_image,
    num_parallel_calls=tf.data.AUTOTUNE
)

dataset = dataset.batch(
    BATCH_SIZE
)

dataset = dataset.prefetch(
    tf.data.AUTOTUNE
)


# ============================================================
# LOAD MODEL
# ============================================================

print("\nLoading model...")

model = tf.keras.models.load_model(
    MODEL_PATH
)


# ============================================================
# PREDICTIONS
# ============================================================

print("Running predictions...")

predictions = model.predict(
    dataset,
    verbose=1
)

predicted_labels = np.argmax(
    predictions,
    axis=1
)

true_labels = test_data[
    "label"
].values


# ============================================================
# ACCURACY
# ============================================================

accuracy = accuracy_score(
    true_labels,
    predicted_labels
)

print("\n")
print("=" * 60)
print("MODEL EVALUATION")
print("=" * 60)

print(
    f"\nTest Accuracy: {accuracy * 100:.2f}%"
)


# ============================================================
# CLASSIFICATION REPORT
# ============================================================

report = classification_report(

    true_labels,

    predicted_labels,

    target_names=class_names,

    digits=4,

    zero_division=0
)

print("\nClassification Report:")
print("----------------------")

print(report)


# ============================================================
# SAVE REPORT
# ============================================================

with open(
    "model/classification_report.txt",
    "w"
) as f:

    f.write(
        f"Test Accuracy: {accuracy * 100:.2f}%\n\n"
    )

    f.write(
        report
    )


# ============================================================
# CONFUSION MATRIX
# ============================================================

cm = confusion_matrix(

    true_labels,

    predicted_labels
)


plt.figure(figsize=(10, 8))

disp = ConfusionMatrixDisplay(

    confusion_matrix=cm,

    display_labels=class_names
)

disp.plot(
    xticks_rotation=45
)

plt.title(
    "Skin Disease Classification - Confusion Matrix"
)

plt.tight_layout()

plt.savefig(
    "model/confusion_matrix.png",
    dpi=300
)

plt.close()


# ============================================================
# MOST COMMON ERRORS
# ============================================================

print("\nConfusion Matrix:")
print(cm)


# ============================================================
# FINAL
# ============================================================

print("\n")
print("=" * 60)
print("EVALUATION COMPLETE")
print("=" * 60)

print("\nSaved:")
print("model/classification_report.txt")
print("model/confusion_matrix.png")