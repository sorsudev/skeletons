const bookshelf = require('./base'),
  Site = bookshelf.Model.extend({
    tableName: 'sites',
    hasTimestamps: true,
    images() {
      return this.belongsToMany('Image', 'images_sites');
    }
  },
  {
    withFilter(params) {
      return this.query(qb => {
        let filters = JSON.parse(params.filters);
        let filterKeys = Object.keys(filters);
        if (filterKeys.length > 0) {
          filterKeys.forEach(filterKey => {
            qb.where(filterKey, '=', filters[filterKey])
          })
        }
        qb.orderBy(params.sortBy, params.sortOrder)
      });
    }
  })

module.exports = bookshelf.model('Site', Site);