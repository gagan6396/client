'use server';
import nodemailer from 'nodemailer';

export async function sendCollaborationEmail(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const organization = formData.get('organization') as string;
  const collaborationType = formData.get('collaborationType') as string;
  const message = formData.get('message') as string;

  // Basic server-side validation
  if (!name || !email || !organization || !collaborationType || !message) {
    return { success: false, message: 'All fields are required' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: 'Invalid email address' };
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

  // Email to user (confirmation)
  const userMailOptions = {
    from: `"Gauraaj Team" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'Thank You for Your Collaboration Inquiry! 🌱',
    text: `Dear ${name},

Thank you for reaching out to Gauraaj with your collaboration inquiry! We’re excited about the possibility of working together. Here’s what you submitted:

- Organization/Role: ${organization}
- Collaboration Type: ${collaborationType}
- Message: ${message}

Our team will review your inquiry and get back to you soon. If you have any questions in the meantime, feel free to reply to this email.

Best regards,
The Gauraaj Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h2 style="color: #2e7d32;">Thank You for Your Collaboration Inquiry! 🌱</h2>
        <p>Dear ${name},</p>
        <p>Thank you for reaching out to Gauraaj with your collaboration inquiry! We’re excited about the possibility of working together. Here’s what you submitted:</p>
        <ul style="list-style-type: disc; padding-left: 20px;">
          <li><strong>Organization/Role:</strong> ${organization}</li>
          <li><strong>Collaboration Type:</strong> ${collaborationType}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
        <p>Our team will review your inquiry and get back to you soon. If you have any questions in the meantime, feel free to reply to this email.</p>
        <p style="margin-top: 20px;">Best regards,<br><strong>The Gauraaj Team</strong></p>
      </div>
    `,
  };

  // Email to shop owner (notification)
  const ownerMailOptions = {
    from: `"Gauraaj Team" <${process.env.GMAIL_USER}>`,
    to: process.env.SHOP_OWNER_EMAIL,
    subject: 'New Collaboration Inquiry Received',
    text: `Hello,

A new collaboration inquiry has been submitted:

- Name: ${name}
- Email: ${email}
- Organization/Role: ${organization}
- Collaboration Type: ${collaborationType}
- Message: ${message}

Please review and respond to the inquiry as needed.

Best regards,
Gauraaj System`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h2 style="color: #2e7d32;">New Collaborationmarshmallow Inquiry</h2>
        <p>Hello,</p>
        <p>A new collaboration inquiry has been submitted:</p>
        <ul style="list-style-type: disc; padding-left: 20px;">
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Organization/Role:</strong> ${organization}</li>
          <li><strong>Collaboration Type:</strong> ${collaborationType}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
        <p>Please review and respond to the inquiry as needed.</p>
        <p>Best regards,<br><strong>Gauraaj System</strong></p>
      </div>
    `,
  };

  try {
    // Verify transporter
    await transporter.verify();

    // Send emails
    const [userInfo, ownerInfo] = await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(ownerMailOptions),
    ]);

    if (userInfo.messageId && ownerInfo.messageId) {
      return { success: true, message: 'Collaboration inquiry sent successfully!' };
    } else {
      return { success: false, message: 'Failed to send emails.' };
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'An error occurred while sending emails.' };
  }
}