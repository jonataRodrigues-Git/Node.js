import User from "../models/User.js";
import bcrypt from "bcryptjs";

export default class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }
  
  static register(req, res) {
    res.render("auth/register");
  }

  // Rota POST /register — cadastro completo
  static async registerUserPost(req, res) {
    try {
      const { name, email, password, passwordConfig } = req.body;

      if (password !== passwordConfig) {

        req.session.message = {
          type: "error",
          text: "Senha Incorreta!",
        };

        return res.redirect("/register");

      }

      const checkUserEmail = await User.findOne({ where: { email } });

      if (checkUserEmail) {

        req.session.message = {
          type: "error",
          text: "Email já cadastrado!",
        };

        return res.redirect("/register");
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      await User.create({ name, email, password: hashedPassword });

      req.session.message = {
        type: "success",
        text: "Usuário cadastrado com sucesso!",
      };

      return res.redirect("/login");

    } catch (error) {

      console.error(error);
      req.session.message = {
        type: "error",
        text: "Erro ao cadastrar o usuário. Tente novamente.",
      };

      return res.redirect("/register");
    }
  }

  // Rota POST /check-email — só checa se email existe
  static async checkEmailExists(req, res) {

    try {

      const { email } = req.body;
      const user = await User.findOne({ where: { email } });

      return res.json({ exists: !!user });

    } catch (error) {

      console.error(error);
      return res.status(500).json({ exists: false });
    }
  }
}
