import { USER_DAO } from '../dao/index.js';
import UserDto from '../dao/DTOS/user.dto.js';

export default class UserRepository {

    constructor() { this.dao = USER_DAO };

    getAll = async () => {
        const result = await this.dao.getAll();
        return result;
    };

    getByEmail = async (email) => {
        const result = await this.dao.getByEmail(email);
        return result;
    };

    save = async (user) => {
        const result = await this.dao.save(user);
        const dtoResult = new UserDto(result); 
        return dtoResult;
    };

    getById = async (id) => {
        const result = await this.dao.getById(id);
        return result
    };

    update = async (id, password) => {
        const result = await this.dao.update(id, password);
        return result;
    };
};