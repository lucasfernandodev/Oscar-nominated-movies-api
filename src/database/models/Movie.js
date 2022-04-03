import sequelize from 'sequelize';
import database from '../db.js';

const Movie = database.define('movie', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  thumb: {
    type: sequelize.STRING, 
    allowNull: false 
  },
  title: { 
    type: sequelize.STRING, 
    allowNull: false 
  },
  category: {
    type: sequelize.STRING, 
    allowNull: false 
  },
  genre: {
    type: sequelize.STRING, 
    allowNull: false 
  },
  director: {
    type: sequelize.STRING, 
    allowNull: false 
  },
  year: {
    type: sequelize.INTEGER,
    allowNull: false
  },
  duration: {
    type: sequelize.INTEGER,
    allowNull: false
  },
  score:{ 
    type: sequelize.STRING,
    allowNull: false
  },
  link: {
    type: sequelize.STRING, 
    allowNull: false 
  }

})

export default Movie;