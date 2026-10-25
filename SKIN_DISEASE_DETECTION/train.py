import os
import json
import random
import numpy as np
import pandas as pd
import tensorflow as tf
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.utils.class_weight import compute_class_weight

from tensorflow.keras import layers, Model
from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras.callbacks import (
    ModelCheckpoint,
    EarlyStopping,
    ReduceLROnPlateau
)


# ============================================================
# CONFIGURATION
# ============================================================

DATASET_DIR = "dataset/Preprocessed"
MODEL_DIR = "model"

IMG_SIZE = (224, 224)
BATCH_SIZE = 16

SEED = 42

HEAD_EPOCHS = 10
FINE_TUNE_EPOCHS = 15

# ============================================================
# REPRODUCIBILITY
# ============================================================

random.seed(SEED)
np.random.seed(SEED)
tf.random.set_seed(SEED)

os.makedirs(MODEL_DIR, exist_ok=True)


# ============================================================
# CHECK DATASET
# ============================================================

if not os.path.exists(DATASET_DIR):
    raise FileNotFoundError(
        f"Dataset folder not found: {DATASET_DIR}"
    )

print("\nDataset found:")
print(DATASET_DIR)


# ============================================================
# FIND CLASSES
# ============================================================

class_names = sorted([
    folder
    for folder in os.listdir(DATASET_DIR)
    if os.path.isdir(os.path.join(DATASET_DIR, folder))
])

NUM_CLASSES = len(class_names)

print("\nClasses:")

for i, class_name in enumerate(class_names):
    print(f"{i}: {class_name}")

print("\nNumber of classes:", NUM_CLASSES)


# ============================================================
# FIND ALL IMAGES
# ============================================================

valid_extensions = (
    ".jpg",
    ".jpeg",
    ".png",
    ".bmp",
    ".webp"
)

image_paths = []
labels = []

for class_index, class_name in enumerate(class_names):

    class_dir = os.path.join(
        DATASET_DIR,
        class_name
    )

    for filename in os.listdir(class_dir):

        if filename.lower().endswith(valid_extensions):

            image_paths.append(
                os.path.join(
                    class_dir,
                    filename
                )
            )

            labels.append(class_index)


image_paths = np.array(image_paths)
labels = np.array(labels)

print("\nTotal images:", len(image_paths))


# ============================================================
# DATAFRAME
# ============================================================

data = pd.DataFrame({
    "path": image_paths,
    "label": labels
})


# ============================================================
# TRAIN / VALIDATION / TEST SPLIT
# ============================================================

# 70% train
# 15% validation
# 15% test

train_data, temp_data = train_test_split(
    data,
    test_size=0.30,
    random_state=SEED,
    stratify=data["label"]
)

validation_data, test_data = train_test_split(
    temp_data,
    test_size=0.50,
    random_state=SEED,
    stratify=temp_data["label"]
)

print("\nDataset split:")
print("------------------------")
print("Training:   ", len(train_data))
print("Validation: ", len(validation_data))
print("Testing:    ", len(test_data))


# ============================================================
# SAVE SPLITS
# ============================================================

train_data.to_csv(
    os.path.join(MODEL_DIR, "train.csv"),
    index=False
)

validation_data.to_csv(
    os.path.join(MODEL_DIR, "validation.csv"),
    index=False
)

test_data.to_csv(
    os.path.join(MODEL_DIR, "test.csv"),
    index=False
)


# ============================================================
# SAVE CLASS NAMES
# ============================================================

with open(
    os.path.join(MODEL_DIR, "classes.json"),
    "w"
) as f:

    json.dump(
        class_names,
        f,
        indent=4
    )


# ============================================================
# LOAD IMAGE FUNCTION
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
# CREATE TF DATASET
# ============================================================

def create_dataset(dataframe, shuffle=False):

    paths = dataframe["path"].values
    labels_array = dataframe["label"].values

    dataset = tf.data.Dataset.from_tensor_slices(
        (paths, labels_array)
    )

    dataset = dataset.map(
        load_image,
        num_parallel_calls=tf.data.AUTOTUNE
    )

    if shuffle:
        dataset = dataset.shuffle(
            buffer_size=len(dataframe),
            seed=SEED
        )

    dataset = dataset.batch(
        BATCH_SIZE
    )

    dataset = dataset.prefetch(
        tf.data.AUTOTUNE
    )

    return dataset


train_dataset = create_dataset(
    train_data,
    shuffle=True
)

validation_dataset = create_dataset(
    validation_data
)

test_dataset = create_dataset(
    test_data
)


# ============================================================
# DATA AUGMENTATION
# ============================================================

data_augmentation = tf.keras.Sequential([

    layers.RandomFlip(
        "horizontal"
    ),

    layers.RandomRotation(
        0.05
    ),

    layers.RandomZoom(
        0.10
    ),

    layers.RandomTranslation(
        height_factor=0.05,
        width_factor=0.05
    ),

], name="data_augmentation")


# ============================================================
# EFFICIENTNETB0
# ============================================================

print("\nLoading EfficientNetB0...")

base_model = EfficientNetB0(
    include_top=False,
    weights="imagenet",
    input_shape=(224, 224, 3)
)

# Freeze pretrained layers

base_model.trainable = False


# ============================================================
# BUILD MODEL
# ============================================================

inputs = layers.Input(
    shape=(224, 224, 3)
)

x = data_augmentation(inputs)

x = base_model(
    x,
    training=False
)

x = layers.GlobalAveragePooling2D()(x)

x = layers.BatchNormalization()(x)

x = layers.Dropout(0.40)(x)

x = layers.Dense(
    256,
    activation="relu"
)(x)

x = layers.Dropout(0.30)(x)

outputs = layers.Dense(
    NUM_CLASSES,
    activation="softmax"
)(x)

model = Model(
    inputs,
    outputs
)


# ============================================================
# CLASS WEIGHTS
# ============================================================

class_weights_array = compute_class_weight(
    class_weight="balanced",
    classes=np.unique(train_data["label"]),
    y=train_data["label"]
)

class_weights = {
    i: float(weight)
    for i, weight in enumerate(class_weights_array)
}

print("\nClass weights:")

for i, weight in class_weights.items():

    print(
        f"{class_names[i]}: {weight:.3f}"
    )


# ============================================================
# COMPILE - PHASE 1
# ============================================================

model.compile(

    optimizer=tf.keras.optimizers.Adam(
        learning_rate=0.001
    ),

    loss="sparse_categorical_crossentropy",

    metrics=[
        "accuracy"
    ]
)


# ============================================================
# CALLBACKS
# ============================================================

checkpoint = ModelCheckpoint(

    os.path.join(
        MODEL_DIR,
        "best_model.keras"
    ),

    monitor="val_accuracy",

    save_best_only=True,

    mode="max",

    verbose=1
)


early_stopping = EarlyStopping(

    monitor="val_loss",

    patience=4,

    restore_best_weights=True,

    verbose=1
)


reduce_lr = ReduceLROnPlateau(

    monitor="val_loss",

    factor=0.2,

    patience=2,

    min_lr=1e-7,

    verbose=1
)


# ============================================================
# PHASE 1
# TRANSFER LEARNING
# ============================================================

print("\n")
print("=" * 60)
print("PHASE 1 - TRANSFER LEARNING")
print("=" * 60)

history_head = model.fit(

    train_dataset,

    validation_data=validation_dataset,

    epochs=HEAD_EPOCHS,

    class_weight=class_weights,

    callbacks=[
        checkpoint,
        early_stopping,
        reduce_lr
    ]
)


# ============================================================
# PHASE 2
# FINE TUNING
# ============================================================

print("\n")
print("=" * 60)
print("PHASE 2 - FINE TUNING")
print("=" * 60)


# Unfreeze EfficientNet

base_model.trainable = True


# Freeze early layers
# Train only later layers

fine_tune_from = 180

for layer in base_model.layers[:fine_tune_from]:

    layer.trainable = False


for layer in base_model.layers[fine_tune_from:]:

    layer.trainable = True


# Recompile with very small learning rate

model.compile(

    optimizer=tf.keras.optimizers.Adam(
        learning_rate=1e-5
    ),

    loss="sparse_categorical_crossentropy",

    metrics=[
        "accuracy"
    ]
)


history_fine = model.fit(

    train_dataset,

    validation_data=validation_dataset,

    epochs=FINE_TUNE_EPOCHS,

    class_weight=class_weights,

    callbacks=[
        checkpoint,
        early_stopping,
        reduce_lr
    ]
)


# ============================================================
# LOAD BEST MODEL
# ============================================================

model = tf.keras.models.load_model(

    os.path.join(
        MODEL_DIR,
        "best_model.keras"
    )
)


# ============================================================
# SAVE FINAL MODEL
# ============================================================

model.save(

    os.path.join(
        MODEL_DIR,
        "skin_disease_model.keras"
    )
)


# ============================================================
# COMBINE HISTORY
# ============================================================

accuracy = (
    history_head.history["accuracy"]
    +
    history_fine.history["accuracy"]
)

val_accuracy = (
    history_head.history["val_accuracy"]
    +
    history_fine.history["val_accuracy"]
)

loss = (
    history_head.history["loss"]
    +
    history_fine.history["loss"]
)

val_loss = (
    history_head.history["val_loss"]
    +
    history_fine.history["val_loss"]
)


# ============================================================
# ACCURACY GRAPH
# ============================================================

plt.figure(figsize=(10, 6))

plt.plot(
    accuracy,
    label="Training Accuracy"
)

plt.plot(
    val_accuracy,
    label="Validation Accuracy"
)

plt.xlabel("Epoch")

plt.ylabel("Accuracy")

plt.title(
    "EfficientNetB0 Training Accuracy"
)

plt.legend()

plt.grid()

plt.savefig(
    os.path.join(
        MODEL_DIR,
        "accuracy.png"
    ),
    dpi=300
)

plt.close()


# ============================================================
# LOSS GRAPH
# ============================================================

plt.figure(figsize=(10, 6))

plt.plot(
    loss,
    label="Training Loss"
)

plt.plot(
    val_loss,
    label="Validation Loss"
)

plt.xlabel("Epoch")

plt.ylabel("Loss")

plt.title(
    "EfficientNetB0 Training Loss"
)

plt.legend()

plt.grid()

plt.savefig(
    os.path.join(
        MODEL_DIR,
        "loss.png"
    ),
    dpi=300
)

plt.close()


# ============================================================
# FINAL INFORMATION
# ============================================================

print("\n")
print("=" * 60)
print("TRAINING COMPLETE")
print("=" * 60)

print("\nModel:")
print("model/skin_disease_model.keras")

print("\nBest model:")
print("model/best_model.keras")

print("\nClasses:")

for i, name in enumerate(class_names):

    print(
        f"{i}: {name}"
    )

print("\nNext step:")
print("python evaluate.py")