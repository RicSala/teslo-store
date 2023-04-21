import { SHOP_CONSTANTS, db } from "../../../../database";
import { Product } from "../../../../models";

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return await searchProducts(req, res);
            
        default:
            return res.status(400).json({ message: 'Bad request' });
    }
}

const searchProducts = async (req, res) => {

    // get query from url
    let { q } = req.query;

    // if there is no query, return 400
    if (q.length === 0) return res.status(400).json({ message: 'Debe especificar la query de búsqueda' }); //TODO: is this needed?


    // q to lowercase
    q = q.toLowerCase();

    //connect to database
    await db.connect();

    // use the index to search for products
    const products = await Product.find(
        { $text: { $search: q } },
        { score: { $meta: 'textScore' } } // add score to results. score is the relevance of the result
    )
        .select('title price images inStock slug -_id') // select fields to return    
        .sort({ score: { $meta: 'textScore' } }) // sort by score
        .lean();


    //disconect from database
    await db.disconnect();

    // if there are no products, return 404
    if (!products) return res.status(404).json({ message: 'Producto no encontrado' });

    // return products
    return res.status(200).json(products);


}