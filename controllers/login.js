const bcrypt = require('bcrypt');
const { Users } = require("../models")
const { generateToken } = require("../config/authenticate");
const logger = require("../logger");

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (email && password) {
            let user = await Users.findOne({
                attributes: ['id', 'name', 'email', 'password'],
                where: { email: email }
            });
            bcrypt.compare(password, user.password, async function (err, result) {
                if (!result) {
                    logger.error(`invalid username or password`)
                    return res
                        .status(422)
                        .json({ success: false, message: "invalid username or password" });
                } else {
                    const token = await generateToken(email);
                    logger.info(`login successful`)
                    return res.status(200).json({
                        message: "login successfull",
                        success: "ok",
                        token: token,
                        user:user.name
                    });
                }
            });
        } else {
            logger.error(`please provide required fields`)
            return res.status(400).json({
                message: `please provide required fields`,
                success: "false"
            });
        }
    } catch (error) {
        logger.error(`internal server error ${error}`)
        return res.status(500).json({
            message: `internal server error`,
            success: "false"
        });
    }
};
