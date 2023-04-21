import mongoose from "mongoose";
import { db, database } from "../../../database";
import { Product, User } from "../../../models";


export default async function handler(req, res) {

    if ( req.method !== 'PURGE' ) {
        return res.status(405).json({ status: 'ERROR', error: 'Your are not allowed to do that' });
    }

    if ( process.env.NODE_ENV === 'production' ) {
        return res.status(405).json({ status: 'ERROR', error: 'Your are not allowed to do that' });
    }

    try {
        await db.connect();

        console.log("models:",mongoose.models)
        await User.deleteMany({});
        await Product.deleteMany({});
        await User.insertMany(database.initialData.users);
        await Product.insertMany(database.initialData.products);

        await db.disconnect();
        res.status(200).json({ status: 'Proceso realizado correctamente' });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ status: 'ERROR', error });
    }

}