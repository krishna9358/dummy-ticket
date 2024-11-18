import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    // Destructure the incoming form data from the request
    const {
      name,
      email,
      phone,
      travelers,
      from,
      to,
      departureDate,
      returnDate,
      reservationType,
      hotelName,
      hotelLocation,
      checkInDate,
      checkOutDate,
      guests,
    } = await req.json();

    // Log received data for debugging
    console.log('Received request data:', {
      name,
      email,
      travelers,
      from,
      to,
      departureDate,
      returnDate,
      reservationType,
      hotelName,
      hotelLocation,
      checkInDate,
      checkOutDate,
      guests,
    });

    // Fallback default values to prevent undefined fields in email content
    const reservationTypeInfo = reservationType || 'flight';
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
    const phoneInfo = phone || 'N/A';

    // Validate fields based on reservation type
    if (reservationTypeInfo === 'flight' && (!from || !to || !departureDate)) {
      console.error('Missing flight reservation details');
      return NextResponse.json({ message: 'Flight details are incomplete' }, { status: 400 });
    }
    if (reservationTypeInfo === 'hotel' && (!hotelName || !hotelLocation || !checkInDate || !checkOutDate)) {
      console.error('Missing hotel reservation details');
      return NextResponse.json({ message: 'Hotel details are incomplete' }, { status: 400 });
    }

    // Configure Nodemailer transporter with Gmail settings
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail email address
        pass: process.env.GMAIL_PASS, // Your Gmail app password
      },
    });

    // Reservation details content based on type
    const reservationDetails =
      reservationTypeInfo === 'flight'
        ? `
          <strong>Travelers:</strong> ${travelersInfo}<br/>
          <strong>From:</strong> ${fromInfo}<br/>
          <strong>To:</strong> ${toInfo}<br/>
          <strong>Departure Date:</strong> ${departureDateInfo}<br/>
          <strong>Return Date:</strong> ${returnDateInfo}<br/>
        `
        : `
          <strong>Hotel Name:</strong> ${hotelNameInfo}<br/>
          <strong>Hotel Location:</strong> ${hotelLocationInfo}<br/>
          <strong>Check-in Date:</strong> ${checkInDateInfo}<br/>
          <strong>Check-out Date:</strong> ${checkOutDateInfo}<br/>
          <strong>Number of Guests:</strong> ${guestsInfo}<br/>
        `;

    // Email content with HTML structure
    const emailContent = `
      <h1>${reservationTypeInfo === 'flight' ? 'Flight Reservation' : 'Hotel Reservation'}</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone Number:</strong> ${phoneInfo}</p>
      <hr/>
      <h2>Reservation Details</h2>
      <p>${reservationDetails}</p>
    `;

    // Configure email options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      bcc: "krishanmohank974@gmail.com", // Owner email for BCC
      subject: 'Order Confirmation - Dummy Reservation',
      html: emailContent,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

  } catch (error) {
    // Capture and log the error for debugging
    const errorMessage = (error as Error).message || 'Unknown error occurred';
    console.error('Error sending email:', errorMessage);
    return NextResponse.json({ message: 'Failed to send email', error: errorMessage }, { status: 500 });
  }
}
