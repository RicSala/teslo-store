import { getSession } from "next-auth/react";
import { Order, Product } from "../../../../models";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { db } from "../../../../database";
import { getNumberOfOrders } from "../../../../database/dbOrders";
import { getNumberOfUsers } from "../../../../database/dbUsers";
import { getNumberOfProducts } from "../../../../database/dbproducts";



export default async function handler(req, res) {
    switch (req.method) {
        case 'GET': return await dashboardMetrics(req, res);

        default: return res.status(400).json({ message: 'Bad request' });
    }
}

const dashboardMetrics = async (req, res) => {

    const { numberOfOrders, paidOrders, notPaidOrders } = await getNumberOfOrders();
    const { numberOfClients } = await getNumberOfUsers();
    const { numberOfProducts, numberOfProductsWithNoInventory, numberOfProductsWithLowInventory } = await getNumberOfProducts();

    return res.status(200).json({
        numberOfOrders,
        paidOrders,
        notPaidOrders,
        numberOfClients,
        numberOfProducts,
        numberOfProductsWithNoInventory,
        numberOfProductsWithLowInventory
    });

}