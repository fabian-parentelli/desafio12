import { Cart, Product, User, Chat, Ticket } from './dbConfig.js';

const cartsDao = new Cart();
const producstDao = new Product();
const userDao = new User();
const chatDao = new Chat();
const ticket = new Ticket();

export const CARTS_DAO = cartsDao;
export const PRODUCTS_DAO = producstDao;
export const USER_DAO = userDao;
export const CHAT_DAO = chatDao;
export const TICKET_DAO = ticket; 
