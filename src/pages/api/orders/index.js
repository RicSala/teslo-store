import { getSession } from "next-auth/react";
import { Order, Product } from "../../../../models";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { db } from "../../../../database";



export default async function handler(req, res) {
    switch (req.method) {
        case 'POST': return await createOrder(req, res);

        default: return res.status(400).json({ message: 'Bad request' });
    }
}

const createOrder = async (req, res) => {

    const order = req.body;


    // Verify that is a authenticated user
    const session = await getServerSession(req, res, authOptions)

    // if (!session) return res.status(401).json({ message: 'Debe estar autenticado para hacer esto' });

    // Create an array with the product _id's in the cart

    const productIds = order.orderItems.map(item => item.id)

    await db.connect()

    // get the products from the database using the productIds array
    const products = await Product.find({ _id: { $in: productIds } })


    try {

        const subtotal = order.orderItems.reduce((prev, item) => {
            //get the price from the product array, because it's coming from the database, not the client
            const price = products.find(product => product._id.toString() === item.id).price
            return prev + item.price * item.quantity

        }, 0)

        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)
        const tax = subtotal * taxRate
        const backendTotal = subtotal + tax

        if (order.total !== backendTotal) {
            throw new Error('El total no coincide con el total calculado')
        }

        // if we are here, it means that the total is correct, so we can create the order

        const userId = session.user._id.toString()
        // console.log("session.user", session.user)
        // console.log("shippingAddress", order.shippingAddress)


        const newOrder = new Order({
            user: userId,
            orderItems: order.orderItems,
            shippingAddress: order.shippingAddress,
            numberOfItems: order.numberOfItems,
            subtotal: order.subtotal,
            tax: order.tax,
            total: order.total,
            isPaid: false,
        })



        // console.log("newOrder", newOrder)


        // const createdOrder = await newOrder.save()

        // round the newOrder.total to 2 decimals

        newOrder.total = Math.round(newOrder.total * 100) / 100

        const createdOrder = await newOrder.save()
        await db.disconnect()

        // console.log("newOrder", createdOrder)

        return res.status(201).json({ newOrder: createdOrder })

    } catch (error) {
        await db.disconnect()
        console.log("Error en createOrder", error)
        res.status(400).json({ message: error.message || 'Revise logs del servidor' })
    }

    await db.disconnect()

}