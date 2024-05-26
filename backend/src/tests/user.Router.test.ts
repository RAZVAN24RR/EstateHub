import supertest from "supertest";
import app from "..";
import { Server } from "http";
var jwt = require("jsonwebtoken");
import { AddressInfo } from "net";

let server: Server;
const validToken = jwt.sign({ userId: 2 }, "private.key", {
  expiresIn: "1h",
});

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

describe("User get", () => {
  it("should fetch user details", async () => {
    const response = await supertest(app)
      .get(
        `/api/v1/user/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcxNjc0MTMyMX0.wYRawsTFy3Hjg7LPkKsqBteQwxBLRta82iwi0Sag8_c`
      )
      .set("Authorization", `Bearer ${validToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
  });
});
