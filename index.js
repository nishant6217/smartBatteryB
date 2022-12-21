const express = require("express");
const app = express();
const logger = require("./logger");
require('dotenv').config();

app.use(express.json());

app.use("/api", require("./routes/api"));

app.listen(process.env.PORT || 3000, () => {
    logger.info(`server is running on port ${process.env.PORT || 3000}`)

});

module.exports = app;
