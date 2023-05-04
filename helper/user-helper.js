import supertest from "supertest";
const request = supertest("https://gorest.co.in/public/v2/");
const token =
  "c43fa51cdc74eab690399b7a7729bd886fd9da9f5a4de4d6eb0837a14d8ce61a";

export const createRandomUser = async () => {
  const data = {
    email: `test-${Math.floor(Math.random() * 99999)}@gmail.com`,
    name: "Mustapha",
    gender: "male",
    status: "inactive",
  };
  const res = await request
    .post("users")
    .set("Authorization", `Bearer ${token}`)
    .send(data);
  return (id = res.body.id);
};
