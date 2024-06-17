//services/userServices.js

const crypto = require('crypto');
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const secretKey = "yan";

class UserService {
    hashPassword(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }

    async createUser(login, password) {
        const hashedPassword = this.hashPassword(password);
        return User.create({ login, password: hashedPassword });
    }

    async getUserByLogin(login) {
        return User.findOne({ where: { login } });
    }

    async getAllUsers() {
        return User.findAll();
    }

    async deleteUser(login, password) {
        const hashedPassword = this.hashPassword(password);
        return User.destroy({ where: { login, password: hashedPassword } });
    }

    async updateUser(login, password, newLogin, newPassword) {
        const hashedPassword = this.hashPassword(newPassword);
        return User.update(
            { login: newLogin, password: hashedPassword },
            { where: { login, password: this.hashPassword(password) } }
        );
    }

    async authenticateUser(login, password) {
        const user = await this.getUserByLogin(login);
        const hashedPassword = this.hashPassword(password)
        if(user.login == login && hashedPassword == user.password) {
            const token = jwt.sign({ id: user.id, login: user.login }, secretKey, { expiresIn: '1h' });
            return { token };
        }else {
            throw new Error('Invalid login or password');
        }
    }
}

module.exports = new UserService();
