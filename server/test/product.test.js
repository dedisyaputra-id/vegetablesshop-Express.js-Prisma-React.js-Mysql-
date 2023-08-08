import web from "../src/app/web.js";
import supertest from "supertest";

describe("GET /api/products", () => {
  it("should get products data", async () => {
    const result = await supertest(web)
      .get("/api/products")
      .set("Authorization", "ad3c2e1f-09c1-42aa-84eb-0bfdfd92bd3b");

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
  });

  it("should cannot get products data because token invalid ", async () => {
    const result = await supertest(web)
      .get("/api/products")
      .set("Authorization", "wevewvewvewvevw");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it("should cannot get products data because not set ", async () => {
    const result = await supertest(web).get("/api/products");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});
