import Movie from "../database/models/Movie.js";
import sequelize from "sequelize";

const Controller = {
  create: async (data) => {

    const isMovie = await Movie.findOne({ where: { title: data.title } });

    if (isMovie !== null) {
      return { error: `Erro: O filme ${data.title} já foi cadastrado` }
    }

    try {
      const newMovie = await Movie.create(data);
      return newMovie;

    } catch (error) {
      console.log(error)
      return { error: `Erro: Não foi possível salvar o filme` }
    }

  },

  update: async (movieId, data) => {

    const isMovieExist = await Movie.findByPk(parseInt(movieId));

    if (isMovieExist === null) {
      return { error: "Filme não encontrado" }
    }

    try {
      const update = await Movie.update(data, {
        where: {
          id: movieId
        }
      });

      return update
    } catch (error) {
      return { error: `Erro ao atualizar informações` }
    }


  },

  delete: async (movieId) => {
    const isMovie = await Movie.findByPk(movieId);

    if (isMovie === null) {
      return { error: `Erro: O filme já foi deletado ou não existe` }
    }

    await isMovie.destroy;

    return 'ok';

  },

  find: async (movieId) => {
    const isMovie = await Movie.findOne({ where: { id: movieId } });

    if (isMovie === null) {
      return { error: `Erro: O filme não está cadastrado` }
    }

    return isMovie;
  },

  findAll: async (pageId = 0) => {
    const limitMax = 5;
    try {
      const { count, rows } = await Movie.findAndCountAll({

        offset: pageId === 0 ? 0 : parseInt((pageId * limitMax)),
        limit: limitMax
      });

      const paginationCalc = parseInt(count / 5);
      const isPaginationOver = (paginationCalc * limitMax) === count ? paginationCalc : paginationCalc + 1

      return {
        pagination: parseInt(isPaginationOver),
        data: rows
      }

    } catch (error) {
      return { error: "Não foi encontrado nenhum filme" }
    }
  },

  filter: async (option, value, pageId = 0) => {
    const Op = sequelize.Op;
    const limitMax = 5;
    const query = `%${value}`;

    const queryCategory = { category: { [Op.substring]: query } };
    const queryGenre = { genre: { [Op.substring]: query } };
    const queryDirector = { director: { [Op.substring]: query } };

    if (option === null || option === '') return { error: "Filtro nulo é invalido" }
    if (value === null || value === '') return { error: "O value não pode ser nulo" }


    const ob = {
      category: queryCategory,
      genre: queryGenre,
      director: queryDirector
    }

    try {

      const { count, rows } = await Movie.findAndCountAll({
        where: ob[option],
        offset: pageId === 0 ? 0 : parseInt((pageId * limitMax)),
        limit: 5
      });


      if (rows === null) {
        return { error: "Não foi encontrado nenhum item" }
      }

      const paginationCalc = parseInt(count / 5);
      const isPaginationOver = (paginationCalc * limitMax) === count ? paginationCalc : paginationCalc + 1

      return {
        pagination: parseInt(isPaginationOver),
        data: rows
      }

    } catch (error) {
      return { error: 'Não foi possível fazer filtragem.' }
    }

  },
}

export default Controller;