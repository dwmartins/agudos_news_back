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
  const sql = `
    ALTER TABLE users
    CHANGE photo_url photo TEXT;
  `;

  db.runSql(sql, function (err) {
    if (err) {
      console.error('Erro ao executar a migração up:', err);
      return callback(err);
    }
    console.log('Migração up concluída com sucesso.');
    callback();
  });
};

exports.down = function(db, callback) {
  return null;
};

exports._meta = {
  "version": 1
};
