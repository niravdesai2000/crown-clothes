import React from "react";
import {useElements, useStripe,CardElement} from "@stripe/react-stripe-js";
import './strp.styles.css';
const StripForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/.netlify/functions/create-payment-intent',{
            method: 'POST',
            body: JSON.stringify({
                amount: 10000
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(res => res.json());
        console.log(response)

        if (elements == null) {
            return;
        }



        
    };

    return(
        <form onSubmit={handleSubmit} className={"payment-form"}>
            <CardElement />
            <button type="submit" disabled={!stripe || !elements}>
                Pay
            </button>
        </form>
    )
}
export default StripForm;