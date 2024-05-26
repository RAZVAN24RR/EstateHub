import supertest from "supertest";
import app from "..";


describe("User get", () => {
  it("should fetch user details", async () => {
    const response = await supertest(app).get(
      "/api/v1/user/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcxNjcxNjg5M30.0N5x4iODLBamPj5Hir69542zC0LqGKUBgJBgrCMtF50"
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
  });

  it("should handle user not found", async () => {
    const response = await supertest(app).get("/user/999");
    expect(response.status).toBe(404);
  });
});
