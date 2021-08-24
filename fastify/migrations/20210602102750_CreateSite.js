exports.up = function(knex) {
  return knex.schema.createTable('sites', function (table) {
    table.increments();
    table.string('url');
    table.string('title');
    table.string('headTitle');
    table.string('map', 1000);
    table.string('terms');
    table.string('facebook');
    table.string('whatsapp');
    table.string('folderName');
    table.boolean('active');
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('sites');
};