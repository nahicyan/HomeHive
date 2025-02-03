import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

// 1. Configure SMTP Transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// 2. Verify SMTP Connection
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Failed:", error);
  } else {
    console.log("SMTP Server is ready to send emails.");
  }
});

/**
 * 3. Generic Email Sending Function
 * 
 * @param {String} subject - Email subject
 * @param {String} body - Email body (HTML formatted)
 */
export const sendOfferNotification = async (subject, body) => {
  try {
    const mailOptions = {
      from: `"HomeHive Notifications" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO,
      subject: subject,
      html: body,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Offer notification sent: ${subject}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

/**
 * 4. Pretty Email Templates with HTML Table
 */

/**
 * Template for New Offer
 * 
 * @param {Object} property 
 * @param {Object} buyer 
 * @param {Number} offeredPrice 
 */
export const newOfferTemplate = (property, buyer, offeredPrice) => `
  <h2>New Offer Submitted for ${property.address}!</h2>
  
  <h3>Property Details:</h3>
  <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
    <tr><th>Property Name</th><td>${property.title}</td></tr>
    <tr><th>Property Address</th><td>${property.address}</td></tr>
     <tr><th>Owner ID</th><td>${property.ownerid}</td></tr>
    <tr><th>Property ID</th><td>${property.id}</td></tr>
    <tr><th>Asking Price</th><td>$${property.askingPrice}</td></tr>
    <tr><th>Offered Price</th><td>$${offeredPrice}</td></tr>
  </table>

  <h3>Buyer Details:</h3>
  <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
    <tr><th>Name</th><td>${buyer.firstName} ${buyer.lastName}</td></tr>
    <tr><th>Email</th><td>${buyer.email}</td></tr>
    <tr><th>Phone</th><td>${buyer.phone}</td></tr>
    <tr><th>Buyer Type</th><td>${buyer.buyerType}</td></tr>
  </table>

  <p style="margin-top: 20px;">Submitted On: <strong>${new Date().toLocaleString()}</strong></p>
`;

/**
 * Template for Updated Offer
 * 
 * @param {Object} property 
 * @param {Object} buyer 
 * @param {Number} offeredPrice 
 */
export const updatedOfferTemplate = (property, buyer, offeredPrice) => `
  <h2>Offer Updated for ${property.address}!</h2>
  
  <h3>Property Details:</h3>
  <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
    <tr><th>Property Name</th><td>${property.title}</td></tr>
    <tr><th>Property Address</th><td>${property.address}</td></tr>
     <tr><th>Owner ID</th><td>${property.ownerid}</td></tr>
    <tr><th>Property ID</th><td>${property.id}</td></tr>
    <tr><th>Asking Price</th><td>$${property.askingPrice}</td></tr>
    <tr><th>New Offered Price</th><td>$${offeredPrice}</td></tr>
  </table>

  <h3>Buyer Details:</h3>
  <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
    <tr><th>Name</th><td>${buyer.firstName} ${buyer.lastName}</td></tr>
    <tr><th>Email</th><td>${buyer.email}</td></tr>
    <tr><th>Phone</th><td>${buyer.phone}</td></tr>
    <tr><th>Buyer Type</th><td>${buyer.buyerType}</td></tr>
  </table>

  <p style="margin-top: 20px;">Updated On: <strong>${new Date().toLocaleString()}</strong></p>
`;

/**
 * Template for Low Offer Warning
 * 
 * @param {Object} property 
 * @param {Object} buyer 
 * @param {Number} offeredPrice 
 */
export const lowOfferTemplate = (property, buyer, offeredPrice) => `
  <h2>Low Offer Alert for ${property.address}!</h2>
  
  <h3>Property Details:</h3>
  <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
    <tr><th>Property Name</th><td>${property.title}</td></tr>
    <tr><th>Property Address</th><td>${property.address}</td></tr>
     <tr><th>Owner ID</th><td>${property.ownerid}</td></tr>
    <tr><th>Property ID</th><td>${property.id}</td></tr>
    <tr><th>Asking Price</th><td>$${property.askingPrice}</td></tr>
    <tr><th>Offered Price</th><td>$${offeredPrice}</td></tr>
    <tr><th>Minimum Price</th><td>$${property.minPrice}</td></tr>
  </table>

  <h3>Buyer Details:</h3>
  <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
    <tr><th>Name</th><td>${buyer.firstName} ${buyer.lastName}</td></tr>
    <tr><th>Email</th><td>${buyer.email}</td></tr>
    <tr><th>Phone</th><td>${buyer.phone}</td></tr>
    <tr><th>Buyer Type</th><td>${buyer.buyerType}</td></tr>
  </table>

  <p style="margin-top: 20px;">Submitted On: <strong>${new Date().toLocaleString()}</strong></p>
`;
