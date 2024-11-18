import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2024-09-30.acacia' });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        // payment_method_types: ['card', 'upi'],
        line_items: [
          {
            price_data: {
              currency: 'inr',
              product_data: { name: 'Reservation Ticket' },
              unit_amount: req.body.amount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });

      res.status(200).json({ id: session.id });
    } catch (err) {
      const errorMessage = (err as Error).message;
      res.status(500).json({ error: errorMessage });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;
