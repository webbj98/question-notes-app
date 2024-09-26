// import dbmgr from './dbManager';
const dbmgr = require('./dbManager');

const { db } = dbmgr;

export const getCategories = () => {
  try {
    console.log('db: ', db);
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

// TODO: Make getCategoryById

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
};

export const getQuestionsByCategoryId = (id: number) => {
  try {
    const query = `SELECT * FROM QUESTIONS q WHERE q.categoryID = ?`;
    const readQuery = db.prepare(query);
    const questions = readQuery.all(id);
    return questions;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createQuestion = (
  title: string,
  time: number,
  categoryId: number,
) => {
  try {
    console.log('title: ', title);
    const query = `INSERT INTO QUESTIONS (title, time, categoryId) VALUES(?,?, ?)`;
    const writeQuery = db.prepare(query);
    const queryInfo = writeQuery.run(title, time, categoryId);
    return queryInfo;
  } catch (error) {
    console.log('createQuestion query error: ', error);
    throw error;
  }
};

export const getQuestionById = (id: number) => {
  try {
    const query = 'SELECT * FROM QUESTIONS q WHERE q.id = ?';
    const readQuery = db.prepare(query);
    const question = readQuery.get(id);
    console.log('resut question from id: ', question);
    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAttemptsByQuestionId = (questionId: number) => {
  try {
    const query = 'SELECT * FROM ATTEMPTS a WHERE a.questionId = ?';
    const readQuery = db.prepare(query);
    const attempts = readQuery.all(questionId);
    console.log('attempts after query: ', attempts);
    return attempts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createAttempt = (
  date: string,
  timeTaken: number,
  performanceCategoryId: number,
  questionId: number,
) => {
  try {
    const query =
      'INSERT INTO ATTEMPTS (date, timeTaken, performanceCategoryId, questionId ) VALUES(?, ?, ?, ?)';
    const writeQuery = db.prepare(query);
    const attemptInfo = writeQuery.run(
      date,
      timeTaken,
      performanceCategoryId,
      questionId,
    );
    return attemptInfo;
  } catch (error) {
    console.log('create attempt error: ', error);
    return error;
  }
};

// export default getCategories;
