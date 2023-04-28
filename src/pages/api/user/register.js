import { db } from "../../../../database";
import { User } from "../../../../models";
import bcrypt from 'bcryptjs';
import { jwt } from "../../../../utils";
import { isValidEmail } from "../../../../utils/validations";

export default function handler(req, res) {

    // switch for the didfferent methods
    switch (req.method) {
        case 'GET': return;
        case 'POST': return register(req, res);

        default: return res.status(405).json({ message: 'Bad request' });
    }
}


const register = async (req, res) => {

    const { name = '', email = '', password = '' } = req.body;

    // VALIDATIONS ##############################
    if (password.length < 6) {
        await db.disconnect(); // TODO is this correct? We are disconnecting before we even connect
        return res.status(400).json({ status: 'ERROR', error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    if (name.length < 3) {
        await db.disconnect();
        return res.status(400).json({ status: 'ERROR', error: 'El nombre debe tener al menos 3 caracteres' });
    }

    if (!isValidEmail(email)) {
        await db.disconnect();
        return res.status(400).json({ status: 'ERROR', error: 'El email no es válido' });
    }
    // END VALIDATIONS ##############################

    await db.connect();
    const user = await User.findOne({ email });

    if (user) {
        await db.disconnect();
        return res.status(400).json({ status: 'ERROR', error: 'No ha sido posible realizar el registro - USUARIO' });
    }


    const newUser = new User({
        name,
        email: email.toLowerCase(),
        role: 'user',
        password: bcrypt.hashSync(password)
    });

    try {
        await newUser.save(
            {
                validateBeforeSave: true, //TODO check what is this
            }
        );

        await db.disconnect();

    } catch (error) {
        console.log("Error while saving new user", error);
        await db.disconnect();
        return res.status(400).json({ status: 'ERROR', error: 'No ha sido posible realizar el registro - USUARIO' });
    }

    const { _id, role } = newUser;

    const token = await jwt.signToken(_id, email); // Signs the token with the user id and email creates a jwt token


    res.status(200).json({ status: 'OK', token, user: { email, role, name } });

}
