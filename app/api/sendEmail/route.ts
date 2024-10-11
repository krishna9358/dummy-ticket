import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { name, email, travelers, from, to, departureDate, returnDate, address } = await req.json();

  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,  // Environment variable for Gmail user
      pass: process.env.GMAIL_PASS,  // Environment variable for Gmail password
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: `${email}`,  // Replace with the recipient's email
    subject: 'Order To Generate Dummy Ticket',
    text: `
      Name: ${name}
      Email: ${email}
      Travelers: ${travelers}
      From: ${from}
      To: ${to}
      Departure Date: ${departureDate}
      Return Date: ${returnDate}
      Current Address: ${address}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}
