const MongoClient = require('mongodb').MongoClient;
const config = require('../config/index.js');

const mongoUrl = config.mongoUrl;

module.exports = {
  insertData: (obj) => {
    MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, db) => {
      if (err) throw err;
      const dbo = db.db('runoob').collection('userCol');
      dbo.insertOne(obj, (err, res) => {
        if (err) throw err;
        db.close();
      });
    });
  },
  findData: (obj, callback) => {
    MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, db) => {
      if (err) throw err;
      const dbo = db.db('runoob').collection('userCol');
      dbo.find(obj).toArray((err, res) => {
        if (err) throw err;
        callback(res);
        db.close();
      });
    });
  },
  updateData: (obj) => {
    MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, db) => {
      if (err) throw err;
      const dbo = db.db('runoob').collection('userCol');
      dbo.update({userName: obj.userName}, {$set: {password: obj.password}});
    })
  }
};
