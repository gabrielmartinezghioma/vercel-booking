const catchError = require('../utils/catchError');
const { getAllUser, createUser, getoneUser, putUser, removeUser } = require('../services/user.services');
const jwt = require('jsonwebtoken');

const getAll = catchError(async (req, res) => {
  const results = await getAllUser();
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await createUser({ ...req.body, password: req.passwordHash });
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await getoneUser(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await removeUser(id)
  if (!result) return res.sendStatus(404);
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await putUser(req.body, id);
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const login = catchError(async (req, res) => {

  const { userLogin } = req

  const token = jwt.sign(
    { userLogin },
    process.env.TOKEN_SECRET,
    { expiresIn: '1d' }
  )

  return res.json({ user: userLogin, token })
})

const logged = catchError(async (req, res) => {
  const user = req.user
  return res.json(user)
})

module.exports = {
  getAll,//👌
  create, //👌
  getOne,//👌
  remove,
  update,
  login, //👌
  logged//👌
}