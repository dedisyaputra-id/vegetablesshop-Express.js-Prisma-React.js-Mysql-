import supertest from "supertest";
import web from "../src/app/web.js";
import { destroy as deleteTransaction } from "../utils/transactiontest.js";

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
