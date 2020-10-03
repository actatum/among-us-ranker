const { pool } = require('./db');

const tableName = 'crewmates';

const createTable = `
  CREATE TABLE IF NOT EXISTS ${tableName}(
    id varchar(255) PRIMARY KEY,
    gamer varchar(255) NOT NULL,
    games_carried int NOT NULL
  )
`;

const table = async () => {
  try {
    await pool.query(createTable);
  } catch (err) {
    console.log(err.stack);
  }
};

const drop = async () => {
  try {
    await pool.query(`DROP TABLE IF EXISTS ${tableName}`);
  } catch (err) {
    console.log(err.stack);
  }
};

const create = async (gamer) => {
  try {
    const res = await pool.query(`INSERT INTO ${tableName}(id, gamer, games_carried) VALUES($1, $2, $3) RETURNING *`, [gamer.id, gamer.gamer, 0]);
    return res.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

const read = async (id) => {
  try {
    const res = await pool.query(`SELECT * FROM ${tableName} WHERE id = $1 ORDER BY id LIMIT 1`, [id]);
    return res.rows[0];
  } catch (err) {
    console.log(err.stack);
  }
};

const readAll = async () => {
  try {
    const res = await pool.query(`SELECT * FROM ${tableName}`);
    return res.rows.sort((a, b) => (a.games_carried > b.games_carried) ? -1 : 1);
  } catch (err) {
    console.log(err.stack);
  }
};

const update = async (id) => {
  try {
    const res = await pool.query(`UPDATE ${tableName} SET games_carried = games_carried + 1 WHERE id = $1 RETURNING games_carried`, [id]);
    return res.rows[0].games_carried;
  } catch (err) {
    console.log(err.stack);
  }
};

module.exports = {
  table,
  drop,
  create,
  read,
  readAll,
  update
};