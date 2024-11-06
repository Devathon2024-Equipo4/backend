import request from "supertest";
import app from "../app";

describe("Calories routes", () => {
  const baseUrl = "/api/v1/calories";

  describe("GET /total", () => {
    it("should return all calories", async () => {
      const res = await request(app).get(`${baseUrl}/total`); 
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("total");

    });
  });
  
});