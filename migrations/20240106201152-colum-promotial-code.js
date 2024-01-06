'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  const sql = `ALTER TABLE carousel ADD COLUMN promotionalCode VARCHAR(50) NOT NULL AFTER payment`;
  db.runSql(sql, function (err) {
    if(err) return callback(err);
    callback();
  });
};

exports.down = function(db) {
  const sql = `ALTER TABLE carousel DROP COLUMN promotionalCode`;

  db.runSql(sql, function (err) {
    if(err) return callback(err);
    callback();
  });;
};

exports._meta = {
  "version": 1
};
