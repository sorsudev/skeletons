const prefix = '/sites',
  Site = require('../models/site'),
  Image = require('../models/image');

module.exports = (fastify, opts, done) => {
  fastify.get(`${prefix}`,
    {
      schema: {
        security: [
          {
            Bearer: []
          }
        ],
        description: 'Retorna el listado de sitios',
        tags: ['Sites'],
        summary: 'Listado completo de sitios',
        response: {
          200: {
            description: 'Succesful response',
            type: 'object',
            properties: {
              sites: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    url: { type: 'string' },
                    active: { type: 'boolean' },
                    title: { type: 'string' },
                    headTitle: { type: 'string' },
                    map: { type: 'string' },
                    terms: { type: 'string' },
                    facebook: { type: 'string' },
                    whatsapp: { type: 'string' },
                    folderName: { type: 'string' },
                    created_at: { type: 'string' },
                    updated_at: { type: 'string' },
                    images: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer' },
                          filepath: { type: 'string' },
                          filename: { type: 'string' },
                          minetype: { type: 'string' },
                          src: { type: 'string' },
                          alt: { type: 'string' },
                          created_at: { type: 'string' },
                          updated_at: { type: 'string' }
                        }
                      }
                    },
                    contact_mails: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer' },
                          name: { type: 'string' },
                          email: { type: 'string' },
                          position: { type: 'string' },
                          created_at: { type: 'string' },
                          updated_at: { type: 'string' }
                        }
                      }
                    },
                    cars: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer' },
                          name: { type: 'string' },
                          cotiza: { type: 'string' },
                          manejo: { type: 'string' },
                          more: { type: 'string' },
                          terms: { type: 'string' },
                          created_at: { type: 'string' },
                          updated_at: { type: 'string' },
                          images: {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                id: { type: 'integer' },
                                filepath: { type: 'string' },
                                filename: { type: 'string' },
                                minetype: { type: 'string' },
                                src: { type: 'string' },
                                alt: { type: 'string' },
                                created_at: { type: 'string' },
                                updated_at: { type: 'string' }
                              }
                            }
                          },
                        }
                      }
                    },
                    contact_mails: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer' },
                          name: { type: 'string' },
                          email: { type: 'string' },
                          position: { type: 'string' },
                          created_at: { type: 'string' },
                          updated_at: { type: 'string' },
                        }
                      }
                    },
                  }
                }
              },
              range: {
                type: 'object',
                properties: {
                  start: { type: 'integer' },
                  end: { type: 'integer' },
                  total: { type: 'integer' },
                  pageCount: { type: 'integer'}
                }
              }
            }
          }
        }
      }
    },
    (request, response) => {
      var page = request.query.page || 1;
      var pageSize = request.query.pageSize || 10;
      return Site.query(qb => {
        qb.orderBy(request.query.sortBy, request.query.sortOrder)
      }).fetchPage({ page: page, pageSize: pageSize, withRelated: ['images', 'cars', 'cars.images', 'contact_mails'] })
        .then(sites => {
          let startElement = (page - 1) * pageSize;
          let endElement = startElement + pageSize;
          let total = sites.pagination.rowCount
          if (endElement > total)
            endElement = total + 1;

          return response.send({
            sites: sites.toJSON(),
            range: { start: startElement, end: endElement - 1, total: total, pageCount: sites.pagination.pageCount }
          });
        })
        .catch(err => {
          return response.send(err);
        });
    }
  );
  fastify.get(`${prefix}/actives`,
    {
      schema: {
        security: [
          {
            Bearer: []
          }
        ],
        description: 'Retorna el listado de sitios solo activos',
        tags: ['Sites'],
        summary: 'Listado completo de sitios solo activos',
        response: {
          200: {
            description: 'Succesful response',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                url: { type: 'string' },
                title: { type: 'string' },
                folderName: { type: 'string' },
                active: { type: 'boolean' },
                images: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      filename: {type: 'string'},
                      src: { type: 'string' },
                      reftype: { type: 'string' },
                    }
                  }
                }
              }
            }
          },
        }
      }
    },
  (request, response) => {
    return Site.query(qb => {
      qb.where({ active: true })
    }).fetchAll({ withRelated: ['images'] })
      .then(sites => {
        return response.send(sites.toJSON());
      })
      .catch(err => {
        return response.send(err);
      });
  }
  );
fastify.get(`${prefix}/to_auto_complete`,
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      description: 'Retorna el listado de sitios para autocompletes',
      tags: ['Sites'],
      summary: 'Listado completo de sitios para autocompletes',
      response: {
        200: {
          description: 'Succesful response',
          type: 'object',
          properties: {
            sites: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  url: { type: 'string' },
                  title: { type: 'string' },
                  active: { type: 'boolean' },
                  contact_mails: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                      }
                    }
                  },
                  cars: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        cotiza: { type: 'string' },
                        manejo: { type: 'string' },
                        more: { type: 'string' },
                        terms: { type: 'string' },
                        created_at: { type: 'string' },
                        updated_at: { type: 'string' },
                      }
                    }
                  },
                }
              }
            },
            range: {
              type: 'object',
              properties: {
                start: { type: 'integer' },
                end: { type: 'integer' },
                total: { type: 'integer' },
                pageCount: { type: 'integer' }
              }
            }
          }
        }
      }
    }
  },
  (request, response) => {
    var page = request.query.page || 1;
    var pageSize = request.query.pageSize || 10;
    return Site.query(qb => {
      qb.orderBy(request.query.sortBy, request.query.sortOrder)
    }).fetchPage({ page: page, pageSize: pageSize, withRelated: ['images', 'cars', 'cars.images', 'contact_mails'] })
      .then(sites => {
        let startElement = (page - 1) * pageSize;
        let endElement = startElement + pageSize;
        let total = sites.pagination.rowCount
        if (endElement > total)
          endElement = total + 1;

        return response.send({
          sites: sites.toJSON(),
          range: { start: startElement, end: endElement - 1, total: total, pageCount: sites.pagination.pageCount }
        });
      })
      .catch(err => {
        return response.send(err);
      });
  }
);
fastify.get(`${prefix}/by_folder_name/:folderName`,
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      description: 'Retorna la informacion de un sitio',
      tags: ['Sites'],
      summary: 'Informacion del sitio ',
      params: {
        type: 'object',
        properties: {
          folderName: { type: 'string' },
        }
      },
      response: {
        200: {
          description: 'Succesful response',
          type: 'object',
          properties: {
            id: { type: 'integer' },
            url: { type: 'string' },
            title: { type: 'string' },
            active: { type: 'boolean' },
            headTitle: { type: 'string' },
            map: { type: 'string' },
            terms: { type: 'string' },
            facebook: { type: 'string' },
            whatsapp: { type: 'string' },
            folderName: { type: 'string' },
            created_at: { type: 'string' },
            updated_at: { type: 'string' },
            images: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  filepath: { type: 'string' },
                  src: { type: 'string' },
                  filename: { type: 'string' },
                  minetype: { type: 'string' },
                  alt: { type: 'string' },
                  created_at: { type: 'string' },
                  updated_at: { type: 'string' }
                }
              }
            },
            contact_mails: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  name: { type: 'string' },
                  email: { type: 'string' },
                  position: { type: 'string' },
                  created_at: { type: 'string' },
                  updated_at: { type: 'string' }
                }
              }
            },
            cars: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  name: { type: 'string' },
                  cotiza: { type: 'string' },
                  manejo: { type: 'string' },
                  more: { type: 'string' },
                  terms: { type: 'string' },
                  created_at: { type: 'string' },
                  updated_at: { type: 'string' },
                  images: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        src: { type: 'string' },
                        filepath: { type: 'string' },
                        filename: { type: 'string' },
                        minetype: { type: 'string' },
                        alt: { type: 'string' },
                        created_at: { type: 'string' },
                        updated_at: { type: 'string' }
                      }
                    }
                  },
                }
              }
            },
            contact_mails: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  name: { type: 'string' },
                  email: { type: 'string' },
                  position: { type: 'string' },
                  created_at: { type: 'string' },
                  updated_at: { type: 'string' },
                }
              }
            },
          }
        }
      }
    }
  },
  (request, response) => {
    return Site.where(request.params).fetch({ withRelated: ['images', 'cars', 'cars.images', 'contact_mails'] })
      .then(site => {
        returnObject = site.toJSON();
        returnObject.contact_mails_ids = returnObject.contact_mails.map(emailObject => emailObject.id)
        returnObject.cars_ids = returnObject.cars.map(car => car.id)
        return response.send(returnObject);
      })
      .catch(err => {
        return response.send(err);
      });
  }
);
fastify.get(`${prefix}/:id`,
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      description: 'Retorna la informacion de un sitio',
      tags: ['Sites'],
      summary: 'Informacion del sitio ',
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
        }
      },
      response: {
        200: {
          description: 'Succesful response',
          type: 'object',
          properties: {
            id: { type: 'integer' },
            url: { type: 'string' },
            title: { type: 'string' },
            active: { type: 'boolean' },
            headTitle: { type: 'string' },
            map: { type: 'string' },
            terms: { type: 'string' },
            facebook: { type: 'string' },
            whatsapp: { type: 'string' },
            folderName: { type: 'string' },
            created_at: { type: 'string' },
            updated_at: { type: 'string' },
            images: {
              type: 'object',
              properties: {
                opengraph: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    filepath: { type: 'string' },
                    src: { type: 'string' },
                    filename: { type: 'string' },
                    minetype: { type: 'string' },
                    reftype: { type: 'string' },
                    alt: { type: 'string' },
                    created_at: { type: 'string' },
                    updated_at: { type: 'string' }
                  }
                },
                portada: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    filepath: { type: 'string' },
                    src: { type: 'string' },
                    filename: { type: 'string' },
                    minetype: { type: 'string' },
                    alt: { type: 'string' },
                    reftype: { type: 'string' },
                    created_at: { type: 'string' },
                    updated_at: { type: 'string' }
                  }
                }
              }
            },
            contact_mails: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  name: { type: 'string' },
                  email: { type: 'string' },
                  position: { type: 'string' },
                  created_at: { type: 'string' },
                  updated_at: { type: 'string' }
                }
              }
            },
            cars: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  name: { type: 'string' },
                  cotiza: { type: 'string' },
                  manejo: { type: 'string' },
                  more: { type: 'string' },
                  terms: { type: 'string' },
                  created_at: { type: 'string' },
                  updated_at: { type: 'string' },
                  images: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        filepath: { type: 'string' },
                        filename: { type: 'string' },
                        minetype: { type: 'string' },
                        alt: { type: 'string' },
                        reftype: { type: 'string' },
                        created_at: { type: 'string' },
                        updated_at: { type: 'string' }
                      }
                    }
                  },
                }
              }
            },
            contact_mails_ids: {
              type: 'array',
              items: {
                type: 'integer'
              }
            },
            cars_ids: {
              type: 'array',
              items: {
                type: 'integer'
              }
            },
            contact_mails: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  name: { type: 'string' },
                  email: { type: 'string' },
                  position: { type: 'string' },
                  created_at: { type: 'string' },
                  updated_at: { type: 'string' },
                }
              }
            },
          }
        }
      }
    }
  },
  (request, response) => {
    return Site.where(request.params).fetch({ withRelated: ['images', 'cars', 'contact_mails'] })
      .then(site => {
        returnObject = site.toJSON();
        returnObject.contact_mails_ids = returnObject.contact_mails.map(emailObject => emailObject.id)
        returnObject.cars_ids = returnObject.cars.map(car => car.id)
        let opengraph = returnObject.images.find(image => {
          return image.reftype === 'opengraph';
        });
        let portada = returnObject.images.find(image => {
          return image.reftype === 'portada';
        });
        returnObject.images = { opengraph: opengraph, portada: portada }
        return response.send(returnObject);
      })
      .catch(err => {
        return response.send(err);
      });
  }
);
fastify.patch(`${prefix}/:id`,
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      description: 'Actualizar la informacion de un sitio',
      tags: ['Sites'],
      summary: 'Actualizacion de un sitio',
      params: {
        type: 'object',
        properties: {
          id: { type: 'number' },
        }
      },
      body: {
        type: 'object',
        properties: {
          url: { type: 'string' },
          active: { type: 'boolean' },
          title: { type: 'string' },
          headTitle: { type: 'string' },
          map: { type: 'string' },
          terms: { type: 'string' },
          facebook: { type: 'string' },
          whatsapp: { type: 'string' },
          folderName: { type: 'string' },
        }
      },
      response: {
        200: {
          description: 'Succesful response',
          type: 'object',
          properties: {
            id: { type: 'integer' },
            url: { type: 'string' },
            title: { type: 'string' },
            headTitle: { type: 'string' },
            map: { type: 'string' },
            terms: { type: 'string' },
            facebook: { type: 'string' },
            whatsapp: { type: 'string' },
            folderName: { type: 'string' },
            created_at: { type: 'string' },
            updated_at: { type: 'string' },
          }
        }
      }
    }
  },
  (request, response) => {
    return Site.where(request.params).fetch()
      .then(site => {
        let basicData = request.body;
        let promises = [];
        promises.push(site.contact_mails().detach());
        promises.push(site.cars().detach());
        if (basicData.image_id) {
          promises.push(uploadImageRefType(basicData.image_id, basicData.reftype, site));
        }
        basicData.contact_mails_ids.forEach(contact_email_id => {
          promises.push(site.contact_mails().attach(contact_email_id));
        });
        basicData.cars_ids.forEach(car_id => {
          promises.push(site.cars().attach(car_id));
        });
        delete basicData.image_id;
        delete basicData.reftype;
        delete basicData.images;
        delete basicData.cars;
        delete basicData.cars_ids;
        delete basicData.contact_mails;
        delete basicData.contact_mails_ids;
        return Promise.all(promises)
          .then(results => {
            return site.save(basicData, { patch: true })
              .then(site => {
                return response.send(site.toJSON());
              })
              .catch(err => {
                return response.send(err);
              })
          })
          .catch(err => {
            return response.send(err);
          })
      })
      .catch(err => {
        return response.send(err);
      });
  }
);
fastify.delete(`${prefix}/:id`,
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      description: 'Eliminar un sitio',
      tags: ['Sites'],
      summary: 'Eliminar un sitio',
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
        }
      },
      response: {
        200: {
          description: 'Succesful response',
          type: 'object',
          properties: {
            success: { type: 'boolean' }
          }
        }
      }
    }
  },
  (request, response) => {
    return Site.where(request.params).destroy()
      .then(result => {
        return response.send({ success: true });
      })
      .catch(err => {
        return response.send(err);
      });
  }
);
fastify.post(`${prefix}`,
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      description: 'Ruta para crear un Sitio',
      tags: ['Sites'],
      summary: 'Ruta para crear un Sitio',
      body: {
        type: 'object',
        properties: {
          url: { type: 'string' },
          title: { type: 'string' },
          active: { type: 'boolean' },
          headTitle: { type: 'string' },
          map: { type: 'string' },
          terms: { type: 'string' },
          facebook: { type: 'string' },
          whatsapp: { type: 'string' },
          folderName: { type: 'string' },
        }
      },
      response: {
        201: {
          description: 'Succesful response',
          type: 'object',
          properties: {
            id: { type: 'integer' },
            url: { type: 'string' },
            title: { type: 'string' },
            headTitle: { type: 'string' },
            map: { type: 'string' },
            terms: { type: 'string' },
            facebook: { type: 'string' },
            whatsapp: { type: 'string' },
            folderName: { type: 'string' },
            created_at: { type: 'string' },
            updated_at: { type: 'string' },
          }
        }
      }
    }
  },
  (request, response) => {
    let mailsIds = request.body.contact_mails_ids;
    delete request.body.contact_mails_ids;
    return new Site(request.body).save()
      .then(site => {
        let promises = [];
        mailsIds.forEach(contact_email_id => {
          promises.push(site.contact_mails().attach(contact_email_id));
        });
        Promise.all(promises)
          .then(resolves => {
            return response.send(site.toJSON());
          })
          .catch(err => { return response.send(err); });
      })
      .catch(err => { return response.send(err); });
  }
);
fastify.post(`${prefix}/:id/add_contact_mail`,
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      description: 'Ruta para agregar un contacto al Sitio',
      tags: ['Sites'],
      summary: 'Ruta agregar un contacto al Sitio',
      body: {
        type: 'object',
        properties: {
          contact_email_id: { type: 'integer' },
        }
      },
      response: {
        201: {
          description: 'Succesful response',
          type: 'object',
          properties: {
            sites: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  url: { type: 'string' },
                  title: { type: 'string' },
                  headTitle: { type: 'string' },
                  map: { type: 'string' },
                  terms: { type: 'string' },
                  facebook: { type: 'string' },
                  whatsapp: { type: 'string' },
                  folderName: { type: 'string' },
                  created_at: { type: 'string' },
                  updated_at: { type: 'string' },
                  images: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        filepath: { type: 'string' },
                        filename: { type: 'string' },
                        minetype: { type: 'string' },
                        alt: { type: 'string' },
                        created_at: { type: 'string' },
                        updated_at: { type: 'string' }
                      }
                    }
                  },
                  contact_mails: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        position: { type: 'string' },
                        created_at: { type: 'string' },
                        updated_at: { type: 'string' }
                      }
                    }
                  },
                  cars: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        cotiza: { type: 'string' },
                        manejo: { type: 'string' },
                        more: { type: 'string' },
                        terms: { type: 'string' },
                        created_at: { type: 'string' },
                        updated_at: { type: 'string' },
                        images: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              id: { type: 'integer' },
                              filepath: { type: 'string' },
                              filename: { type: 'string' },
                              minetype: { type: 'string' },
                              alt: { type: 'string' },
                              created_at: { type: 'string' },
                              updated_at: { type: 'string' }
                            }
                          }
                        },
                      }
                    }
                  },
                  contact_mails: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        position: { type: 'string' },
                        created_at: { type: 'string' },
                        updated_at: { type: 'string' },
                      }
                    }
                  },
                }
              }
            },
            range: {
              type: 'object',
              properties: {
                start: { type: 'integer' },
                end: { type: 'integer' },
                total: { type: 'integer' },
                pageCount: { type: 'integer' }
              }
            }
          }
        }
      }
    }
  },
  (request, response) => {
    return Site.where(request.params).fetch()
      .then(site => {
        return site.contact_mails().attach(request.body.contact_email_id)
          .then(site => {
            return Site.where(request.params).fetch({ withRelated: ['image', 'map', 'map.image', 'amenities', 'amenities.image', 'sliders', 'contact_mails', 'prototypes', 'prototypes'] })
              .then(site => {
                return response.send(site.toJSON());
              })
              .catch(err => {
                return response.send(err);
              });
          })
          .catch(err => {
            return response.send(err);
          })
      })
      .catch(err => {
        return response.send(err);
      });
  }
);

function uploadImageRefType(imageId, refType, site) {
  return new Promise((resolve, reject) => {
    return site.images().where({reftype: refType}).fetch()
      .then(images => {
        let ids = images.map(image => image.id)
        return site.images().detach(ids)
          .then(success => {
            return Image.where({ id: imageId }).fetch()
              .then(image => {
                return site.images().attach(imageId)
                  .then(data => {
                    image.save({ reftype: refType }, { patch: true })
                      .then(image => {
                        resolve(image);
                      })
                      .catch(err => reject(err));
                  })
                  .catch(err => reject(err));
              })
              .catch(err => reject(err));
          })
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  })
}

done();

}