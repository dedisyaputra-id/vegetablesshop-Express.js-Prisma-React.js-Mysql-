import supertest from "supertest";
import web from "../src/app/web.js";
import { destroy as deleteCategory } from "../utils/categorytest.js";

describe("POST /api/categories", () => {
  afterEach(async () => {
    await deleteCategory();
  });
  it("should create data category", async () => {
    const result = await supertest(web)
      .post("/api/categories")
      .set("Authorization", "66b901ac-4f29-4c7a-b1f5-38b4a9eac7cf")
      .send({
        name: "vegetables",
      });

    expect(result.status).toBe(201);
    expect(result.body.data.name).toBe("vegetables");
  });

  it("should not create data category because category name already exist", async () => {
    const result = await supertest(web)
      .post("/api/categories")
      .set("Authorization", "66b901ac-4f29-4c7a-b1f5-38b4a9eac7cf")
      .send({
        name: "Fruit",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should can't create data category because user is not admin", async () => {
    const result = await supertest(web)
      .post("/api/categories")
      .set("Authorization", "648360d7-aa85-4303-a8e2-7cf4b64f9e24")
      .send({
        name: "vegetables",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
