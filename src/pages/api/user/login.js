import { db } from "../../../../database";
import { User } from "../../../../models";
import bcrypt from 'bcryptjs';
import { jwt } from "../../../../utils";

export default function handler(req, res) {

    // switch for the different methods
    switch (req.method) {
        case 'GET': return;
        case 'POST': return loginUser(req, res);

        default: return res.status(405).json({ message: 'Bad request' });
    }

}


const loginUser = async (req, res) => {
    // get the email and password from the body
    const { email = '', password = '' } = req.body;

    await db.connect();
    const user = await User.findOne({ email });
    await db.disconnect();

    if (!user) { // We don't want to give information about the user, so we just say that the email or password is wrong
        return res.status(400).json({ status: 'ERROR', error: 'Correo o contraseña no válidos - EMAIL' });
    }

    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ status: 'ERROR', error: 'Correo o contraseña no válidos - PASSWORD' });
    }

    const { role, name } = user;

    const token = await jwt.signToken(user._id, user.email); // Signs the token with the user id and email creates a jwt token

    // console.log("token from signin", token)

    return res.status(200).json({ status: 'OK', token, user: { name, email, role } });

}