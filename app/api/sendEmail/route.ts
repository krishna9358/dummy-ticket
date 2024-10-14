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

  // Default to prevent undefined values if some fields are missing
  const travelersInfo = travelers || 'N/A';
  const fromInfo = from || 'N/A';
  const toInfo = to || 'N/A';
  const departureDateInfo = departureDate || 'N/A';
  const returnDateInfo = returnDate || 'N/A';
  const hotelNameInfo = hotelName || 'N/A';
  const hotelLocationInfo = hotelLocation || 'N/A';
  const checkInDateInfo = checkInDate || 'N/A';
  const checkOutDateInfo = checkOutDate || 'N/A';
  const guestsInfo = guests || 'N/A';

  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,  // Environment variable for Gmail user
      pass: process.env.GMAIL_PASS,  // Environment variable for Gmail password
    },
  });

  // Flight or Hotel-specific email content based on reservation type
  let reservationDetails;
  if (reservationType === 'flight') {
    reservationDetails = `
      Travelers: ${travelersInfo}
      From: ${fromInfo}
      To: ${toInfo}
      Departure Date: ${departureDateInfo}
      Return Date: ${returnDateInfo}
    `;
  } else if (reservationType === 'hotel') {
    reservationDetails = `
      Hotel Name: ${hotelNameInfo}
      Hotel Location: ${hotelLocationInfo}
      Check-in Date: ${checkInDateInfo}
      Check-out Date: ${checkOutDateInfo}
      Number of Guests: ${guestsInfo}
    `;
  } else {
    reservationDetails = 'Reservation type is not recognized.';
  }

  // General email content for both types
  const emailContent = `
    Name: ${name}
    Email: ${email}
    Phone Number: ${phone || 'N/A'}
    Current Address: ${address || 'N/A'}
    
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
