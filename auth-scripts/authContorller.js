import Role from '../models/Role.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import {
    validationResult
} from 'express-validator'
import jwt from 'jsonwebtoken';
import secret from '../config.js'
import welcomeMessage from '../mail-scripts/welcomeMessage.js';
import sharp from "sharp"
import * as uuid from 'uuid';
import * as path from 'path';


const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret.secret, {
        expiresIn: `24h`
    })
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            const {
                email,
                password
            } = req.body
            const applicant = await User.findOne({
                email
            })
            if (!errors.isEmpty() && !applicant) {
                console.log(errors);
                return res.status(400).json({
                    message: 'Ошибка при регистрации',
                    errors
                })
            }
            if (applicant) {
                return res.status(403).json({
                    message: "Пользователь с таким именем уже существует"
                })
            }
            const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            const userRole = await Role.findOne({
                value: "ADMIN"
            })
            const user = new User({
                email: email,
                password: hashPassword,
                roles: [userRole.value]
            })
            await user.save();
            console.log('register success');
            welcomeMessage(req.body)
            return res.json({
                message: "Регистрация прошла успешно"
            })


        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: 'Registration failed'
            })
        }
    }

    async login(req, res) {
        try {
            const {
                email,
                password,
                sessionToken
            } = req.body
            const user = await User.findOne({
                email
            })

            if (!user) {
                return res.status(400).json({
                    message: "Такой пользователь не найден"
                })
            }
            const passValidation = bcrypt.compareSync(password, user.password);
            if (!passValidation) {
                return res.status(400).json({
                    message: "Неверный пароль"
                })
            }
            if (user && passValidation && sessionToken) {
                return res.status(403).json({
                    message: "Вы уже залогинены"
                })
            }
            const token = generateAccessToken(user._id, user.roles);
            return res.json({
                token
            });

        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: 'Login failed'
            })
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
            const {
                _id,
                email
            } = req.body
            const user = await User.findOne({
                email
            })
            if (!user) {

                return res.status(400).json({
                    message: "Пользователь не найден"
                })
            }
            await User.remove({
                _id: user._id
            })
            console.log('', {
                email
            }, "удалён");
            await this.getUsers()
            return res.json({
                message: "Пользователь удалён"
            })
        } catch (e) {
            console.log(e);
        }
    }


    async update(req, res) {
        if (!req.body._id) {
            throw new Error('не указан ID')
        }

        const filename = uuid.v4() + '.jpg';
        const filepath = path.resolve('static', filename);

        try {
            const {
                name,
                picture,
                oldPassword,
                password
            } = req.body;
            //Требуем ввода ввода пароля для подтверждения изменения каких-либо данных
            if (!oldPassword) {
                return res.status(400).json({
                    message: 'Введите пароль для подтверждения'
                });
            }
            

            //Первым делом - проверка на совпадение старого и нового пароля
            const user = User.findById(req.body._id, async function (err, user) {
                
                const passValidation = bcrypt.compareSync(oldPassword, user.password);

                if (!passValidation) {
                    return res.status(400).json({
                        message: 'Неверный пароль!'
                    });
                } else {
                    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
                    if (req.files) {
                        console.log(password==undefined);
                        sharp(req.files.picture.data)
                            .resize({
                                width: 300,
                                height: 300 //настройка sharp. пока поставил просто рандомные значения для теста функционала
                            })
                            .toFile(filepath)
                            .then(async data => {
                                const newUser = {
                                    picture: filename,
                                }
                                //Если поле имя не является пустым - добавляем его к объекту newUser
                                if (name !== undefined) {
                                    newUser.name = name;
                                }
                                if (password !== '') {
                                    newUser.password = hashPassword;
                                }
                                const updatedUser = await User.findByIdAndUpdate(req.body._id, newUser) //обновление юзера на основе schema, с использованием полученных в запросе данных
                            }).catch(err => {
                                console.log("err: ", err);
                            });
                    } else if (!req.files) {

                        const newUser = {
                            name: name,
                        }
                        if (password !=='') {
                            newUser.password = hashPassword;
                        }
                        console.log("data: ", newUser);
                        const updatedUser = await User.findByIdAndUpdate(req.body._id, newUser)
                    }

                    return res.status(200).json({
                        message: 'Успешно изменено',
                    })
                }
            });
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: 'change failed'
            })
        }
    }
}

// module.exports = new authController()
export default new authController();