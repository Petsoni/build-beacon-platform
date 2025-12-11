import Mailgun from "mailgun.js"; // mailgun.js v11.1.0
// @ts-ignore
// this is a bug, not an error
import FormData from "form-data";

interface EmailParams {
  to: string;
  subject: string;
  text: string;
}

export async function sendVerificationEmail(emailParams: EmailParams) {
  const mailgunDomain = process.env.MAILGUN_DOMAIN;
  const mailgunApiKey = process.env.MAILGUN_API_KEY;

  const mailgun = new Mailgun(FormData);

  const mailgunClient = mailgun.client({
    username: "api",
    key: mailgunApiKey!,
  });

  const messageData = {
    from: `Build Beacon <noreply@${mailgunDomain}>`,
    to: emailParams.to,
    subject: emailParams.subject,
    text: emailParams.text,
  };

  try {
    await mailgunClient.messages.create(mailgunDomain!, {
      from: messageData.from,
      to: messageData.to,
      subject: messageData.subject,
      text: messageData.text,
    });
  } catch (error) {
    console.error(error);
  }
}
