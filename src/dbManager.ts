// import Sqlite from 'better-sqlite3-with-prebuilds';
const Database = require('better-sqlite3');
const path = require('path');
// const db = new betterSqlite3('../sqlitedata.db');

// may need to do this
const dbPath =
  process.env.NODE_ENV === 'development'
    ? './question_notes.db'
    : path.join(process.resourcesPath, './question_notes.db');
console.log("Current Directory:", process.cwd());
console.log("Database Path:", dbPath);
const db = new Database(dbPath);
// const getCategories = () => {
//   const sqlGet = 'SELECT * FROM CATEGORIES';
//   const stmt = db.prepare(sqlGet);
//   const res = stmt.all();
//   return res;
// };
db.pragma('journal_mode = WAL');
exports.db = db;
