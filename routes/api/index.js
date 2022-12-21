const express = require("express");
const { authenticate } = require("../../config/authenticate");
const router = express.Router();

const loginController = require("../../controllers/login")
const dataController = require("../../controllers/sampleData")

router.post("/login",loginController.login)
router.post("/create-sample-data",authenticate,dataController.createSampleData)
router.post("/get-sample-data",authenticate,dataController.getSampleData)
router.post("/delete-sample-data",authenticate,dataController.deleteSampleData)


module.exports = router;
