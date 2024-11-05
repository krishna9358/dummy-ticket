import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,{
  apiVersion: '2024-09-30.acacia',
});

// Named export for the POST method
export async function POST(req: NextRequest) {
   try {
  //   const origin = req.headers.get('origin'); // Use get method to retrieve the origin
  //   if (!origin) {
  //     throw new Error('Origin header is missing'); // Handle missing origin
  //   }
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1QEbWXSB86dwtW41rbdOWSKf', // Replace with your actual Price ID
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get("origin") }/?success=true`,
      cancel_url: `${req.headers.get("origin") }/?canceled=true`,
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (err) {
    const errorMessage = (err as Error).message;
    const statusCode = (err as { statusCode?: number }).statusCode || 500;
    return new NextResponse(errorMessage, { status: statusCode });
  }
}

// Return 405 for unsupported methods
export function ALL() {
  return new NextResponse('Method Not Allowed', { status: 405 });
}
