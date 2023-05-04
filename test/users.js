import supertest from "supertest";
const request = supertest("https://gorest.co.in/public/v2/");
import { expect } from "chai";
import { createRandomUser } from "../helper/user-helper";

const token =
  "c43fa51cdc74eab690399b7a7729bd886fd9da9f5a4de4d6eb0837a14d8ce61a";
let id;
describe("Users", () => {
  id = createRandomUser();
  it("Get/Users", () => {
    request.get(`users?access-token=${token}`).then((res) => {
      expect(res.body).to.not.be.empty;
    });
  });
  describe("Get Users", () => {
    it("Get/Users/:id", async () => {
      request.get(`users/${id}?access-token=${token}`).then((res) => {
        console.log(res.body);
        expect(res.body.status).to.be.deep.equal("inactive");
        expect(res.body.email).to.not.be.empty;
      });
    });
  });
  it("Put/Users", async () => {
    request
      .put(`users/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "Active" })
      .then((res) => {
        expect(res.body.status).to.be.deep.equal("active");
      });
  });
  it("Delete/Users", async () => {
    request
      .delete(`users/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send()
      .then((res) => {
        expect(res.statusCode).to.be.equal(204);
      });
  });
});
