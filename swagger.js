import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Indicados ao oscar 2022 - API',
    description: 'Essa API tem como objetivo listar todos os filmes indicados ao oscar em 2022.',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  schemas: ['http'],
  components: {
    '@schemas': {
      "Movie": {
        type: "object",
        properties: {
          thumb: {
            type: 'string',
          },
          title: {
            type: 'string',
          },
          category: {
            type: 'string',
          },
          genre: {
            type: 'string',
          },
          director: {
            type: 'string',
          },
          year: {
            type: 'integer',
          },
          duration: {
            type: 'integer',
          },
          score: {
            type: 'string',
          },
          link: {
            type: 'string',
          }
        }
      },
      "listMovie": {
        type: "object",
        properties: {
          current_page: {
            type: 'integer',
          },
          pagination: {
            type: 'integer',
          },
          data: {
            type: "array",
            items: {
              type: "object",
              properties:
              {
                item1: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                    },
                    thumb: {
                      type: 'string',
                    },
                    title: {
                      type: 'string',
                    },
                    category: {
                      type: 'string',
                    },
                    genre: {
                      type: 'string',
                    },
                    director: {
                      type: 'string',
                    },
                    year: {
                      type: 'integer',
                    },
                    duration: {
                      type: 'integer',
                    },
                    score: {
                      type: 'string',
                    },
                    link: {
                      type: 'string',
                    },
                    createdAt: {
                      type: 'string'
                    },
                    updatedAt: {
                      type: 'string'
                    }
                  }
                },
                item2: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                    },
                    thumb: {
                      type: 'string',
                    },
                    title: {
                      type: 'string',
                    },
                    category: {
                      type: 'string',
                    },
                    genre: {
                      type: 'string',
                    },
                    director: {
                      type: 'string',
                    },
                    year: {
                      type: 'integer',
                    },
                    duration: {
                      type: 'integer',
                    },
                    score: {
                      type: 'string',
                    },
                    link: {
                      type: 'string',
                    },
                    createdAt: {
                      type: 'string'
                    },
                    updatedAt: {
                      type: 'string'
                    }
                  }
                },
                item3: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                    },
                    thumb: {
                      type: 'string',
                    },
                    title: {
                      type: 'string',
                    },
                    category: {
                      type: 'string',
                    },
                    genre: {
                      type: 'string',
                    },
                    director: {
                      type: 'string',
                    },
                    year: {
                      type: 'integer',
                    },
                    duration: {
                      type: 'integer',
                    },
                    score: {
                      type: 'string',
                    },
                    link: {
                      type: 'string',
                    },
                    createdAt: {
                      type: 'string'
                    },
                    updatedAt: {
                      type: 'string'
                    }
                  }
                },
                item4: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                    },
                    thumb: {
                      type: 'string',
                    },
                    title: {
                      type: 'string',
                    },
                    category: {
                      type: 'string',
                    },
                    genre: {
                      type: 'string',
                    },
                    director: {
                      type: 'string',
                    },
                    year: {
                      type: 'integer',
                    },
                    duration: {
                      type: 'integer',
                    },
                    score: {
                      type: 'string',
                    },
                    link: {
                      type: 'string',
                    },
                    createdAt: {
                      type: 'string'
                    },
                    updatedAt: {
                      type: 'string'
                    }
                  }
                },
                item5: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                    },
                    thumb: {
                      type: 'string',
                    },
                    title: {
                      type: 'string',
                    },
                    category: {
                      type: 'string',
                    },
                    genre: {
                      type: 'string',
                    },
                    director: {
                      type: 'string',
                    },
                    year: {
                      type: 'integer',
                    },
                    duration: {
                      type: 'integer',
                    },
                    score: {
                      type: 'string',
                    },
                    link: {
                      type: 'string',
                    },
                    createdAt: {
                      type: 'string'
                    },
                    updatedAt: {
                      type: 'string'
                    }
                  }
                }

              }
            }

          }
        }
      },
      "receivedMovie": {
        type: "object",
        properties: {
          thumb: {
            type: 'string',
          },
          title: {
            type: 'string',
          },
          category: {
            type: 'string',
          },
          genre: {
            type: 'string',
          },
          director: {
            type: 'string',
          },
          year: {
            type: 'integer',
          },
          duration: {
            type: 'integer',
          },
          score: {
            type: 'string',
          },
          link: {
            type: 'string',
          },
          createdAt: {
            type: 'string'
          },
          updatedAt: {
            type: 'string'
          }
        }
      }
    }
  }
}

const outputFile = './src/swagger.json'
const endpointsFiles = ['./src/index.js']

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc).then(async () => {
  await import('./src/index.js'); // Your project's root file
});
