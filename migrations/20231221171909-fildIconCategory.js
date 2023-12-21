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
  const sql = `ALTER TABLE listing_category ADD COLUMN icon VARCHAR(50) NOT NULL AFTER cat_name`;
  db.runSql(sql, function (err) {
    if(err) return callback(err);
    callback();
  });
};

exports.down = function(db) {
  const sql = `ALTER TABLE listing_category DROP COLUMN icon`;

  db.runSql(sql, function (err) {
    if(err) return callback(err);
    callback();
  });
};

exports._meta = {
  "version": 1
};
