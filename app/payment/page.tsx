import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const PaymentPage = () => {
  const router = useRouter();
  const { data } = router.query;

  useEffect(() => {
    const initiatePayment = async () => {
      const stripe = await stripePromise;

      // Create a Checkout Session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 1000 }), // Fixed amount in cents
      });

      const session = await response.json();
      if (session.id) {
        // Redirect to checkout
        if (stripe) {
          const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
          if (!error) {
            // After successful payment, send email
            await fetch('/api/sendEmail', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ formData: JSON.parse(data as string) }),
            });
          }
        }
      }
    };

    initiatePayment();
  }, [data]);

  return <div>Redirecting to payment...</div>;
};

export default PaymentPage;
