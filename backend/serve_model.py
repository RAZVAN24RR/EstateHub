from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np

app = Flask(__name__)

# Încărcarea modelului și a vectorizatorului
model = tf.keras.models.load_model('real_estate_model/model_tf')
vectorizer_model = tf.keras.models.load_model('real_estate_model/vectorizer_model_tf')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    square_meters = np.float32(data['square_meters'])
    description = data['description']
    rooms = np.int32(data['rooms'])
    floor = np.int32(data['floor'])

    # Asigură-te că descrierea este un tensor cu o singură dimensiune
    description_tensor = tf.constant([description], dtype=tf.string)
    print(description_tensor.shape)
    # Vectorize description
    # description_vectorized = vectorizer_model(description_tensor)

    # print(description_vectorized.shape)

    # Pregătirea datelor numerice ca tensori
    square_meters_tensor = tf.constant([[square_meters]], dtype=tf.float32)
    rooms_tensor = tf.constant([[rooms]], dtype=tf.int32)
    floor_tensor = tf.constant([[floor]], dtype=tf.int32)
    
    # Pregătirea inputurilor pentru model
    inputs = {
        'square_meters': square_meters_tensor,
        'rooms': rooms_tensor,
        'floor': floor_tensor,
        'description': description_tensor
    }

    prediction = model.predict(inputs)
    return jsonify({'price': float(prediction[0][0])})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000)
