const { hotel, city, image } = require('../models');

const getAllHotel = async () => {
  return await hotel.findAll({ include: [city, image] });
}

const createHotel = async (body) => {
  return await hotel.create(body);
}

const getoneHotel = async (id) => {
  return await hotel.findByPk(id, { include: [city, image] });
}

const putHotel = async (body, id) => {
  return await hotel.update(
    body,
    { where: { id }, returning: true }
  );
}

const removeHotel = async (id) => {
  return await hotel.destroy({ where: { id } });
}


module.exports = {
  getAllHotel,
  createHotel,
  getoneHotel,
  putHotel,
  removeHotel,
}

