import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../../../components/layout";
import NextLink from "next/link";

const LoginPage = (props) => {
  return (
    <AuthLayout title='ingresar'>

    <Box sx={{ width:350, padding:'10px 20px'}}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h1" component={'h1'}>Ingresar</Typography> 
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Correo electrónico"
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Contraseña"
                    type="password"
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                >Ingresar</Button>
            </Grid>
            <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                <NextLink href={'/auth/register'} passHref style={{textDecorationColor: "gray"}}>
                    <Link component={'span'}>
                        ¿No tienes una cuenta?
                    </Link>
                </NextLink>
            </Grid>
        </Grid>

    </Box>
      
    </AuthLayout>
  )};

export default LoginPage;