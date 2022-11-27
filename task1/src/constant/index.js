module.exports = {
    SUBJECT: 'Product purchased',
    HTML: (product)=> `<html>
    <body>
        <p>Order placed for ${product.name}</p>
    </body>
   </html>`,
   DESCRIPTION: '/desc',
   PRICE: '/price',
   SHIPPING: '/shipping',
   BUY: '/buy',
   GREETINGS: ["How are you?", "I hope you're doing well.", "I hope you're having a great day."],
}