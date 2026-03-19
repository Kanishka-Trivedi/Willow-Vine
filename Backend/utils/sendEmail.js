import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // Config for nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
     from: `"Willow and Vine" <${process.env.EMAIL_USER}>`,
     to: options.email,
     subject: options.subject,
     html: options.message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${options.email}`);
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
    // We don't want to fail the whole order process if email fails
  }
};

export default sendEmail;
