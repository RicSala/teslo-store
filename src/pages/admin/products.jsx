import { AddOutlined, CategoryOutlined } from "@mui/icons-material";
import { Box, Button, CardMedia, Chip, Grid, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useSWR from "swr";
import { currency } from "../../../utils";
import NextLink from "next/link";
import { AdminLayout } from "../../../components/layout";


const columns = [
    {
        field: 'img', headerName: 'Foto',
        renderCell: (params) => (

            <a href={`/admin/products/${params.row.slug}`} target="_black" >
                <CardMedia
                    component="img"
                    className="fadeIn"
                    image={`${params.row.img}`}
                />
            </a>
        )

    },
    {
        field: 'title', headerName: 'Nombre', width: 200,
        // render the title with a NextLink
        renderCell: (params) => (
            <NextLink href={`/admin/products/${params.row.slug}`} passHref>
                <Link component={'span'} >
                    {params.row.title}
                </Link>
            </NextLink>)

    },
    { field: 'gender', headerName: 'Género' },
    { field: 'type', headerName: 'Tipo' },
    { field: 'inStock', headerName: 'Inventario' },
    { field: 'price', headerName: 'Precio' },
    { field: 'sizes', headerName: 'Tallas', width: 200 },
    ,]



const ProductsPage = (props) => {

    const { data, error, isLoading } = useSWR('/api/admin/products')

    if (isLoading) return <p>Cargando...</p>

    if (error) return <p>Hubo un error</p>

    const rows = data.map(product => {
        return {
            id: product._id,
            img: product.images[0],
            title: product.title,
            gender: product.gender,
            type: product.type,
            inStock: product.inStock,
            price: currency.format(product.price),
            sizes: product.sizes.join(', '),
            slug: product.slug,
        }
    })


    return (
        <AdminLayout title={`Productos${data ? ` ${data.length}` : ''}`} subtitle={'Mantenimiento de productos'} icon={<CategoryOutlined />}>

            <Box display={'flex'} justifyContent={'end'} sx={{ mb: 2 }} >
                {/* add a new material button in the left saying "Crear Producto" and linking to /admin/products/new-product */}
                <Button startIcon={<AddOutlined />}
                    variant="contained"
                    href="/admin/products/new-product"
                    color="secondary">Crear Producto</Button>
            </Box>

            <Grid container>
                <Grid item xs={12} sx={{ height: 550, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>

        </AdminLayout>
    )
};


export default ProductsPage;