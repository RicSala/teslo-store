import { Order } from "../../../../models";
import { db } from "../../../../database";
import { isValidObjectId } from "mongoose";



export default async function handler(req, res) {
    switch (req.method) {
        case 'GET': return await getOrders(req, res);

        // case 'PUT': return await updateOrders(req, res);

        default: return res.status(400).json({ message: 'Bad request' });
    }
}


const getOrders = async (req, res) => {

    await db.connect()
    const orders = await Order.find({})
        .sort({ createdAt: -1 })
        .populate('user', 'name email')
        .lean()

    await db.disconnect()

    return res.status(200).json(orders);

}