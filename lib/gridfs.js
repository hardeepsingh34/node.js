const mongoose = require('mongoose');

let bucket; // will be initialized after Mongo connects

function initGridFS() {
  if (bucket) return bucket;
  const conn = mongoose.connection;
  if (!conn.db) throw new Error('Mongo connection not ready yet');
  bucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'uploads' });
  return bucket;
}

function getBucket() {
  if (!bucket) return initGridFS();
  return bucket;
}

module.exports = { getBucket, initGridFS };
