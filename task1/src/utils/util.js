const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const constants = require('../constant');
const Product = require('../modal/product');
const mongoose = require('mongoose');
ObjectId = mongoose.Types.ObjectId;

const NodeCache = require( "node-cache" );
const myCache = new NodeCache({ checkperiod: 120 });


module.exports.sendEmail = async (product) => {
    try {
        let transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD,
            }
          });
          let mailOptions = {
            from: process.env.EMAIL,
            to: process.env.RECEIVED_NOTIFICATION_EMAIL,
            subject: constants.SUBJECT,
            html: constants.HTML(product),
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log('error in sending email', error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    } catch (error) {
        console.log(error, 'error in sending email');
    }
}

module.exports.randomGreetings = async (sender) => {
  try {
    const greetings = constants.GREETINGS;
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        const psid = sender.id;
        const cache = myCache.get(psid);
        if (!cache) {
            myCache.set(psid, 21600);
            return {message: randomGreeting};
        }
        return false;
  } catch (error) {
      console.log(error, 'error in random greetings');
      return false;
  }
}

module.exports.unknownMessageResponse = async (message) => {
  try {
        let response = 'Thank you for contacting us. we will get back to you soon. If you are trying command then please start your message with /';
        // you can add dynamic greating message here
        return{message: response}; 
  } catch (error) {
    console.log(error, 'error');
  }
}

module.exports.queryResolver = async (message) => {
  try {
    const query = message.split(' ')[0];
        const queryValue = message.split(' ')[1];
        if (ObjectId.isValid(queryValue)) {
            const product = await Product.findById(queryValue);
            if (!product) {
                return {message: 'Product not found'};
            }
            let response = 'Product not found';
            switch (query) {
                case constants.DESCRIPTION:
                    response = product.description;
                    break;
                case constants.PRICE:
                    response = product.price;
                    break;
                case constants.SHIPPING:
                    response = product.shipping;
                    break;
                case constants.BUY:
                    await this.sendEmail(product);
                    response = 'Thank you for purchasing, we have sent you a confirmation email';
                default:
                    break;
            }
            return{message: response}; 
        }
        return {message: 'Invalid product id'};
  } catch (error) {
    console.log(error, 'error');
  }
}