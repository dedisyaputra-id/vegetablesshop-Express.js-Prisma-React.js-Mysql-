import supertest from "supertest";
import web from "../src/app/web.js";
import {
  destroy as deleteTransaction,
  create as createTransaction,
} from "../utils/transactiontest.js";

describe("POST /api/cart", () => {
  afterAll(async () => {
    await deleteTransaction();
  });

  it("should add product to cart", async () => {
    const result = await supertest(web)
      .post(`/api/cart/${47}`)
      .set("Authorization", "1a044f89-8698-4a3f-9476-9e0d28d268b5")
      .send({
        order_number: 1,
        userid: 2,
        quantity: 1,
      });

    expect(result.status).toBe(201);
    expect(result.body.data.order_number).toBe(1);
    expect(result.body.data.userid).toBe(2);
    expect(result.body.data.productid).toBe(47);
    expect(result.body.data.quantity).toBe(1);
  });

  it("should add new transaction to cart with user is a same", async () => {
    const result = await supertest(web)
      .post(`/api/cart/${50}`)
      .set("Authorization", "1a044f89-8698-4a3f-9476-9e0d28d268b5")
      .send({
        order_number: 2,
        userid: 2,
        quantity: 1,
      });

    expect(result.status).toBe(201);
    expect(result.body.data.order_number).toBe(2);
    expect(result.body.data.userid).toBe(2);
    expect(result.body.data.productid).toBe(50);
    expect(result.body.data.quantity).toBe(1);
  });

  it("should update quantity transaction", async () => {
    const result = await supertest(web)
      .post(`/api/cart/${47}`)
      .set("Authorization", "1a044f89-8698-4a3f-9476-9e0d28d268b5")
      .send({
        order_number: 1,
        userid: 2,
        quantity: 1,
      });

    expect(result.status).toBe(201);
    expect(result.body.data.count).toBe(1);
  });
});

describe("GET /api/cart", () => {
  beforeEach(async () => {
    await createTransaction();
  });
  afterEach(async () => {
    await deleteTransaction();
  });
  it("should get data cart", async () => {
    const result = await supertest(web)
      .get("/api/cart")
      .set("Authorization", "1a044f89-8698-4a3f-9476-9e0d28d268b5");

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
  });
});

describe("UPDATE /api/cart/:orderNumber", () => {
  beforeEach(async () => {
    await createTransaction();
  });
  afterEach(async () => {
    await deleteTransaction();
  });
  it("should update data cart", async () => {
    const result = await supertest(web)
      .put(`/api/cart/${1}`)
      .set("Authorization", "1a044f89-8698-4a3f-9476-9e0d28d268b5")
      .send({
        quantity: 1,
      });

    expect(result.status).toBe(204);
  });

  it("should not update data cart because transaction data not found", async () => {
    const result = await supertest(web)
      .put(`/api/cart/${2}`)
      .set("Authorization", "1a044f89-8698-4a3f-9476-9e0d28d268b5")
      .send({
        quantity: 1,
      });

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/cart/:orderNumber", () => {
  beforeEach(async () => {
    await createTransaction();
  });

  it("should delete data cart", async () => {
    const result = await supertest(web)
      .delete(`/api/cart/${1}`)
      .set("Authorization", "1a044f89-8698-4a3f-9476-9e0d28d268b5");

    expect(result.status).toBe(200);
  });

  it("should not delete data cart because transaction data not found", async () => {
    const result = await supertest(web)
      .delete(`/api/cart/${2}`)
      .set("Authorization", "1a044f89-8698-4a3f-9476-9e0d28d268b5");

    console.log(result.body.errors);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});
