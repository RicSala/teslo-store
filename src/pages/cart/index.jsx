import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { ShopLayout } from "../../../components/layout";
import { CartList, OrderSummary } from "../../../components/cart";
import { useContext, useEffect } from "react";
import { CartContext } from "../../../context";
import { useRouter } from "next/router";

const CartPage = () => {

    const router = useRouter();

    const { isLoaded, productsInCart } = useContext(CartContext);

    useEffect(() => {
        (isLoaded && productsInCart.length === 0) && router.replace('/cart/empty');
    }, [isLoaded, productsInCart, router]); // TODO: why do we need to add router here?

    if (!isLoaded) return <> </>;

  return (
    <ShopLayout title='Carrito - 3' pageDescription='Carrito de compras de la tienda'>
    <Typography variant="h1" component="h1">Carrito</Typography>
    <Grid container>
        <Grid item xs={12} sm={7}>
            <CartList editable={true}/>
        </Grid>
        <Grid item xs={12} sm={5}>
            <Card className="summary-card">
                <CardContent>
                    <Typography variant="h2" component="h2">Pedido</Typography>
                    <Divider sx={{my:1}}/>
                    <OrderSummary />
                    <Box sx={{mt:3}}>
                    <Button 
                        color="secondary" 
                        className="circular-btn" 
                        fullWidth
                        href="/checkout/address"
                        >
                        Checkout
                    </Button>

                    </Box>
                </CardContent>

            </Card>
        </Grid>
    </Grid>
      
    </ShopLayout>
  )};

export default CartPage;