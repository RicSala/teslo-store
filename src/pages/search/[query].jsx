import { Box, Typography } from "@mui/material"
import { ShopLayout } from "../../../components/layout"
import { ProductList } from "../../../components/products"
import { dbProducts } from "../../../database"

export default function SearchPage({ products, foundProuducts, query }) {

    return (
        <ShopLayout
            title={"Teslo-Shop"}
            pageDescription={"Los mejores productos"}
            imageFullUrl={"adsf"}
        >
            <Typography variant="h1" component="h1">
                Teslo Shop
            </Typography>

            {
                foundProuducts ?
                    <Typography variant="h2" sx={{ mb: 1 }}
                        textTransform={'capitalize'}
                    >{'Productos encontrados para "{query}"'}</Typography>
                    :
                    <Box display={'flex'} marginTop={2}>
                        <Typography variant="h2" sx={{ mb: 1 }}>No encontramos productos</Typography>
                        <Typography variant="h2" sx={{ mb: 1, ml: 1 }} color={'secondary'} textTransform={'capitalize'} >{query}</Typography>
                    </Box>
            }
            <ProductList products={products} />

        </ShopLayout>
    )
}

// This page is rendered on the server
// TODO: see how it looks after building, html + json?
export const getServerSideProps = async (context) => {

    const { query } = context.params;

    if (query.length === 0) {
        //redirect to home page
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    let products = await dbProducts.getProductsByTerm(query);
    const foundProuducts = products.length > 0

    // TODO: If there are no products, show recommended products
    if (!foundProuducts) {
        // products = await dbProducts.getAllProducts()
        products = await dbProducts.getProductsByTerm('shirt') // we are in the server, we don't need to use the api
    }

    return { // these are the props that will be passed to the component up there
        props: {
            products,
            foundProuducts,
            query
        }
    }
}
