import { db } from "../../../../database";
import { User } from "../../../../models";
import bcrypt from 'bcryptjs';
import { jwt } from "../../../../utils";

export default function handler(req, res) {

    // switch for the didfferent methods
    switch (req.method) {
        case 'GET':
            return checkJWT(req, res);
        
        default:
            return res.status(405).json({ message: 'Bad request' });
    }

  }


  const checkJWT = async (req, res) => {
    // get the email and password from the body

    const { token } = req.cookies; // We could read it from the cookies
    // const { token } = req.headers; // We could read it from the headers
    
    
    let userId
    
    try {
        userId = await jwt.isValidToken(token); // Verifies the token and returns the user
    } catch (error) {
        return res.status(401).json({ status: 'ERROR', error: 'Token no válido' });
    }
    
    await db.connect();
    const user = await User.findById(userId).lean()
    await db.disconnect();

    if (!user) {
        return res.status(400).json({ status: 'ERROR', error: 'No se ha encontrado el usuario' });
    }

    const { role, name, email, _id } = user;

    return res.status(200).json({ 
        token: jwt.signToken(_id, email), // Revalidates the token 
        user: { name, email, role }});
    }