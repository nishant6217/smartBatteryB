const { SampleData } = require("../models")
const logger = require("../logger");
const moment = require("moment")

module.exports.createSampleData = async (req, res) => {
    try {
        const { name, criteria, value, days, email, phone } = req.body;
        if (!name || !criteria || !value || !days || !email || !phone) {
            logger.error(`Please provide required fields`)
            return res.status(400).json({
                message: `"Please provide required fields`,
                success: "false"
            });
        }
        return await SampleData.create({
            name: name,
            criteria: criteria,
            value: value,
            days: days,
            email: email,
            phone: phone,
            createdby: parseInt(req.user),
            craetedAt: moment.now(),
            updatedAt: moment.now()
        }).then(function (users) {
            if (users) {
                logger.info(`insert successful`)
                res.status(200).json({
                    message: "Successfully inserted sample data",
                    success: "ok"
                });
            } else {
                logger.info(`Error in insert new record`)
                res.status(400).send('Error in insert new record');
            }
        });
    } catch (error) {
        logger.error(`internal server error ${error}`)
        return res.status(500).json({
            message: `internal server error`,
            success: "false"
        });
    }
};

module.exports.getSampleData = async (req, res) => {
    try {
        return await SampleData.findAll({ where: { createdby: req.user } }).then(function (users) {
            if (users) {
                logger.info(`insert successful`)
                res.status(200).json({
                    message: "Successfully fetched sample data",
                    success: "ok",
                    data: users
                });
            } else {
                logger.info(`Error in insert new record`)
                res.status(400).send('Error in insert new record');
            }
        });
    } catch (error) {
        logger.error(`internal server error ${error}`)
        return res.status(500).json({
            message: `internal server error`,
            success: "false"
        });
    }
};

module.exports.deleteSampleData = async (req, res) => {
    try {
        return !!await SampleData.destroy({
            where: {
                id: req.body.id
            }
        }).then(function (users) {
            if (users) {
                logger.info(`deletion successful`)
                res.status(200).json({
                    message: "deletion successful",
                    success: "ok",
                    data: users
                });
            } else {
                logger.info(`Error in deleting  record`)
                res.status(400).send('Error in deleting  record');
            }
        });
    } catch (error) {
        logger.error(`internal server error ${error}`)
        return res.status(500).json({
            message: `internal server error`,
            success: "false"
        });
    }
};
