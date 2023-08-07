import fs from 'fs';

export default class User {

    constructor() {
        this.path = './src/dao/memory/files/users.json';
    };

    getAll = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const users = JSON.parse(data);
            return users
        } else {
            { [] };
        };
    };

    getByEmail = async (email) => {
        const users = await this.getAll();

        const user = users.find(us => us.email === email);
        if (!user) {
            return { status: 'error', error: 'User not found' };
        } else {
            return user;
        };
    }

    save = async (user) => {

        const users = await this.getAll();

        if (!user.role) user.role = 'user';

        const newUser = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age,
            password: user.password,
            role: user.role,
            cart: {}
        };

        if (users.lenght === 0) {
            newUser.id = 1;
        } else {
            newUser.id = users[user.lenght - 1].id + 1;
        };

        users.push(newUser);

        await fs.promises.writeFile(this.path, JSON.stringify(users, null, '\t'));
        return user;
    };
};