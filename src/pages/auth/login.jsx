import { useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { useForm } from "react-hook-form";

import { AuthLayout } from "../../../components/layout";
import { validations } from "../../../utils";
import { getProviders, getSession, signIn } from "next-auth/react";

const LoginPage = () => {

    const router = useRouter()
    // We use useForm hook to handle form validation
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [showError, setShowError] = useState(false);
    const [providers, setProviders] = useState({});
    const destination = router.query.p?.toString(); // query string 


    useEffect((props) => {
        getProviders().then((providers) => {
            // console.log(providers);
            setProviders(providers);
        });
    }, []);

    const onLoginUser = async ({ email, password }) => {
        setShowError(false);

        await signIn('credentials', {
            email,
            password,
        });

        // This is the old way of doing it, now we use nextAuth
        // const isValidLogin = await loginUser(email, password);

        // if (!isValidLogin) {
        //     setShowError(true);
        //     setTimeout(() => {
        //         setShowError(false);
        //     }, 3000);
        //     return
        // }
        // router.replace(destination || '/');
    }

    return (
        <AuthLayout title='ingresar'>

            <form onSubmit={handleSubmit(onLoginUser)} noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }}>

                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <Typography variant="h1" component={'h1'}>Ingresar</Typography>
                            <Chip
                                sx={{ display: showError ? 'flex' : 'none' }}
                                label="No reconocemos ese usuario/contraseña"
                                color="error"
                                icon={<ErrorOutline />}
                                className="fadeIn"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                type="email"
                                fullWidth
                                label="Correo electrónico"
                                variant="filled"
                                {...register("email", {
                                    required: 'Este campo es requerido',
                                    validate: validations.isEmail,

                                })}
                                error={errors.email ? true : false}
                                helperText={errors.email?.message} // this is the text we defined in the validation object
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Contraseña"
                                type="password"
                                variant="filled"
                                {...register("password", {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' }
                                })}
                                error={errors.password ? true : false}
                                helperText={errors.password?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                color="secondary"
                                className="circular-btn"
                                size="large"
                                fullWidth
                            >Ingresar</Button>
                        </Grid>

                        <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                            {/* added p? so next page can remember where the user is coming from */}
                            <NextLink href={`/auth/register${destination ? `?p=${destination}` : ``}`} passHref style={{ textDecorationColor: "gray" }}>
                                <Link component={'span'}>
                                    ¿No tienes una cuenta?
                                </Link>
                            </NextLink>
                        </Grid>

                        <Grid item xs={12} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                            <Divider sx={{ width: '100%', mb: 2 }} />

                            {Object.values(providers).map((provider) => {
                                if (provider.name === 'Custom Login') {
                                    return null;
                                }
                                return (
                                    <Button
                                        key={provider.id}
                                        variant="outlined"
                                        color="primary"
                                        sx={{ mb: 1 }}
                                        fullWidth
                                        onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                                    >
                                        Ingresar con {provider.name}
                                    </Button>
                                );
                            })}

                        </Grid>

                    </Grid>

                </Box>
            </form>

        </AuthLayout>
    )
};

export const getServerSideProps = async ({ req, query }) => {

    const session = await getSession({ req });

    console.log("session from login", session)

    const { p = '/' } = query;

    // console.log("session from login", session)
    // console.log("query from login", p)

    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false,
            }
        }
    }


    return {
        props: {}
    }
}


export default LoginPage;