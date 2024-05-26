import axios from "axios";

async function calcPrice(
  squareMeters: number,
  description: string,
  rooms: number,
  floor: number
): Promise<number> {
  try {
    const response = await axios.post("http://localhost:4000/predict", {
      square_meters: squareMeters,
      description: description,
      rooms: rooms,
      floor: floor,
    });
    return response.data.price;
  } catch (error) {
    console.error("Error making prediction request:", error);
    throw error;
  }
}

export { calcPrice };
