import { User } from "../../../../models";
import { db } from "../../../../database";
import { isValidObjectId } from "mongoose";



export default async function handler(req, res) {
    switch (req.method) {
        case 'GET': return await getUsers(req, res);

        case 'PUT': return await updateUser(req, res);

        default: return res.status(400).json({ message: 'Bad request' });
    }
}

const getUsers = async (req, res) => {

    await db.connect()
    const users = await User.find({}).select('-password').lean()
    await db.disconnect()


    return res.status(200).json(users);

}

const updateUser = async (req, res) => {

    const { userId, role } = req.body;

    if (!isValidObjectId) return res.status(400).json({ message: 'No existe usuario por ese Id' });

    const validRoles = ['admin', 'user', 'SEO', 'superuser'];

    if (!validRoles.includes(role)) return res.status(400).json({ message: 'No existe ese rol:' + validRoles.join(', ') });

    await db.connect()

    const user = await User.findById(userId);

    if (!user) {
        await db.disconnect()
        return res.status(404).json({ message: 'No existe usuario por ese Id' });
    }

    user.role = role;
    await user.save();

    await db.disconnect()

    return res.status(200).json({ message: 'Usuario actualizado correctamente' });

}