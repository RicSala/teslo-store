import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material";
import { ShopLayout } from "../../../components/layout";
import { CartList, OrderSummary } from "../../../components/cart";
import NextLink from "next/link";
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";

const OrderPage = () => {
  return (
        <ShopLayout title='Resumen del pedido' pageDescription='Resumen de tu pedido'>
        <Typography variant="h1" component="h1">Pedido: 123123</Typography>
        {/* <Chip
        sx={{ my: 1 }}
        label="Pendiente de pago"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined/>}
         /> */}
        <Chip
        sx={{ my: 1 }}
        label="Pagada"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined/>}
         />
        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList/>
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className="summary-card">
                    <CardContent>
                        <Typography variant="h2" component="h2"></Typography>
                        <Divider sx={{my:1}}/>

                        <Box display={'flex'} justifyContent={'end'}>
                            <NextLink href='/checkout/address' passHref>
                                <Link component={'span'}>Editar</Link>
                            </NextLink>
                        </Box>

                        <Typography variant='subtitle1'>Dirección de entrega</Typography>
                        <Typography variant='body1'>Ricardo Sala</Typography>
                        <Typography variant='body1'>Algún lugar</Typography>
                        <Typography variant='body1'>50012 Zaragoza</Typography>
                        <Typography variant='body1'>España</Typography>
                        <Typography variant='body1'>+24600243843</Typography>

                        <Divider sx={{my:1}}/>

                        <Box display={'flex'} justifyContent={'end'}>
                            <NextLink href='/cart' passHref>
                                <Link component={'span'}>Editar</Link>
                            </NextLink>

                        </Box>
                            <OrderSummary />
                            <Box sx={{mt:3}} component={'h2'}>
                                <a fullWidth>
                                    Pagar
                                </a>
                            </Box>
                                <Chip
                                sx={{ my: 1 }}
                                label="Pagada"
                                variant="outlined"
                                color="success"
                                icon={<CreditScoreOutlined/>}
                                />
        
                    </CardContent>
    
                </Card>
            </Grid>
        </Grid>
          
        </ShopLayout>
  )};

export default OrderPage;