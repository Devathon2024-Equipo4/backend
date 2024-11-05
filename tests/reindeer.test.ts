import request from "supertest";
import app from "../app";

describe("Reindeer routes", () => {
  const baseUrl = "/api/v1/reindeers"; 

  describe("GET /", () => {
    it("should return all the reindeers", async () => {
      const res = await request(app).get(baseUrl);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("reindeers");
      expect(Array.isArray(res.body.reindeers)).toBeTruthy();
    });
  });

  describe("GET /:name", () => {
    it("should return a reindeer by name", async () => {
      const name = "Rudolph"; 
      const res = await request(app).get(`${baseUrl}/${name}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("reindeer");
      expect(res.body.reindeer).toHaveProperty("name", name);
      expect(res.body.reindeer).toHaveProperty("alignment");
      expect(res.body.reindeer).toHaveProperty("id");
    });

    it("should return a 404 if the reindeer does not exist", async () => {
      const name = "NoExist"; 
      const res = await request(app).get(`${baseUrl}/${name}`);
      expect(res.statusCode).toEqual(404);
    });
  });

  describe("POST /", () => {
    it("should create a new reindeer", async () => {
      const newReindeer = { name: "Tester2", alignment: 0 }; 
      const res = await request(app).post(baseUrl).send(newReindeer);
      expect(res.statusCode).toEqual(201);
      expect(res.body.reindeer).toHaveProperty("id");
      expect(res.body.reindeer).toHaveProperty("name", newReindeer.name);
    });
  });

  describe("PUT /:id", () => {
    it("should update an existing reindeer", async () => {
      const id = "548395c6-6f6f-4e5c-9e0c-5b1ae9821a01"; 
      const updatedData = { alignment: 0 }; 
      const res = await request(app).put(`${baseUrl}/${id}`).send(updatedData);
      expect(res.statusCode).toEqual(200);
      expect(res.body.reindeer).toHaveProperty("alignment", updatedData.alignment);
    });

    it("should return a 500 if the reindeer does not exist", async () => {
      const id = "NoExist"; 
      const updatedData = { alignment: 2 };
      const res = await request(app).put(`${baseUrl}/${id}`).send(updatedData);
      expect(res.statusCode).toEqual(500);
    });
  });
});