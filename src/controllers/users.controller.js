import * as userService from '../services/users.service.js';
import { logger } from '../middlewares/loggs/logger.js';

const registerUser = async (req, res) => {
    try {
        const result = await userService.saveUser({ ...req.body });
        if (result.status === 'error') {
            res.sendClientError(result.error)
        } else {
            res.sendSuccess(result.payload);
        };
    } catch (error) {
        logger.error(error.message);
        res.sendServerError(error.message);
    };
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await userService.loginUser(email, password);
        if (result.status === 'error') {
            res.sendClientError(result.error)
        } else {
            res.sendSuccess(result);
        };
    } catch (error) {
        logger.error(error.message);
        res.sendServerError(error.message);
    };
};

const current = async (req, res) => {
    const { user } = req.user;
    res.sendSuccess(user);
};

const recoverPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const result = await userService.recoverPassword(email);
        if (!result) return res.sendClientError('user not found');
        res.sendSuccess(result);
    } catch (error) {
        // logger.error(error.message);
        res.sendServerError(error.message);
    };
};

const newPassword = async (req, res) => {
    const { user } = req.user;
    const { password } = req.body;
    try {
        const result = await userService.newPassword(user, password);
        
        if (result.status === 'error') {
            res.sendClientError(result.error)
        } else {
            res.sendSuccess(result);
        };
    } catch (error) {
        res.sendServerError(error.message);
    };
};

export { registerUser, loginUser, current, recoverPassword, newPassword };