const express = require("express");
const app = express();
const logger = require("./logger");
require('dotenv').config();
const cors = require('cors')

app.use(express.json());
app.use(cors())


app.use("/api", require("./routes/api"));

app.listen(process.env.PORT || 3030, () => {
    logger.info(`server is running on port ${process.env.PORT || 3030}`)

});

module.exports = app;
