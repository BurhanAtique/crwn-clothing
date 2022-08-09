import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51LUqbdBUR0Nj09qkmWKVKnaRSmli7lrkpDrIjUXUjyxTn2ub37kpUgAlIJ3TZwByXk9nAerRWhbgM1xQK8widIg200m90OfZhO';

  const onToken = token => {
    console.log(token);
    alert('Payment Succesful!');
  };

  return (
    <StripeCheckout // hete token and stripekey are mandatory others are optional
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken} // this comes on scuccess call back..but becaus we are not doing any back end payment
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;