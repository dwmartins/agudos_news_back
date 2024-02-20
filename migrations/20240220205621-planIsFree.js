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
  const sql = `ALTER TABLE listing_plans ADD COLUMN isFree ENUM('Y', 'N') NOT NULL AFTER level`;
  db.runSql(sql, function (err) {
    if(err) return callback(err);
    callback();
  });
};

exports.down = function(db) {
  const sql = `ALTER TABLE listing_plans DROP COLUMN isFree`;

  db.runSql(sql, function (err) {
    if(err) return callback(err);
    callback();
  });
};

exports._meta = {
  "version": 1
};
