import { db, database } from "../../../database";
import { Product } from "../../../models";


export default async function handler(req, res) {

    if ( req.method !== 'PURGE' ) {
        return res.status(405).json({ status: 'ERROR', error: 'Your are not allowed to do that' });
    }

    if ( process.env.NODE_ENV === 'production' ) {
        return res.status(405).json({ status: 'ERROR', error: 'Your are not allowed to do that' });
    }

    try {
        await db.connect();
        await Product.deleteMany({});
        console.log('Products deleted');
        const insertedProducts = await Product.insertMany(database.initialData.products);
        console.log('Products inserted:', insertedProducts)
        console.log('Product model database:', Product.db.name);
console.log('Product model collection:', Product.collection.name);
        await db.disconnect();
        res.status(200).json({ status: 'Proceso realizado correctamente' });
    } catch (error) {
        res.status(500).json({ status: 'ERROR', error });
    }

}