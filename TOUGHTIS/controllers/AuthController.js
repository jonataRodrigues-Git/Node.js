import { text } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export default class AuthController {
  
  static login(req, res) {
    const message = req.session.message || null;
    req.session.message = null; // limpa a mensagem para não repetir
    
    res.render("auth/login", { message }); 
  };
  static register(req, res) {
    const message = req.session.message || null;
    req.session.message = null;
   
    res.render("auth/register", { message });
  };


  //verifi login
  static async loginUserPost(req ,res) {
    try {
      
      const { email, password} = req.body;
      const checkEmail = await User.findOne({where: {email: email}});

      if(!checkEmail) {
        req.session.message = {
          type: "error",
          text: "Email não cadastrado!",
        };
        
        return res.render('auth/login');
      }

      //verif passwor
      const passwordMatch = await bcrypt.compare(password, checkEmail.password);//verif passwor criptografada
      if(!passwordMatch) {
        req.session.message = {
          type: 'error',
          text: 'Senha Incorreta'
        };
        return res.render('auth/login');
      };

      req.session.userid = checkEmail.id;
      req.session.message = {
        type: "success",
        text: "Login Realizado com Sucesso!",
      };

      return res.redirect("/");
    } catch (error) {
      console.error(error);
      return res.status(500).send('Erro interno no servidor');
    }
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

      //creat a  password
      const salt = bcrypt.genSaltSync(10);//criptografia da senha 
      const hashedPassword = bcrypt.hashSync(password, salt);// dificudando a mais a senha

      //create obj Usuer no banco
      const createUser =  await User.create({
        name, 
        email, 
        password: hashedPassword 
      });
      
      req.session.user = {
        id: createUser.id,
        name: createUser.name,
        email: createUser.email,
      };

      req.session.user.id = createUser.id;

      //maessade sucess
      req.session.message = {
        type: "success",
        text: "Usuário cadastrado com sucesso!",
      };


      return res.redirect("/");

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

  //deslogar usuario
  static logout(req, res) {
    req.session.destroy();
    res.redirect('/login');
  }
}
