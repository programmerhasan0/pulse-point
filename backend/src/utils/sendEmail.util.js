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

export const sendPasswordResetMail = ({ name, email }, token) => {
    const message = new SendSmtpEmail();

    message.subject = 'Password Reset - Pulse Point';
    message.sender = {
        name: process.env.SENDER_NAME,
        email: process.env.SENDER_EMAIL,
    };
    message.to = [{ name, email }];
    message.htmlContent = `
    <p>Hi there, ${name} </p>
    <h3>Password Reset - Pulse Point</h3>
    <hr/>
    <p>Please reset your password by clicking <a href="${process.env.FRONTEND_URL}/reset-password?token=${token}">here</a></p>
    `;

    apiInstance
        .sendTransacEmail(message)
        .then((res) => console.log('Email res : ', res))
        .catch((err) => console.log('email err', err));
};

export const sendCreatePasswordMail = ({ name, email, role }, token) => {
    const message = new SendSmtpEmail();

    message.subject = 'Create - Pulse Point';
    message.sender = {
        name: process.env.SENDER_NAME,
        email: process.env.SENDER_EMAIL,
    };
    message.to = [{ name, email }];
    message.htmlContent = `
    <p>Hi ${role === 'doctor' ? 'doctor' : 'prouded staff'}, ${name} </p>
    <h3>Welcome to Pulse Point</h3>
    <hr/>
    <p>Please create your password by clicking <a href="${process.env.FRONTEND_URL}/create-password?token=${token}">here</a></p>
    `;

    apiInstance
        .sendTransacEmail(message)
        .then((res) => console.log('mail sent', res))
        .catch((err) => console.log('email err', err));
};
