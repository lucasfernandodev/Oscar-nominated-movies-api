
import Movie from "../database/models/Movie.js";
import { Router } from "express";
import Controller from './controller.js';
const routes = Router();



routes.get('/movies/', async (req, res) => {


  const skip = req.query.skip ?? 0;

  const result = await Controller.findAll(skip);

  if (result.error) {
    return res.status(500).json(result.error)
  }

  if (result.data.length === 0) {
    return res.status(404).json(`Pagina não encontrada`)
  }

  return res.json({ current_page: parseInt(skip), ...result })

})



routes.get('/movies/:id', async (req, res) => {


  const id = req.params.id;
  const result = await Controller.find(id);

  if (result.error) {
    return res.status(404).json(result.error)
  }

  return res.status(200).json({ data: result })
})


routes.get('/movies/filter/:id', async (req, res) => {

  const skip = req.query.skip ?? 0;
  const option = req.params.id;
  const data = req.body;


  if (option.includes('genre') || option.includes('category') || option.includes('director')) {

    const result = await Controller.filter(option, data.value, skip);


    if (result.error) {
      return res.status(404).json(result.error)
    }

    if (typeof result.data !== 'undefined' && result.data.length === 0) {
      return res.status(404).json(`Paginação invalida`)
    }

    if (typeof result.data === 'undefined') {
      return res.status(404).json(`Paginação invalida`)
    }

    return res.status(200).json({ current_page: parseInt(skip), ...result })

  }

  return res.status(400).send(`Parâmetros inválidos`)
})


routes.put('/movies/:id', async (req, res) => {

  const data = req.body;
  const id = req.params.id
  const result = await Controller.update(id, data)

  if (result.error) {
    return res.status(404).json(result.error)
  }

  return res.status(200).json({ data: result })
})



routes.post('/movies', async (req, res) => {

  const data = await req.body;


  if (typeof data.title === 'undefined') {
    console.log(data)
    return res.status(400).send("Dados recebidos são inválidos")
  }


  const result = await Controller.create(data);

  if (result.error) {
    return res.status(404).json(result.error)
  }

  return res.status(201).json({ data: result })
})


routes.delete('/movies/:id', async (req, res) => {

  const movieId = req.params.id;
  const result = await Controller.delete(movieId);

  if (result.error) {
    return res.status(404).json(result.error)
  }

  return res.status(200).json({ ok: true })
})

export default routes;