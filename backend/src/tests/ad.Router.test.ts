import supertest from "supertest";
import app from "..";
import { Server } from "http";
import { AddressInfo } from "net";

let server: Server;

jest.setTimeout(20000);

beforeAll((done) => {
  process.env.NODE_ENV = "test";
  server = app.listen(0, () => {
    // folosește un port dinamic
    const address = server.address() as AddressInfo | null;
    if (address && typeof address.port === "number") {
      console.log(`Test server running on port ${address.port}`);
    }
    done();
  });
}, 20000);

afterAll((done) => {
  server.close(() => {
    console.log("Test server closed");
    done();
  });
});

describe("Ad get", () => {
  it("should get ads", async () => {
    const response = await supertest(app).get("/api/v1/ad/ads");

    expect(response.status).toBe(200);
  });

  it("should get ads with trailing slash", async () => {
    const response = await supertest(app).get("/api/v1/ad/ads/");

    expect(response.status).toBe(200);
  });
});
