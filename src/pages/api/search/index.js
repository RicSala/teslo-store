
export default async function handler(req, res) {
    return res.status(400).json({ message: 'Debe de especificar la query de búsqueda' });
}
