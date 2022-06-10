const pool = require("../../config/database");
module.exports = {
  createNews: (data, callBack) => {
    pool.query(
      `insert into news(title, category, user_id, description,published_at) 
                values(?,?,?,?,?)`,
      [
        data.title,
        data.category,
        data.user_id,
        data.description,
        data.published_at,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getNews: (callBack) => {
    pool.query(`select * from news`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  updateNews: (data, callBack) => {
    pool.query(
      `update news set title=?, category=?, user_id=?, description
      =?, published_at=? where id = ?`,
      [
        data.title,
        data.category,
        data.user_id,
        data.description,
        data.published_at,
        data.id,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteNews: (data, callBack) => {
    pool.query(
      `delete from news where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
