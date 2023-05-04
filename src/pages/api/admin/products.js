import { isValidObjectId } from "mongoose";
import { db } from "../../../../database";
import { Product } from "../../../../models";
import cloudinary from 'cloudinary';


cloudinary.v2.config(
    {
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
    }
);


export default async function handler(req, res) {
    switch (req.method) {

        case 'GET': return await getAllProducts(req, res);

        case 'PUT': return await updateProduct(req, res);

        case 'POST': return await createProduct(req, res);

        default: return res.status(400).json({ message: 'Bad request' });
    }
}


const createProduct = async (req, res) => {
    const productToCreate = req.body;

    // if less than two images, return a 400 error
    if (productToCreate.images.length < 2) return res.status(400).json({ message: 'Debe haber al menos dos imágenes' });


    try {
        await db.connect();

        // if there is already a product with same slug, return a 400 error
        const productWithSameSlug = await Product.findOne({ slug: productToCreate.slug });
        if (productWithSameSlug) {
            db.disconnect();
            return res.status(400).json({ message: 'Ya existe un producto con el mismo slug' });
        }

        // if the product to create has slug = 'new-product', return a 400 error (this is a reserved slug)
        if (productToCreate.slug === 'new-product') {
            db.disconnect();
            return res.status(400).json({ message: 'El slug "new-product" está reservado' });
        }


        const createdProduct = await Product.create(productToCreate);
        // the mongoose model will validate other fields of the data before saving it to the database and return an error if it's not valid, so we don't need to validate it here
        await db.disconnect();

        return res.status(201).json(createdProduct);

    } catch (error) {
        await db.disconnect();
        return res.status(500).json({ message: error.message });
    }
}


const getAllProducts = async (req, res) => {

    db.connect();
    const products = await Product.find({})
        .sort({ title: 'asc' })
        .lean()
    db.disconnect();

    const updatedProducts = products.map(product => {
        product.images = product.images.map(image =>
            image.startsWith('http') ? image : `${process.env.HOST_NAME}/products/${image}`
        )
        return product
    })

    return res.status(200).json(updatedProducts);

}

const updateProduct = async (req, res) => {
    const {
        _id,
        images,
    } = req.body;

    // _id is a valid ObjectId
    if (!isValidObjectId(_id)) return res.status(404).json({ message: 'El ID del producto no es válido' });

    // images has at leas two elements
    if (images.length < 2) return res.status(400).json({ message: 'Debe haber al menos dos imágenes' });

    try {
        await db.connect();
        let productToUpdate = await Product.findById(_id);
        if (!productToUpdate) {
            await db.disconnect();
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // before updating, delete from cloudinary the images that are not in the new images array but are in the productToUpdate.images array
        // imagesToDelete are the images that are in productToUpdate.images but not in images and that start with 'http' (because they are images from cloudinary)
        console.log("outside", productToUpdate.images)
        const imagesToDelete = productToUpdate.images.filter(image => !images.includes(image) && image.startsWith('http'));
        if (imagesToDelete.length > 0) {
            console.log("inside", imagesToDelete)
            imagesToDelete.forEach(async image => {
                console.log("inside loop", image)
                const imageId = image.split('/').pop().split('.')[0];
                await cloudinary.v2.uploader.destroy(imageId);
            });
        }

        productToUpdate = Object.assign(productToUpdate, req.body);
        productToUpdate = await productToUpdate.save();
        await db.disconnect();

        return res.status(200).json(productToUpdate);

    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(500).json({ message: 'Error de servidor' });
    }

}


