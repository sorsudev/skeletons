exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('images_sites', table => {
      table.integer('image_id').unsigned().index().references('images.id');
      table.integer('site_id').unsigned().index().references('sites.id');
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('images_sites'),
  ])
};