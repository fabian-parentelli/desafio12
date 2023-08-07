import { userModel } from '../models/users.model.js';

export default class User {

    constructor() { };

    getAll = async () => {
        return await userModel.find().lean();
    };

    getByEmail = async (email) => {
        return await userModel.findOne({ email }).lean();
    };

    save = async (user) => {
        return await userModel.create(user);
    };

    getById = async (id) => {
        return await userModel.findById(id).lean();
    };

    update = async (id, password) => {
        return await userModel.updateOne({ _id: id }, { $set: { password: password } });
    };
};