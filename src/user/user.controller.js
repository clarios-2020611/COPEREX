import { objectIdValid } from '../../middlewares/db.validators.js';
import { encrypt, checkPassword } from '../../utils/encrypt.js';
import { generateJwt } from '../../utils/jwt.js';
import User from './user.model.js';

export const createUser = async (req, res) => {
    try {
        let data = {
            username: process.env.USER_NAME,
            email: process.env.EMAIL,
            password: process.env.PASSWORD
        }
        let existUser = await User.findOne({ email: data.email });
        if (existUser) return console.log('Admin already exist');
        data.password = await encrypt(data.password);
        let user = new User(data);
        await user.save();
    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: 'General error' });
    }
}

export const login = async (req, res) => {
    try {
        let { userLoggin, password } = req.body;
        let user = await User.findOne(
            {
                $or: [
                    { email: userLoggin },
                    { username: userLoggin }
                ]
            }
        );

        if (user && await checkPassword(user.password, password)) {
            let loggedUser = {
                uid: user._id,
                username: user.username
            }

            let token = await generateJwt(loggedUser);

            return res.send(
                { message: `Welcome ${user.username}`, loggedUser, token });
        }
        return res.status(400).send({ message: 'Wrong email or password' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: 'General error' });
    }
}   