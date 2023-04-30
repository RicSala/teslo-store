import mongoose, { Schema, model } from "mongoose";


const orderSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    orderItems: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        gender: { type: String, required: true },
        title: { type: String, required: true },
        size: { type: String, required: true },
        quantity: { type: Number, required: true },
        slug: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
    }],

    shippingAddress: {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        address: { type: String, required: true },
        address2: { type: String },
        city: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true },
    },

    numberOfItems: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },

    total: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    transactionId: { type: String },

}, {
    timestamps: true // will add createdAt and updatedAt fields
}
)


let Order

if (!mongoose.models) {
    Order = model('Order', orderSchema)
} else {
    if (!mongoose.models.Order) {
        Order = model('Order', orderSchema)
    } else {
        Order = mongoose.models.Order
    }
}

export default Order;


// We are not using typescript but the interface will help us to know what we are expecting from the request body
// export interface IOrder {
//     _id?: string;
//     user?: IUser | string; // Depending on the populate we will get the user object or just the id
//     orderItems: IOrderItem[];
//     shippingAddress: IShippingAddress; // to be implemented
//     paymentResult: string;
//     numberOfItems: number;
//     subtotal: number;
//     tax: number;
//     total: number;
//     isPaid: boolean;
//     paidAt: Date;
//     }


// orderItems interface:
// export interface IOrderItem {
//     _id: string;
//     title: string;
//     size: string;
//     quantity: number;
//     slug: string;
//     price: number; // price can change so we need to store it at the moment of the purchase
//     image: string;
// }