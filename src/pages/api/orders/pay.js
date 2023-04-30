import axios from "axios";
import { db } from "../../../../database";
import { Order } from "../../../../models";
import { isValidObjectId } from "mongoose";

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST': return await payOrder(req, res);

        default: return res.status(400).json({ message: 'Bad request' });
    }
}

const payOrder = async (req, res) => {


    const paypalBearerToken = await getPaypalBearerToken()

    if (!paypalBearerToken) return res.status(500).json({ message: 'Error al obtener el token de paypal' })

    const { transactionId, orderId } = req.body

    const { data } = await axios.get(`${process.env.PAYPAL_ORDERS_URL}/${transactionId}`, {
        // bearer token
        headers: {
            'Authorization': `Bearer ${paypalBearerToken}`,
        }
    })

    // check if orderId is a valid mongo id
    if (!isValidObjectId(orderId)) return res.status(400).json({ message: 'Id de orden inválido' })

    if (data.status !== 'COMPLETED') return res.status(500).json({ message: 'Transacción pendiente de marcar como pagada' })

    await db.connect()
    // get the order with id = orderId
    const order = await Order.findById(orderId)

    if (!order) {
        await db.disconnect()
        return res.status(404).json({ message: 'Orden no encontrada' })
    }

    // check the total of the order and the total of the paypal transaction
    if (order.total !== Number(data.purchase_units[0].amount.value)) {
        await db.disconnect()
        return res.status(500).json({ message: 'El total de la orden no coincide con el total de la transacción' })
    }

    order.transactionId = transactionId
    order.isPaid = true

    await order.save()
    await db.disconnect()



    return res.status(200).json({ message: 'Pedido pagado' });

}


const getPaypalBearerToken = async () => {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
    const secret = process.env.PAYPAL_SECRET

    const body = new URLSearchParams({
        'grant_type': 'client_credentials'
    })

    const base64Token = Buffer.from(`${clientId}:${secret}`, 'utf-8').toString('base64') // Buffer.from converts the string to a buffer (binary), 
    // ...and toString('base64') converts the buffer to a base64 string.
    // it's just a requirement from paypal to use basic auth (with base64 encoding)


    try {

        const { data } = await axios.post(process.env.PAYPAL_OAUTH_URL || '', body, {
            headers: {
                'Authorization': `Basic ${base64Token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })


        return data.access_token

    } catch (error) {

        if (axios.isAxiosError(error)) {
            console.log(error.response.data)
        } else {
            console.log(error)
            return null
        }

    }

}