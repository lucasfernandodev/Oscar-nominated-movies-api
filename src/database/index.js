import Movie from './models/Movie.js';
import database from './db.js';
// Sincroniza banco de dados

async function sincronizaDatabase(){
  try {
    await database.sync();
  } catch (error) {
    console.log(`Ocorreu um erro: ${error}`)
  }  
}

export default async function SyncDatabase(){
  await sincronizaDatabase()
}