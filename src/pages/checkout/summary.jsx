import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material";
import { ShopLayout } from "../../../components/layout";
import { CartList, OrderSummary } from "../../../components/cart";
import NextLink from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context";

import { countries } from '../../../utils/countries'
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const SummaryPage = () => {

    const router = useRouter();

    const [isPosting, setIsPosting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // get address information from the state cartContext
    const { shippingAddress = {}, numberOfItems, createOrder } = useContext(CartContext);

    useEffect(() => {
        if (!Cookies.get('address')) {
            router.push('/checkout/address')
        }
    }, [router])


    const onCreateOrder = async () => {
        setIsPosting(true);
        const { hasError, message } = await createOrder()


        if (hasError) {
            setIsPosting(false);
            setErrorMessage(message)
            return
        }

        router.push(`/orders/${message}`)

    }


    // console.log("shippingAddress", shippingAddress)

    const { address, address2, city, country, firstname, lastname, phone, zip } = shippingAddress


    return (
        <ShopLayout title='Resumen del pedido' pageDescription='Resumen de tu pedido'>
            <Typography variant="h1" component="h1">Resumen del pedido</Typography>
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2" component="h2">Resumen ({numberOfItems} {numberOfItems < 2 ? 'producto' : 'productos'})</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box display={'flex'} justifyContent={'end'}>
                                <NextLink href='/checkout/address' passHref>
                                    <Link component={'span'}>Editar</Link>
                                </NextLink>
                            </Box>

                            <Typography variant='subtitle1'>Dirección de entrega</Typography>
                            <Typography variant='body1'>{firstname} {lastname}</Typography>
                            <Typography variant='body1'>{address}{address2 ? `, ${address2}` : ''}</Typography>
                            <Typography variant='body1'>{zip} {city}</Typography>
                            <Typography variant='body1'>{
                                // given an array of country objects {code: 'ES', name: 'Spain'} and a country code, returns the country name
                                countries.find(c => c.code === country)?.name || ''

                                // we can also do that with a filter
                                // countries.filter(c => c.code === country)[0].name

                            }</Typography>
                            <Typography variant='body1'>{phone}</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display={'flex'} justifyContent={'end'}>
                                <NextLink href='/cart' passHref>
                                    <Link component={'span'}>Editar</Link>
                                </NextLink>

                            </Box>
                            <OrderSummary />
                            <Box sx={{ mt: 3 }} display={'flex'} flexDirection={'column'} >
                                <Button color="secondary" className="circular-btn" onClick={onCreateOrder}
                                    disabled={isPosting} >
                                    Confirmar Pedido
                                </Button>
                                <Chip
                                    color='error'
                                    label={errorMessage}
                                    sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
                                >

                                </Chip>



                            </Box>
                        </CardContent>

                    </Card>
                </Grid>
            </Grid>

        </ShopLayout>
    )
};

export default SummaryPage;