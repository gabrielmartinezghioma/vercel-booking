require('pg')
require('pg-hstore')
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL || process.env.DATABASE_URL_PRODUCTION)

module.exports = sequelize;
