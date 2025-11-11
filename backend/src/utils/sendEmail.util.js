import { config } from 'dotenv';
config();
import Brevo, {
    TransactionalEmailsApi,
    SendSmtpEmail,
    TransactionalEmailsApiApiKeys,
} from '@getbrevo/brevo';

const apiInstance = new TransactionalEmailsApi();

apiInstance.setApiKey(
    TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
);

export const sendWelcomeEmail = (name, email) => {
    const message = new SendSmtpEmail();

    message.subject = 'Welcome to Pulse Point';
    message.sender = {
        name: process.env.SENDER_NAME,
        email: process.env.SENDER_EMAIL,
    };
    message.to = [{ name, email }];
    message.htmlContent = `
    <p>Hi there, ${name} </p>
    <h3>Welcome to Pulse point</h3>
    <hr/>
    <p>You can login by clicking <a href="${process.env.FRONTEND_URL}/login">here</a></p>
    `;

    apiInstance
        .sendTransacEmail(message)
        .then((res) => console.log('Email res : ', res))
        .catch((err) => console.log('email err', err));
};
