import { SHOP_CONSTANTS, db } from "../../../../database";
import { Product } from "../../../../models";

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET': return await getProducts(req, res);

        default: return res.status(405).json({ message: 'Bad request' });
    }
}

const getProducts = async (req, res) => {

    const { gender = 'all' } = req.query;

    let filter = {}
    // we create a filter with the given gender if there is one
    if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(gender)) {
        filter = { gender: gender }
    }

    await db.connect();
    const products = await Product.find(filter)
        .select('title price images inStock slug -_id')
        .lean();
    await db.disconnect();

    res.status(200).json(products);
}
