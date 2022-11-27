const express = require('express');

const router = express.Router();
const chatbotController  = require('../controller/inbox');

router.post("/webhook", chatbotController.eventReceivedRespone); 

router.get("/messaging-webhook", chatbotController.getEventReceivedRespone);

module.exports = router;
