import { db } from "../../../../database";
import { User } from "../../../../models";
import { jwt } from "../../../../utils";

export default function handler(req, res) {
    // switch for the didfferent methods
    switch (req.method) {
        case 'GET': return checkJWT(req, res);

        default: return res.status(405).json({ message: 'Bad request' });
    }
}


const checkJWT = async (req, res) => {

    const { token } = req.cookies; // We could read it from the cookies
    // const { token } = req.headers; // We could read it from the headers
    // REVIEW could we do it from the local storage?

    let userId

    // console.log("token from validate-token", token)

    // Check if the token is valid...
    try {
        userId = await jwt.isValidToken(token); // Verifies the token and returns the user
    } catch (error) {
        return res.status(401).json({ status: 'ERROR', error: 'Token no válido' });
    }


    // console.log("userId from validate-token", userId)
    // ...if it is, we get the user from the database...
    await db.connect();
    const user = await User.findById(userId).lean()
    await db.disconnect();

    // console.log("user from validate-token", user)
    // ... if the user doesn't exist, we return an error
    if (!user) {
        return res.status(400).json({ status: 'ERROR', error: 'No se ha encontrado el usuario' });
    }

    const { role, name, email, _id } = user;

    // ...if the user exists, we return the user and a new token
    return res.status(200).json({
        token: await jwt.signToken(_id, email), // Revalidates the token 
        user: { name, email, role }
    });
}