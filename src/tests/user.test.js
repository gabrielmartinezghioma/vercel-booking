const request = require('supertest')
const app = require('../app')

const BASE_URL = '/api/v1/users'

const user = {
  firstName: "Gabriel",
  lastName: "Martinez",
  email: "gabriel@gmail.com",
  password: "gabriel1234",
  gender: "male"
}

const credentials = {
  email: "gabriel@gmail.com",
  password: "gabriel1234"
}

let TOKEN
let userId

test("POST -> 'BASE_URL', should return status code 201, and res.body.email === user.email", async () => {

  const res = await request(app)
    .post(BASE_URL)
    .send(user)

  userId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.email).toBe(user.email)
})


test("post -> 'BASE_URL/login', should return status code 200, and res.body.user.email === user.email and res.body.token to be defined", async () => {

  const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(credentials)

  TOKEN = res.body.token

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.user).toBeDefined()
  expect(res.body.user.email).toBe(user.email)
  expect(res.body.token).toBeDefined()
})


test("GET -> 'BASE_URL', should return status code 200, and res.body.length === 1", async () => {

  const res = await request(app)
    .get(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].email).toBe(user.email)
})

test("GET -> 'BASE_URL/me', should return status code 200, and res.body.email === user.email", async () => {

  const res = await request(app)
    .get(`${BASE_URL}/me`)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.email).toBe(user.email)
})


test("PUT -> 'BASE_URL/:id', should return status code 200, and res.body.firstName === userUpdate.firstName", async () => {

  const userUpdate = {
    firstName: 'Lisana'
  }

  const res = await request(app)
    .get(`${BASE_URL}/${userId}`)
    .send(userUpdate)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(user.firstName)
})


test("REMOCE -> 'BASE_URL/:id', should return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${userId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(204)
})


