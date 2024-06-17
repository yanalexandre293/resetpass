//controllers/authController.js

const userService = require("../services/userServices");

class AuthController {
    async login(req, res){
        const { login, password } = req.body;

        try{
            const { token } = await userService.authenticateUser(login, password);
            res.status(200).json({ token });
        }catch(error){
            console.error("Erro ao autenticar usuário: ", error);
            res.status(401).json({ error: "Login ou senha inválidos" });
        }
    }
}

module.exports = new AuthController();