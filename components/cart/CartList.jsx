import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { ItemCounter } from "../ui";
import { useContext } from "react";
import { CartContext } from "../../context";


export const CartList = ({ editable = false, products }) => {

    const { productsInCart, updateProduct, removeProductFromCart } = useContext(CartContext)


    // we make this component reusable by passing the products as props. If there are no products in the props, we use the context

    const productsToShow = products ? products : productsInCart;

    //  console.log("Products in Cart", productsInCart)

    const onUpdateQuantity = (quantity, product) => {

        product.quantity = quantity;
        updateProduct(product)
    }

    return (
        <>
            {
                productsToShow.map((product) => (

                    <Grid key={product.slug + product.size} container spacing={2} sx={{ mb: 1 }} >
                        <Grid item xs={3}>
                            <NextLink href={`/product/${product.slug}`} passHref>
                                <Link component='div'>
                                    <CardActionArea>
                                        <CardMedia
                                            component={'img'}
                                            image={product.image}
                                            sx={{ borderRadius: '5px' }}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display={'flex'} flexDirection={'column'}>
                                <Typography variant={'body1'}> {product.title}</Typography>
                                <Typography variant={'body1'}> Talla: <strong>{product.size}</strong></Typography>

                                {editable ? (
                                    <ItemCounter
                                        count={product.quantity}
                                        updateQuantity={(value) => { onUpdateQuantity(value, product) }}
                                        maxValue={10} // This is a fake value
                                    />) :
                                    <Typography variant={'body1'}> Cantidad: <strong>{product.quantity}</strong></Typography>
                                }

                            </Box>
                        </Grid>
                        <Grid item xs={2} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                            <Typography variant="subtitle1"> ${product.price} </Typography>
                            {editable && (
                                <Button variant='text' color="secondary" onClick={() => { removeProductFromCart(product) }}>
                                    Borrar
                                </Button>)}

                        </Grid>

                    </Grid>
                ))
            }
        </>
    )
};