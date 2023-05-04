import { db } from ".";
import { Product } from "../models";

// Utils for db products#######################


export const getProductBySlug = async (slug) => {

    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();

    if (!product) { return null; }

    product.images = product.images.map(image =>
        //if the image starts with 'http', return it as it is, otherwise prepend the path to the image
        image.startsWith('http') ? image : `${process.env.HOST_NAME}/products/${image}`

    );

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

    const updatedProducts = products.map(product => {
        product.images = product.images.map(image =>
            image.startsWith('http') ? image : `${process.env.HOST_NAME}/products/${image}`
        )
        return product
    })

    return updatedProducts
}


export const getAllProducts = async () => {

    await db.connect()
    const products = await Product.find().select().lean()
    await db.disconnect()

    const updatedProducts = products.map(product => {
        product.images = product.images.map(image =>
            image.startsWith('http') ? image : `${process.env.HOST_NAME}/products/${image}`
        )
        return product
    })


    return JSON.parse(JSON.stringify(updatedProducts))

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