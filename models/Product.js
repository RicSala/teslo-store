import mongoose, { Schema, model } from 'mongoose';


const productSchema = new Schema({
    description: { type: String, required: true, default: '' },
    images: [{ type: String }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    sizes: [{
        type: String,
        enum: {
            values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            message: '{VALUE} no es un tamaño válido'
        }
    }],
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, required: true },
    type: {
        type: String,
        enum: {
            values: ['shirts', 'pants', 'hoodies', 'hats'],
            message: '{VALUE} no es un tipo válido'
        },
        default: 'shirts'
    },
    gender: {
        type: String,
        enum: {
            values: ['men', 'women', 'kid', 'unisex'],
            message: '{VALUE} no es un genero válido'
        },
        default: 'unisex'
    }
}, {
    timestamps: true // This will add createdAt and updatedAt fields to the schema
});


productSchema.index({ title: 'text', tags: 'text' }); // Creates a compound index for title and tags that will be used for faster text search


// TODO: Check this out - this is a workaround for the error...
let Product

if (!mongoose.models) {
    Product = model('Product', productSchema)
} else {
    if (!mongoose.models.Product) {
        Product = model('Product', productSchema)
    } else {
        Product = mongoose.models.Product
    }
}


export default Product;