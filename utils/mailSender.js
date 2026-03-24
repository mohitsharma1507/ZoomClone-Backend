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
        name: "Meetify",
      },
      subject: "Your OTP for Meetify",
      htmlContent: `
      <div style="margin:0;padding:0;background:linear-gradient(135deg,#2b0a03,#5a1a05);font-family:Arial,sans-serif;color:#fff;">
        
        <div style="max-width:600px;margin:40px auto;background:#1a0a05;border-radius:12px;overflow:hidden;box-shadow:0 0 20px rgba(255,102,0,0.2);">
          
          <!-- Header -->
          <div style="padding:20px 30px;background:#2b0a03;border-bottom:1px solid rgba(255,255,255,0.1);">
            <h1 style="margin:0;color:#ff5a1f;">Meetify</h1>
          </div>

          <!-- Body -->
          <div style="padding:30px;text-align:center;">
            <h2 style="margin-bottom:10px;">Verify Your Email</h2>
            <p style="color:#ccc;">Use the OTP below to complete your verification</p>

            <div style="margin:30px 0;">
              <span style="
                display:inline-block;
                padding:15px 30px;
                font-size:28px;
                letter-spacing:4px;
                font-weight:bold;
                color:#fff;
                background:linear-gradient(135deg,#ff5a1f,#ff7a3d);
                border-radius:8px;
                box-shadow:0 0 15px rgba(255,90,31,0.6);
              ">
                ${otp}
              </span>
            </div>

            <p style="color:#aaa;font-size:14px;">
              This OTP is valid for <b>10 minutes</b>
            </p>
          </div>

          <!-- Footer -->
          <div style="padding:20px;text-align:center;background:#2b0a03;font-size:12px;color:#888;">
            © ${new Date().getFullYear()} Meetify • Secure Video Meetings
          </div>

        </div>
      </div>
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
