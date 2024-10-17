import React from "react";
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51Q8rkQEzOxqF9qqIRvmDJSWgE9mJYWBlMyl5KAHidcbRODmD4m70dExFFqd6gIcPO4D14NtCcdyr3POJmpd658Gr00AgsbcDqd'


    const onToken = token => {
        console.log(token);
        alert('Payment Successful')
    }

    return (
        <StripeCheckout
        label="Pay Now"
        name="Style Market"
        billingAddress
        shippingAddress
        image="https://svgshare.com/i/CUz.svg"
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel="Pay Now"
        token={onToken}
        stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;