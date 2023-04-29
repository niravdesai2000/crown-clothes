require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRECT_KEY);

exports.handler = async (event) => {
    try {
        const {amount} = JSON.parse(event.body);
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency:"USD",
            payment_method_types: ['card']
        });
        return {
            statusCode: 200,
            body:JSON.stringify({paymentIntent})
        }
    }catch (e) {
        console.log(e)
        return {
            statusCode: 400,
            body:JSON.stringify({e})
        }
        
    }
}