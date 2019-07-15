const config = require('config');
const mysql = require('mysql');

class Database {
  constructor() {
    this.connection = mysql.createConnection(config.get("mysql"));
  }
  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err){
          return reject(err);
        }
        resolve(rows);
      });
    });
  }
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err){
          return reject(err);
        }
        resolve();
      });
    });
  }
}

const database = new Database();

module.exports = database;