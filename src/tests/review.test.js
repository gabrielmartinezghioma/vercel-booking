require('../models')
const request = require('supertest')
const app = require('../app')

let user
let TOKEN
let hotel
let hotelId
let review
let reviewId

const BASE_URL = '/api/v1/reviews'

beforeAll(async () => {
  user = await request(app)
    .post('/api/v1/users')
    .send({
      firstName: "Gabriel",
      lastName: "Martinez",
      email: "gabriel@gmail.com",
      password: "gabriel1234",
      gender: "male"
    })

  const credentials = {
    email: "gabriel@gmail.com",
    password: "gabriel1234"
  }

  const resToken = await request(app)
    .post('/api/v1/users/login')
    .send(credentials)

  TOKEN = resToken.body.token


  hotel = await request(app)
    .post('/api/v1/hotels')
    .send({
      name: "The Grand Palace Hotel",
      description: "A luxurious 5-star hotel located in the heart of the city, offering exceptional amenities and stunning city views.",
      price: "250",
      address: "123 Main Street, Cityville",
      lat: "40.7128",
      lon: "-74.0060",
      raiting: "4.8",
    })
    .set('Authorization', `Bearer ${TOKEN}`)

  hotelId = hotel.body.id

  review = {
    hotelId: hotel.body.id,
    rating: 5,
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ipsam ducimus aut aperiam! Tempora provident optio odio nihil distinctio dolor animi, reiciendis tenetur, numquam laboriosam quaerat repellendus iure rerum similique.",
  }

})

afterAll(async () => {
  await request(app)
    .delete(`/api/v1/users/${user.body.id}`)
    .set('Authorization', `Bearer ${TOKEN}`)

  await request(app)
    .delete(`/api/v1/hotels/${hotelId}`)
    .set('Authorization', `Bearer ${TOKEN}`)
})

test("POST -> 'BASE_URL', should return status code 201, and res.body.name === city.name", async () => {

  const res = await request(app)
    .post(BASE_URL)
    .send(review)
    .set('Authorization', `Bearer ${TOKEN}`)

  reviewId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.comment).toBe(review.comment)
})


test("GET -> 'BASE_URL', should return status code 200, and res.body.length === 1", async () => {

  const res = await request(app)
    .get(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].comment).toBe(review.comment)
})

test("GET -> 'BASE_URL/:id', should return status code 200, and res.body.name === city.name", async () => {

  const res = await request(app)
    .get(`${BASE_URL}/${reviewId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.comment).toBe(review.comment)
})

test("PUT -> 'BASE_URL/:id', should return status code 200, and res.body.name === cityUpdate.name", async () => {

  const reviewUpdate = {
    comment: "lorem20"
  }

  const res = await request(app)
    .put(`${BASE_URL}/${reviewId}`)
    .send(reviewUpdate)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.comment).toBe(reviewUpdate.comment)
})


test("REMOVE -> 'BASE_URL/:id', should return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${reviewId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(204)
})


