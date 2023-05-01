import { Box, Card, CardContent, Chip, Divider, Grid, Typography } from "@mui/material";
import { AdminLayout } from "../../../../components/layout";
import { CartList, OrderSummary } from "../../../../components/cart";
import { CardGiftcardRounded, CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";
import { getOrderById } from "../../../../database/dbOrders";
import { useState } from "react";


const OrderAdminPage = ({ order }) => {

    const { shippingAddress, isPaid, paidAt, numberOfItems, total, subtotal, tax, orderItems } = order;
    const { firstname, lastname, address, address2, zip, city, country, phone } = shippingAddress;
    const summaryItems = { numberOfItems, subtotal, tax, total };
    const [isPaying, setIsPaying] = useState(false);

    return (
        <AdminLayout title='Resumen del pedido' subtitle={`Pedido ${order._id}`} icon={<CardGiftcardRounded />}>

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
                            </Box>

                        </CardContent>

                    </Card>
                </Grid>
            </Grid>

        </AdminLayout>
    )
};

export const getServerSideProps = async ({ req, query }) => {
    const { id = '' } = query;

    const order = await getOrderById(id);


    if (!order) {
        return {
            redirect: {
                destination: `/admin/orders`,
                permanent: false
            }
        }
    }

    return {
        props: {
            order
        }
    }
}

export default OrderAdminPage;