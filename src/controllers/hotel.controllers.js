const catchError = require('../utils/catchError');
const { getAllHotel, createHotel, getoneHotel, putHotel, removeHotel } = require('../services/hotel.services');

const getAll = catchError(async (req, res) => {
  const results = await getAllHotel();
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await createHotel(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await getoneHotel(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await removeHotel(id)
  if (!result) return res.sendStatus(404);
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await putHotel(req.body, id)
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update
}