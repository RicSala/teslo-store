import { isValidObjectId } from "mongoose";
import { db } from ".";
import { Order } from "../models";

export const getOrderById = async (id) => {

    if (!isValidObjectId(id)) return null;

    await db.connect();
    const order = await Order.findById(id).lean();
    await db.disconnect();

    if (!order) return null;

    return JSON.parse(JSON.stringify(order));
    // We do this to convert the object to a JSON string and then parse it again to convert it to an object because the object returned by mongoose is not a pure object
};


//give a user id get all orders from that user
export const getOrdersByUserId = async (userId) => {

    if (!isValidObjectId(userId)) return null; // Always validate the id!!


    await db.connect();
    const orders = await Order.find({ user: userId }).lean();
    await db.disconnect();

    if (!orders) return [];

    return JSON.parse(JSON.stringify(orders));
}


// return an object with: numberOfOrders, paidOrders, notPaidOrders
export const getNumberOfOrders = async () => {

    await db.connect();
    const numberOfOrders = await Order.countDocuments();
    const paidOrders = await Order.countDocuments({ isPaid: true });
    const notPaidOrders = await Order.countDocuments({ isPaid: false });
    await db.disconnect();

    return { numberOfOrders, paidOrders, notPaidOrders };
}


