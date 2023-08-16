import web from "../src/app/web.js";
import supertest from "supertest";
import {
  create as createProduct,
  destroy as deleteProduct,
} from "../utils/producttest.js";

describe("GET /api/products", () => {
  beforeEach(async () => {
    await createProduct();
  });
  afterEach(async () => {
    await deleteProduct();
  });
  it("should get products data", async () => {
    const result = await supertest(web)
      .get("/api/products")
      .set("Authorization", "2f15569c-9dcc-4766-a65c-f3c517488a67");

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

  it("should cannot get products data because authorization not set ", async () => {
    const result = await supertest(web).get("/api/products");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it("should cannot get products data because user is not admin", async () => {
    const result = await supertest(web)
      .get("/api/products")
      .set("Authorization", "9586c9b6-aefd-4ca8-9b6d-4d6d114962d1");

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("POST /api/products", () => {
  afterEach(async () => {
    await deleteProduct();
  });
  it("should create products data", async () => {
    const result = await supertest(web)
      .post("/api/products")
      .set("Authorization", "2f15569c-9dcc-4766-a65c-f3c517488a67")
      .send({
        name: "mangga",
        stock: 10,
        price: 10000,
        category_id: 1,
      });

    expect(result.status).toBe(201);
    expect(result.body.data.name).toBe("mangga");
    expect(result.body.data.stock).toBe(10);
    expect(result.body.data.price).toBe(10000);
    expect(result.body.data.category_id).toBe(1);
  });

  it("should not create products data because name empty", async () => {
    const result = await supertest(web)
      .post("/api/products")
      .set("Authorization", "2f15569c-9dcc-4766-a65c-f3c517488a67")
      .send({
        name: " ",
        stock: 10,
        price: 10000,
        category_id: 1,
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should not create products data because users is not admin", async () => {
    const result = await supertest(web)
      .post("/api/products")
      .set("Authorization", "9586c9b6-aefd-4ca8-9b6d-4d6d114962d1")
      .send({
        name: "sawi",
        stock: 10,
        price: 10000,
        category_id: 2,
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
