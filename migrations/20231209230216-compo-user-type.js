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

exports.up = function(db) {
  const sql = 'ALTER TABLE users ADD COLUMN user_type VARCHAR(50) NOT NULL AFTER active';
  return db.runSql(sql);
};
exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
