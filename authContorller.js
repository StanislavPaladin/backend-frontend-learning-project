
import Role from './models/Role.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';
import {validationResult} from 'express-validator'
import jwt from 'jsonwebtoken';
import secret from './config.js'


const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: `24h`})
}

class authController {
    async registration(req, res) {
        console.log('REGISTRATION');
        console.log(req.body);
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({message: 'Ошибка при регистрации', errors})
            }
            const {username, password} = req.body
            const applicant = await User.findOne({username})
            if (applicant) {
                
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            const userRole = await Role.findOne({value: "USER"}) 
            const user = new User ({username: username, password: hashPassword , roles: [userRole.value]  })
            await user.save();
            console.log('register success');
            
            // let request = new XMLHttpRequest();
            // request.open("POST", "/auth", true);
            // request.setRequestHeader("Content-Type", "json");
            // request.addEventListener("load", function () {
                
            // });

            // console.log('RES STATUS', res.status());
            
            return res.json({message: "Регистрация прошла успешно"})
            

        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Registration failed'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
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
            const {_id, username} = req.body
            const user = await User.findOne({username})
            if (!user) {
                
                return res.status(400).json({message: "Пользователь не найден"})
            }
            await User.remove({_id: user._id})
            console.log('', {username}, "удалён");
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


    

}

// module.exports = new authController()
export default new authController();