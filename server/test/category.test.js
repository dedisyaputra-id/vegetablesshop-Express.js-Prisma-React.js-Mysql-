import supertest from "supertest";
import web from "../src/app/web.js";

describe("POST /api/categories", () => {
  it("should create data category", async () => {
    const result = await supertest(web)
      .post("/api/categories")
      .set("Authorization", "baf31d25-6a9d-438e-9731-56d12b0d3dad")
      .send({
        name: "vegetables",
      });

    expect(result.status).toBe(201);
    expect(result.body.data.name).toBe("vegetables");
  });

  it("should can't create data category because user is not admin", async () => {
    const result = await supertest(web)
      .post("/api/categories")
      .set("Authorization", "ecced788-f303-4f61-8f84-6d1304e057de")
      .send({
        name: "vegetables",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
