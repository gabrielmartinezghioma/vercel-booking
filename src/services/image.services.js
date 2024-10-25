const { image, hotel } = require('../models');

const getAllImage = async () => {
  return await image.findAll({ include: [hotel] });
}

const createImage = async (body) => {
  return await image.create(body);
}

const getoneImage = async (id) => {
  return await image.findByPk(id, { include: [hotel] });
}

const putImage = async (body, id) => {
  return await image.update(
    body,
    { where: { id }, returning: true }
  );
}

const removeImage = async (id) => {
  return await image.destroy({ where: { id } });
}


module.exports = {
  getAllImage,
  createImage,
  getoneImage,
  putImage,
  removeImage,
}

