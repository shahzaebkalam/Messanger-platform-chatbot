const crypto = require("crypto");

const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res, buf) => {
    try {
        var signature = req.headers["x-hub-signature-256"];

        if (!signature) {
            console.warn(`Couldn't find "x-hub-signature-256" in headers.`);
            buf();
        } else {
            var elements = signature.split("=");
            var signatureHash = elements[1];
            var expectedHash = crypto
            .createHmac("sha256", process.env.APP_SECRET)
            .update(buf)
            .digest("hex");
            if (signatureHash != expectedHash) {
            throw new Error("Couldn't validate the request signature.");
            }
            buf();
        }
    } catch (error) {
        console.log(error, 'error in verifyRequestSignature');
        return res.status(500).send(error.stack);
    }

}