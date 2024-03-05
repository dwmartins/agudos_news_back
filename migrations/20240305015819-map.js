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
  const sql = `ALTER TABLE listing ADD COLUMN map LONGTEXT AFTER zipCode`;
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
  const sql = `ALTER TABLE listing DROP COLUMN map`;
  db.runSql(sql, function (err) {
    if (err) {
      console.error('Erro ao executar a migração down:', err);
      return callback(err);
    }
    console.log('Migração down concluída com sucesso.');
    callback();
  });
};



exports._meta = {
  "version": 1
};
