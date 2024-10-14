import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const {
    name,
    email,
    phone,
    travelers,
    from,
    to,
    departureDate,
    returnDate,
    address,
    reservationType,
    hotelName,
    hotelLocation,
    checkInDate,
    checkOutDate,
    guests,
  } = await req.json();

  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,  // Environment variable for Gmail user
      pass: process.env.GMAIL_PASS,  // Environment variable for Gmail password
    },
  });

  // Flight or Hotel-specific email content
  let reservationDetails;
  if (reservationType === 'flight') {
    reservationDetails = `
      Travelers: ${travelers}
      From: ${from}
      To: ${to}
      Departure Date: ${departureDate}
      Return Date: ${returnDate ? returnDate : 'N/A'}
    `;
  } else if (reservationType === 'hotel') {
    reservationDetails = `
      Hotel Name: ${hotelName}
      Hotel Location: ${hotelLocation}
      Check-in Date: ${checkInDate}
      Check-out Date: ${checkOutDate}
      Number of Guests: ${guests}
    `;
  }

  // General email content for both types
  const emailContent = `
    Name: ${name}
    Email: ${email}
    Phone Number: ${phone}
    Current Address: ${address}
    
    Reservation Type: ${reservationType === 'flight' ? 'Flight Reservation for Visa' : 'Hotel Reservation'}
    
    ${reservationDetails}
  `;

  // Email options
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: `${email}`,  // Replace with the recipient's email
    subject: 'Order To Generate Dummy Ticket or Hotel Reservation',
    text: emailContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}
