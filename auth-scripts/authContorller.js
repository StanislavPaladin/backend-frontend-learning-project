
import Role from '../models/Role.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import {validationResult} from 'express-validator'
import jwt from 'jsonwebtoken';
import secret from '../config.js'


const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret.secret, {expiresIn: `24h`})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({message: 'Ошибка при регистрации', errors})
            }
            const {email, password} = req.body
            const applicant = await User.findOne({email})
            if (applicant) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            const userRole = await Role.findOne({value: "ADMIN"}) 
            const user = new User ({email: email, password: hashPassword , roles: [userRole.value]  })
            await user.save();
            console.log('register success');
            
            return res.json({message: "Регистрация прошла успешно"})
            

        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Registration failed'})
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({message:"Такой пользователь не найден"})
            }
            const passValidation = bcrypt.compareSync(password, user.password);
            if(!passValidation) {
                return res.status(400).json({message:"Неверный пароль"})
            }
            const token = generateAccessToken(user._id, user.roles);
            return res.json({token});

        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Login failed'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e);
        }
    }

    async deleteUser(req, res) {
        try {
            const {_id, email} = req.body
            const user = await User.findOne({email})
            if (!user) {
                
                return res.status(400).json({message: "Пользователь не найден"})
            }
            await User.remove({_id: user._id})
            console.log('', {email}, "удалён");
            await this.getUsers()
            return res.json({message: "Пользователь удалён"})
        }
        catch(e) {
            console.log(e);
        }
    }

    async refresh (req, res) {
        try {

        }
        catch(e) {
            console.log(e);
        }
    }

    async sendForm(req, res) {
        try {
            const {email, phone, message} = req.body
            if(!req.body)
            return  res.json(req.body)
        }
        catch(e) {
            console.log(e);
        }
    }
    

}

// module.exports = new authController()
export default new authController();