//controllers/userController.js

const userService = require("../services/userServices");

class UserController {
    async createUser(req, res) {
        const { login, password } = req.body;

        try {
            const user = await userService.createUser(login, password);
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({ erro: "Erro ao criar Usuário!" });
        }
    }

    async updateUser(req, res) {
        const { login, password, newLogin, newPassword } = req.body;

        try {
            const updatedUser = await userService.updateUser(login, password, newLogin, newPassword);
            res.status(200).json(updatedUser);
        } catch (error) {
            console.error("Erro ao atualizar usuário: ", error);
            res.status(500).json({ error: "Erro ao atualizar usuário" });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error("Erro ao buscar usuários: ", error);
            res.status(500).json({ error: "Erro ao buscar usuários" });
        }
    }
}

module.exports = new UserController();
