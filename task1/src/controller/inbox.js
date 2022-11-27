
const chatBotUtil = require('../utils/util');
const dotenv = require('dotenv');
dotenv.config();

exports.eventReceivedRespone = async (req, res) => {
    try {
        let body = req.body;
  
    if (body.object === "page") {
      const responseArray = body.entry.map(async function(entry) {
        let webhook_event = entry.messaging[0];
        if (webhook_event.sender) {
            const isFirstMessage = await chatBotUtil.randomGreetings(webhook_event.sender);
            if (isFirstMessage) {
                return isFirstMessage;
            }
        }
        if (webhook_event.message.startsWith('/')) {
            return chatBotUtil.queryResolver(webhook_event.message)
        }
        return chatBotUtil.unknownMessageResponse(webhook_event.message);
      })
      await Promise.all(responseArray).then((response) => {
        return res.status(200).send(response);
      });
      
    } else {
        return res.sendStatus(404);
    }
    } catch (error) {
        console.log(error, 'err')
        return res.sendStatus(400);
    } 
    
}

exports.getEventReceivedRespone = async (req, res) => {
    let verifyToken = process.env.VERIFY_TOKEN;
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
    if (mode && token) {
        if (mode === "subscribe" && token === verifyToken) {
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
}