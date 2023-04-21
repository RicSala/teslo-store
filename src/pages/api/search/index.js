import { SHOP_CONSTANTS, db } from "../../../../database";
import { Product } from "../../../../models";

// respond with a 400 in all cases
export default async function handler(req, res) {
    return res.status(400).json({ message: 'Debe de especificar la query de búsqueda' });
}
