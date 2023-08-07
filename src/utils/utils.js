import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/dotEnv.config.js';
import { faker } from '@faker-js/faker';
import nodemailer from 'nodemailer';

faker.locale = "es";

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const generateToken = (user) => {
    const token = jwt.sign({ user }, config.privateKey, { expiresIn: '24h' });
    return token;
};

const tokenPassword = (user) => {
    const token = jwt.sign({ user }, config.privateKey, { expiresIn: '1h' })
    return token;
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.userNodemailer,
        pass: config.passNodemailer
    }
});

const generateProducts = () => {

    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.random.alphaNumeric(10),
        price: faker.commerce.price(),
        stock: faker.random.numeric(1),
        category: faker.commerce.department(),
        thumbnails: faker.image.image(),
        status: faker.datatype.boolean()
    };
};

export {
    createHash,
    isValidPassword,
    generateToken,
    generateProducts,
    tokenPassword,
    transporter
}; 