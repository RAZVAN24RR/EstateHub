import supertest from "supertest";

describe("External API test", () => {
  it("Test AI", async () => {
    const response = await supertest("http://localhost:4000")
      .post("/predict")
      .send({
        square_meters: "67",
        description: "newly furnished apartment with a large",
        rooms: "2",
        floor: "4",
      });

    expect(response.status).toBe(200);
  });
});
