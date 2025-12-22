import Mailgun from "mailgun.js"; // mailgun.js v11.1.0
// @ts-ignore
// this is a bug, not an error
import FormData from "form-data";
import {Resend} from "resend";

interface EmailParams {
  to: string;
  subject: string;
  text: string;
}

/**
 * @deprecated
 * @param emailParams
 */
export async function sendVerificationEmail(emailParams: EmailParams) {
  const mailgunDomain = process.env.MAILGUN_DOMAIN!;
  const mailgunApiKey = process.env.MAILGUN_API_KEY!;

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

export async function sendVerificationEmailWithResend(emailParams: {to: string, verificationUrl: string}) {
  const resendApiKey = process.env.RESEND_API_KEY!;
  const resendDomain = process.env.RESEND_DOMAIN!;

  const resendClient = new Resend(resendApiKey);
  const messageData = {
    from: `Build Beacon <noreply@${resendDomain}>`,
    to: emailParams.to,
    template: {
      id: 'verify-email',
      variables: {
        verification_url: emailParams.verificationUrl,
      }
    }
  };

  try {
    await resendClient.emails.send(messageData);
  } catch (error) {
    console.error(error);
  }
}
