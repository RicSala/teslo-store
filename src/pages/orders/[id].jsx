import { Box, Card, CardContent, Chip, CircularProgress, Divider, Grid, Typography } from "@mui/material";
import { ShopLayout } from "../../../components/layout";
import { CartList, OrderSummary } from "../../../components/cart";
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";
import { getSession } from "next-auth/react";
import { getOrderById } from "../../../database/dbOrders";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { tesloApi } from "../../../api";
import { useRouter } from "next/router";
import { useState } from "react";




const OrderPage = ({ order }) => {

    const { shippingAddress, isPaid, paidAt, numberOfItems, total, subtotal, tax, orderItems } = order;
    const { firstname, lastname, address, address2, zip, city, country, phone } = shippingAddress;
    const summaryItems = { numberOfItems, subtotal, tax, total };
    const [isPaying, setIsPaying] = useState(false);
    const router = useRouter();

    const onOrderPaid = async (details) => {

        if (details.status !== 'COMPLETED') {
            return;
        }

        setIsPaying(true)
        try {
            const { data } = await tesloApi.post('/orders/pay', {
                transactionId: details.id,
                orderId: order._id
            })

            // at this point, if no errors were thrown, the order was paid successfully. Instead of updating the state manually, we can just reload the page
            router.reload()

        } catch (error) {
            setIsPaying(false)
        }
    }

    return (
        <ShopLayout title='Resumen del pedido' pageDescription='Resumen de tu pedido'>
            <Typography variant="h1" component="h1">Pedido: {order._id}</Typography>

            {
                order.isPaid ?
                    <Chip
                        sx={{ my: 1 }}
                        label="Pagada"
                        variant="outlined"
                        color="success"
                        icon={<CreditScoreOutlined />}
                    />

                    :

                    <Chip
                        sx={{ my: 1 }}
                        label="Pendiente de pago"
                        variant="outlined"
                        color="error"
                        icon={<CreditCardOffOutlined />}
                    />

            }


            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList products={orderItems} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2" component="h2">Resumen del pedido: {order.numberOfItems} productos </Typography>
                            <Divider sx={{ my: 1 }} />


                            <Typography variant='subtitle1'>Dirección de entrega</Typography>
                            <Typography variant='body1'>{firstname} {lastname}</Typography>
                            <Typography variant='body1'>{address}{address2 ? `, ${address2}` : ''}</Typography>
                            <Typography variant='body1'>{zip} {city}</Typography>
                            <Typography variant='body1'>{country}</Typography>
                            <Typography variant='body1'>{phone}</Typography>

                            <Divider sx={{ my: 1 }} />
                            <OrderSummary summaryItems={summaryItems} />
                            <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                                <Box
                                    display={'flex'}
                                    justifyContent={'center'}
                                    className='fade-in'
                                    sx={{ visibility: isPaying ? 'visible' : 'hidden' }}
                                >
                                    <CircularProgress />

                                </Box>

                                <Box sx={{ visibility: isPaying ? 'hidden' : 'visible' }}>
                                    {
                                        isPaid ?
                                            <Chip
                                                sx={{ my: 1 }}
                                                label="Pagada"
                                                variant="outlined"
                                                color="success"
                                                icon={<CreditScoreOutlined />}
                                            /> :
                                            <PayPalButtons
                                                createOrder={(data, actions) => {
                                                    return actions.order.create({
                                                        purchase_units: [
                                                            {
                                                                amount: {
                                                                    value: `${order.total}`,
                                                                    currency_code: "USD",
                                                                },
                                                            },
                                                        ],
                                                    });
                                                }}
                                                onApprove={(data, actions) => {
                                                    return actions.order.capture().then((details) => {
                                                        onOrderPaid(details)
                                                        const name = details.payer.name.given_name;
                                                    });
                                                }}
                                            />

                                    }

                                </Box>
                            </Box>

                        </CardContent>

                    </Card>
                </Grid>
            </Grid>

        </ShopLayout>
    )
};

export const getServerSideProps = async ({ req, query }) => {
    const { id = '' } = query;

    // get session from next-auth (server side)
    const session = await getSession({ req });


    // if no session, redirect to login
    if (!session) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${id}`,
                permanent: false
            }
        }
    }

    // if session, verify if the order exists
    const order = await getOrderById(id); // REVIEW: why he does toString() here? https://cursos.devtalles.com/courses/take/next/lessons/35661838-obtener-una-orden-por-id


    // if order doesn't exist, redirect to home
    if (!order) {
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false
            }
        }
    }


    // if order exists, verify if the user is the owner of the order
    if (order.user.toString() !== session.user._id.toString()) {
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false
            }
        }
    }


    // at this point, we know that the user is the owner of the order




    return {
        props: {
            order
        }
    }
}

export default OrderPage;