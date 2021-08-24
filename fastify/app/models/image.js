const bookshelf = require('./base'),
  Image = bookshelf.Model.extend({
    tableName: 'images',
    hasTimestamps: true,
    sites() {
      return this.belongsToMany('Site', 'images_sites');
    },
    cars() {
      return this.belongsToMany('Car', 'cars_images');
    }
  })

module.exports = bookshelf.model('Image', Image);