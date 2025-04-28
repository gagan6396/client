'use server';
import nodemailer from 'nodemailer';

export async function sendSubscriptionEmail(formData: FormData) {
  const email = formData.get('email') as string;

  if (!email) {
    return { success: false, message: 'Email is required' };
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for port 465, false for 587
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  // Email to customer
  const customerMailOptions = {
    from: `"Organic Community" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'Thank You for Joining Our Organic Community! 🌿',
    text: `Dear Subscriber,

Thank you for joining our Organic Community! We're thrilled to have you with us. Expect fresh updates on organic products, wellness insights, and exclusive deals delivered straight to your inbox.

Stay connected to nature's best!
The Organic Community Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h2 style="color: #2e7d32;">Welcome to Our Organic Community! 🌿</h2>
        <p>Dear Subscriber,</p>
        <p>Thank you for joining us! We're thrilled to have you as part of our community. Get ready for fresh updates on organic products, wellness insights, and exclusive deals delivered straight to your inbox.</p>
        <p>Stay connected to nature's best!</p>
        <p style="margin-top: 20px;">Best regards,<br><strong>The Organic Community Team</strong></p>
      </div>
    `,
  };

  // Email to shop owner
  const ownerMailOptions = {
    from: `"Organic Community" <${process.env.GMAIL_USER}>`,
    to: process.env.SHOP_OWNER_EMAIL,
    subject: 'New Subscriber to Organic Community',
    text: `Hello,

A new user has subscribed to the Organic Community newsletter.
Email: ${email}

Best regards,
Organic Community System`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h2 style="color: #2e7d32;">New Subscriber Alert</h2>
        <p>Hello,</p>
        <p>A new user has subscribed to the Organic Community newsletter.</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>Best regards,<br><strong>Organic Community System</strong></p>
      </div>
    `,
  };

  try {
    // Verify transporter
    await transporter.verify();

    // Send emails
    const [customerInfo, ownerInfo] = await Promise.all([
      transporter.sendMail(customerMailOptions),
      transporter.sendMail(ownerMailOptions),
    ]);

    if (customerInfo.messageId && ownerInfo.messageId) {
      return { success: true, message: 'Subscription successful! Thank you for joining.' };
    } else {
      return { success: false, message: 'Failed to send emails.' };
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'An error occurred while sending emails.' };
  }
}