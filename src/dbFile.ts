import Sqlite from 'better-sqlite3-with-prebuilds';

const db = new Sqlite('../sqlitedata.db');

const getCategories = () => {
  const sqlGet = 'SELECT * FROM CATEGORIES';
  const stmt = db.prepare(sqlGet);
  const res = stmt.all();
  return res;
};

export default getCategories;
