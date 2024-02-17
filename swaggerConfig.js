const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task API",
      version: "1.0.0",
      description: "Documentation for Task API",
    },
  },
  apis: ["./routes/tasks.js"],
};

const specs = swaggerJsdoc(options);

const swaggerDocs = (app, port) => {
  app.use('/api/routes/docs', swaggerUi.serve, swaggerUi.setup(specs));
  app.get('/api/routes/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
  console.log(`version 1 docs are available at http://localhost:${port}/api/routes/docs`);
};

module.exports = { specs, swaggerUi, swaggerDocs };