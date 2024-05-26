import supertest from "supertest";
import app from "..";

jest.setTimeout(10000);

describe("User create", () => {
  it("should create user", async () => {
    const response = await supertest(app).post("/api/v1/user/createUser").send({
      name: "111",
      email: "dfdf",
      password: "aaaa",
      image: "aaa",
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", "111");
    expect(response.body).toHaveProperty("email", "dfdf");
  });
});
