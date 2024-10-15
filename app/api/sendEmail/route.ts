import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      phone,
      travelers,
      from,
      to,
      departureDate,
      returnDate,
      // address,
      reservationType,
      hotelName,
      hotelLocation,
      checkInDate,
      checkOutDate,
      guests,
    } = await req.json();

    // Debug log: to check what data is being received in the request
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

    // Default values to prevent undefined fields
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
    // const addressInfo = address || 'N/A';
    const phoneInfo = phone || 'N/A';

    // Validate required fields based on reservation type
    if (reservationTypeInfo === 'flight') {
      if (!from || !to || !departureDate) {
        console.error('Missing flight reservation details');
        return NextResponse.json({ message: 'Flight details are incomplete' }, { status: 400 });
      }
    }

    if (reservationTypeInfo === 'hotel') {
      if (!hotelName || !hotelLocation || !checkInDate || !checkOutDate) {
        console.error('Missing hotel reservation details');
        return NextResponse.json({ message: 'Hotel details are incomplete' }, { status: 400 });
      }
    }

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,  // Environment variable for Gmail user
        pass: process.env.GMAIL_PASS,  // Environment variable for Gmail password
      },
    });

    // Determine reservationDetails based on reservationType
    let reservationDetails = '';
    if (reservationTypeInfo === 'flight') {
      reservationDetails = `
        <strong>Travelers:</strong> ${travelersInfo}<br/>
        <strong>From:</strong> ${fromInfo}<br/>
        <strong>To:</strong> ${toInfo}<br/>
        <strong>Departure Date:</strong> ${departureDateInfo}<br/>
        <strong>Return Date:</strong> ${returnDateInfo}<br/>
      `;
    } else if (reservationTypeInfo === 'hotel') {
      reservationDetails = `
        <strong>Hotel Name:</strong> ${hotelNameInfo}<br/>
        <strong>Hotel Location:</strong> ${hotelLocationInfo}<br/>
        <strong>Check-in Date:</strong> ${checkInDateInfo}<br/>
        <strong>Check-out Date:</strong> ${checkOutDateInfo}<br/>
        <strong>Number of Guests:</strong> ${guestsInfo}<br/>
      `;
    } else {
      return NextResponse.json({ message: 'Invalid reservation type' }, { status: 400 });
    }

    // General email content for both types
    const emailContent = `
      <h1>${reservationTypeInfo === 'flight' ? 'Flight Reservation' : 'Hotel Reservation'}</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone Number:</strong> ${phoneInfo}</p>
      <hr/>
      <h2>Reservation Details</h2>
      <p>${reservationDetails}</p>
    `;

    // Email options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      bcc: "krishanmohank974@gmail.com",  // Replace with the recipient's email
      subject: 'Order To Generate Dummy Ticket or Hotel Reservation',
      html: emailContent,  // Use 'html' instead of 'text' for HTML content
    };

    // Send email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

  } catch (error) {
    // Type assertion to treat error as an instance of Error
    const errorMessage = (error as Error).message || 'Unknown error occurred';
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email', error: errorMessage }, { status: 500 });
  }
}
