import json
import tensorflow as tf
from tensorflow.keras.layers import Dense, Embedding, GlobalAveragePooling1D, TextVectorization, Concatenate, Input
from tensorflow.keras.models import Model
import numpy as np

# Încărcarea datelor
with open('real_estate_listings.json') as f:
    data = json.load(f)

# Pregătirea datelor
square_meters = np.array([item['square_meters'] for item in data], dtype=np.float32)
descriptions = np.array([item['description'] for item in data], dtype=str)
rooms = np.array([item['rooms'] for item in data], dtype=np.int32)
floors = np.array([item['floor'] for item in data], dtype=np.int32)
prices = np.array([item['price'] for item in data], dtype=np.float32)

# Vectorizare pentru text
vectorizer = TextVectorization(max_tokens=20000, output_sequence_length=200)
vectorizer.adapt(descriptions)

# Preprocesarea textului
description_input = Input(shape=(1,), dtype=tf.string, name='description')
description_vectors = vectorizer(description_input)
embedding = Embedding(input_dim=20000, output_dim=16, input_length=200)(description_vectors)
pooled_output = GlobalAveragePooling1D()(embedding)

# Preprocesarea altor inputuri numerice
square_meters_input = Input(shape=(1,), name='square_meters')
rooms_input = Input(shape=(1,), name='rooms')
floor_input = Input(shape=(1,), name='floor')

# Concatenarea tuturor inputurilor
concatenated = Concatenate()([square_meters_input, rooms_input, floor_input, pooled_output])
dense_layer = Dense(64, activation='relu')(concatenated)
output = Dense(1)(dense_layer)

# Crearea modelului
model = Model(inputs=[square_meters_input, rooms_input, floor_input, description_input], outputs=output)
model.compile(optimizer='adam', loss='mse')

# Crearea dataset-ului
dataset = tf.data.Dataset.from_tensor_slices(({
    'square_meters': square_meters,
    'rooms': rooms,
    'floor': floors,
    'description': descriptions
}, prices)).batch(2)

# Antrenarea modelului
model.fit(dataset, epochs=1000)

# Salvarea modelului în format TensorFlow SavedModel
model.save('real_estate_model/model_tf', save_format='tf')

# Salvarea vectorizatorului în format TensorFlow SavedModel
vectorizer_model = tf.keras.models.Sequential([vectorizer])
vectorizer_model.save('real_estate_model/vectorizer_model_tf', save_format='tf')
