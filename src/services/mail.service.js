import { transporter } from '../utils/utils.js';

export const sendEmail = async (email) => {
    await transporter.sendMail({
        from: 'El kiosquito',
        to: email.to,
        subject: email.subject,
        html: email.html
    });
};