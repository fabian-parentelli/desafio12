import config from '../config/dotEnv.config.js';

let Cart;
let Product;
let User;
let Chat
let Ticket

const persistence = config.persistence;

switch (persistence) {

    case 'MONGO':
        console.log('working with MONGO');
        const mongoose = await import('mongoose');
        await mongoose.connect(config.mongoUrl);
        const { default: CartDao } = await import('./mongo/classes/carts.dao.js');
        const { default: ProductDao } = await import('./mongo/classes/products.dao.js');
        const { default: UserDao } = await import('./mongo/classes/users.dao.js');
        const { default: ChatDao } = await import('./mongo/classes/chats.dao.js');
        const { default: TicketDao } = await import('./mongo/classes/tickets.dao.js');
        Cart = CartDao;
        Product = ProductDao;
        User = UserDao;
        Chat = ChatDao;
        Ticket = TicketDao;
    break;

    case 'MEMORY':
        console.log('working with MEMORY');
        const { default: CartMemory } = await import('./memory/carts.memory.js');
        const { default: ProductMemory } = await import('./memory/products.memory.js');
        const { default: UserMemory } = await import('./memory/users.memory.js');
        const { default: ChatMemory } = await import('./memory/chats.memory.js');
        const { default: TicketMemory } = await import('./memory/tickets.memory.js');
        Cart = CartMemory;
        Product = ProductMemory;
        User = UserMemory;
        Chat = ChatMemory;
        Ticket = TicketMemory;
    break;
};

export { Cart, Product, User, Chat, Ticket };