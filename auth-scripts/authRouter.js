import Router from 'express';

const router = new Router();
import controller from './authContorller.js'
import {check} from 'express-validator'
// import authMiddleWare from '../middleware/authMiddleWare.js'  
// import roleMiddleWare from '../middleware/roleMiddleWare.js'
router.post('/registration', [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль не может быть короче 4, и не длиннее 10 символов').isLength({min: 4, max: 10})
], controller.registration);
router.post('/login', controller.login);
router.get('/users',  controller.getUsers);
router.post('/delete', controller.deleteUser)
router.post('/sendForm', controller.sendForm)
// roleMiddleWare(['ADMIN'])

export default router;