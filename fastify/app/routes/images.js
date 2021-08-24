const prefix = '/images',
  fs = require('fs'),
  util = require('util'),
  path = require('path'),
  { pipeline } = require('stream'),
  pump = util.promisify(pipeline),
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
        description: 'Retorna el listado de imagenes',
        tags: ['Images'],
        summary: 'Listado completo de imagenes',
        response: {
          200: {
            description: 'Succesful response',
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
          }
        }
      }
    },
    (request, response) => {
      return Image.fetchAll()
        .then(images => {
          return response.send(images.toJSON());
        })
        .catch( err => {
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
        description: 'Retorna la informacion de una imagen',
        tags: ['Images'],
        summary: 'Informacion de imagen',
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
              src: { type: 'string' },
              filepath: { type: 'string' },
              filename: { type: 'string' },
              minetype: { type: 'string' },
              alt: { type: 'string' },
              created_at: { type: 'string' },
              updated_at: { type: 'string' }
            }
          }
        }
      }
    },
    (request, response) => {
      return Image.where(request.params).fetch()
        .then(image => {
          return response.send(image.toJSON());
        })
        .catch( err => {
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
        description: 'Actualizar la informacion de una image',
        tags: ['Images'],
        summary: 'Actualizacion de una imagen',
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          }
        },
        response: {
          200: {
            description: 'Succesful response',
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
        }
      }
    },
    (request, response) => {
      return Image.where(request.params).fetch()
        .then(image => {
          return image.save(request.body, { patch: true })
            .then(image => {
              return response.send(image.toJSON());
            })
            .catch( err => {
              return response.send(err);
            })
        })
        .catch( err => {
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
        description: 'Elimina una imagen',
        tags: ['Images'],
        summary: 'Elimina una imagen',
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
              success: {type: 'boolean'}
            }
          }
        }
      }
    },
    (request, response) => {
      return Image.where(request.params).destroy()
        .then(result => {
          fs.rmdir(`./public/images/${request.params.id}`, { recursive: true }, (err) => {
            if (err)
              return response.send(err);

            return response.send({ success: true });
          });
        })
        .catch( err => {
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
        description: 'Ruta para crear una imagen',
        tags: ['Images'],
        summary: 'Ruta para crear una imagen',
        consumes: ["multipart/form-data"],
        body: {
          isFileType: true,
          properties: {
            file: { "isFileType": true }
          }
        },
        response: {
          201: {
            description: 'Succesful response',
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
        }
      }
    },
    async (request, response) => {
      const data = await request.file();
      let imageData = {
        filename: data.filename,
        mimetype: data.mimetype,
      };
      return new Image(imageData).save()
        .then( async (image) => {
            let imageObject = image.toJSON(),
              buff = new Buffer(imageObject.filename),
              fileName = Buffer.from(buff.toString('base64'), 'utf8').toString('hex'),
              filePath = `./public/images/${imageObject.id}`;
            if (!fs.existsSync(filePath)) {
              fs.mkdirSync(filePath);
            }
            filePath = `${filePath}/${fileName}${path.extname(imageObject.filename)}`;
            await pump(data.file, fs.createWriteStream(filePath));
            let src = `${process.env.API_URL}${filePath.replace(/\./, '')}`;
            return image.save({ filepath: filePath, src: src }, { patch: true })
              .then(image => {
                return response.send(image.toJSON());
              })
              .catch(err => {
                return response.send(err);
              });
          })
        .catch( err => {
          return response.send(err);
        });
    }
  );

  done();
}