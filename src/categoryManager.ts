// import dbmgr from './dbManager';
const dbmgr = require('./dbManager');
const { db } = dbmgr;

export const getCategories = () => {
  try {
    console.log("db: ", db);
    const query = 'SELECT * FROM CATEGORIES';
    // const query = "SELECT name FROM sqlite_master WHERE type='table'"
    const readQuery = db.prepare(query);
    const rowList = readQuery.all();
    return rowList;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createCategory = (title: string) => {
  try {
    const query = `INSERT INTO CATEGORIES (title) VALUES(?)`;
    const writeQuery = db.prepare(query);
    const queryInfo = writeQuery.run(title);
    return queryInfo;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
// export default getCategories;
