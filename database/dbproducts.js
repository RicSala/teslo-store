import { db } from ".";
import { Product } from "../models";

// Utils for db products#######################


export const getProductBySlug = async (slug) => {

    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();

    if (!product) { return null; }

    return JSON.parse(JSON.stringify(product));
}

export const getAllProductSlugs = async () => {

    await db.connect()
    const slugs = await Product.find().select('slug -_id').lean()
    await db.disconnect()

    return slugs
}

export const getProductsByTerm = async (query) => {

    await db.connect()
    // We are using the $text operator to search for products that match the query
    const products = await Product.find(
        {
            $text: {
                $search: query
            }
        },
    )
        .select('title images slug price inStock -_id')
        .lean()

    await db.disconnect()

    return products
}


export const getAllProducts = async () => {

    await db.connect()
    const products = await Product.find().select().lean()
    await db.disconnect()

    return JSON.parse(JSON.stringify(products))

}

// return an object with numberOfProducts, numberOfProductsWithNoInventory, numberOfProductsWithLowInventory
export const getNumberOfProducts = async () => {

    await db.connect();
    const numberOfProducts = await Product.countDocuments();
    const numberOfProductsWithNoInventory = await Product.countDocuments({ inStock: 0 });
    const numberOfProductsWithLowInventory = await Product.countDocuments({ inStock: { $lt: 10 } });
    await db.disconnect();

    return { numberOfProducts, numberOfProductsWithNoInventory, numberOfProductsWithLowInventory };
}