import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material";
import { ShopLayout } from "../../../components/layout";
import { CartList, OrderSummary } from "../../../components/cart";
import NextLink from "next/link";
import { useContext } from "react";
import { CartContext } from "../../../context";

import { countries } from '../../../utils/countries'

const SummaryPage = () => {

    // get address information from the state cartContext
    const { shippingAddress, numberOfItems } = useContext(CartContext);

    if (!shippingAddress) return null // if there is no shipping address, then return null (this is to avoid errors
    // TODO: add a redirect to the address page if there is no shipping address

    const { address, address2, city, country, firstname, lastname, phone, zip } = shippingAddress

    console.log("address", shippingAddress)

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
                                countries.find(c => c.code === country).name

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
                            <Box sx={{ mt: 3 }}>
                                <Button color="secondary" className="circular-btn">
                                    Confirmar Pedido
                                </Button>

                            </Box>
                        </CardContent>

                    </Card>
                </Grid>
            </Grid>

        </ShopLayout>
    )
};

export default SummaryPage;