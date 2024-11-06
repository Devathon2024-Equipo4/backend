import request from "supertest";
import app from "../app";

describe("Weather routes", () => {
  const baseUrl = "/api/v1/weather"; 

  describe("GET /:query", () => {
    it("should return the weather for a given query", async () => {
      const query = "London"; 
      const res = await request(app).get(`${baseUrl}/${query}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("weather");
      expect(res.body).toHaveProperty("reindeers");
      expect(res.body.weather).toHaveProperty("current");
      expect(res.body.weather.current).toHaveProperty("temp_c");
      expect(res.body.reindeers).toHaveLength(9);
    });
  });
});