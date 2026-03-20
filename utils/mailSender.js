const SibApiV3Sdk = require("sib-api-v3-sdk");

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];

apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTPEmail = async (toEmail, otp) => {
  try {
    const email = {
      to: [{ email: toEmail }],
      sender: {
        email: process.env.SMTP_FROM_EMAIL,
        name: "Video Meet App",
      },
      subject: "Your OTP for Video Meet",
      htmlContent: `
        <h2>Video Meet</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 10 minutes</p>
      `,
    };

    await apiInstance.sendTransacEmail(email);
    console.log(" OTP sent:", toEmail);
  } catch (err) {
    console.log(" Brevo Error:", err.response?.body || err.message);
    throw err;
  }
};

// Send Meeting Invite
const sendMeetingInvite = async (toEmail, meetingCode, hostName) => {
  try {
    const meetingLink = `${process.env.FRONTEND_URL}/meeting/${meetingCode}`;

    const email = {
      to: [{ email: toEmail }],
      sender: {
        email: process.env.SMTP_FROM_EMAIL,
        name: "Video Meet App",
      },
      subject: `${hostName} invited you to a meeting`,
      htmlContent: `
        <h2>Video Meet</h2>
        <p><b>${hostName}</b> invited you</p>
        <p>Meeting Code: <b>${meetingCode}</b></p>
        <a href="${meetingLink}">Join Meeting</a>
      `,
    };

    await apiInstance.sendTransacEmail(email);
    console.log("Invite sent:", toEmail);
  } catch (err) {
    console.log(" Brevo Error:", err.response?.body || err.message);
    throw err;
  }
};

module.exports = { sendOTPEmail, sendMeetingInvite, generateOTP };
