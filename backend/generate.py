import json
import random

descriptions = [
    "newly furnished apartment with a large living room and a balcony",
    "renovated bathroom and small living room",
    "big bedroom with a big TV and parking space",
    "small living room and renovated bathroom",
    "large living room, newly furnished, balcony",
    "parking space and big bedroom",
    "newly furnished with a big TV",
    "small living room and big TV",
    "large living room and balcony",
    "big bedroom and parking space",
    "newly furnished apartment with a renovated bathroom",
    "small living room, no balcony",
    "large living room and parking space",
    "small living room and big bedroom",
    "newly furnished, balcony, and parking space",
    "renovated bathroom and big TV",
    "large living room, big bedroom, and balcony",
    "big bedroom with parking space",
    "small living room with big TV",
    "large living room, newly furnished, balcony"
]

data = []

for i in range(1000):
    entry = {
        "square_meters": random.randint(40, 120),
        "description": random.choice(descriptions),
        "rooms": random.randint(1, 5),
        "floor": random.randint(1, 10),
        "price": random.randint(50000, 300000)
    }
    data.append(entry)

with open('real_estate_listings_large.json', 'w') as f:
    json.dump(data, f, indent=2)
