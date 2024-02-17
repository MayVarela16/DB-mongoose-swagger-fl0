const express = require('express');
const app = express();
const PORT = 8080;
const { dbConnection } = require('./config/config');
const routes = require('./routes/tasks');
const { specs, swaggerUi, swaggerDocs } = require("./swaggerConfig");

app.use(express.json());

app.use('/', routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

dbConnection();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  swaggerDocs(app, PORT);
});
