exports.up = function(knex) {
  return knex.schema.createTable('images', function (table) {
    table.increments();
    table.string('filepath');
    table.string('filename');
    table.string('mimetype');
    table.string('alt');
    table.string('src');
    table.string('reftype');
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('images');
};