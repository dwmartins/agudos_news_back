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
  const sql = `ALTER TABLE user_acesso DROP FOREIGN KEY user_acesso_ibfk_1`;

  return db.runSql(sql);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
