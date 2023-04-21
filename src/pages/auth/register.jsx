import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../../../components/layout";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { validations } from "../../../utils";
import { useContext, useState } from "react";
import { tesloApi } from "../../../api";
import { ErrorOutline } from "@mui/icons-material";
import { useRouter } from "next/router";
import { AuthContext } from "../../../context";

const RegisterPage = (props) => {


    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [showError, setshowError] = useState(false);
    const [error, setError] = useState(false); // TODO: why do need this?
    const {registerUser} = useContext(AuthContext);
    const destination = router.query.p?.toString();

    
    const onRegisterForm = async (payload) => {

        setshowError(false);
        const resp = await registerUser(payload);

        if(resp.hasError) {
            setshowError(true);
            setError(resp.error);
            setTimeout(() => { setshowError(false) }, 3000);
            return;
        }

        router.replace(destination || '/');
    }

  return (
    <AuthLayout title='Regístrate'>

    <form onSubmit={handleSubmit(onRegisterForm)} noValidate>

        <Box sx={{ width:350, padding:'10px 20px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>

                    <Typography variant="h1" component={'h1'} marginTop={10} >Ingresar</Typography> 
                    <Chip 
                        sx={{display: showError ? 'flex' : 'none'}}
                        label = {error}
                        color="error"
                        icon={<ErrorOutline />}
                        className="fadeIn"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Nombre Completo"
                        variant="filled"
                        {...register("name", {
                            required: "Este campo es requerido",
                            minLength: {value: 3, message: "Mínimo dos caracteres"} })}
                        error={errors.name}
                        helperText={errors?.name?.message}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="email"
                        fullWidth
                        label="Correo electrónico"
                        variant="filled"
                        {...register("email", {
                            required: true,
                            required: "Este campo es requerido",
                            validate: validations.isEmail
                            })}
                        error={errors.email}
                        helperText={errors?.email?.message}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Contraseña"
                        type="password"
                        variant="filled"
                        { ...register("password", {
                            required: "Este campo es requerido",
                            minLength: 6,
                            })}
                        error={errors.password}
                        helperText={errors?.password?.message}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                    type="submit"
                    color="secondary"
                    className="circular-btn"
                    size="large"
                    fullWidth
                    >Registrar</Button>
                </Grid>
                <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                    <NextLink href={`/auth/login${destination ? `?p=${destination}`:`` }`} passHref style={{textDecorationColor: "gray"}}>
                        <Link component={'span'}>
                            ¿Ya tienes una cuenta?
                        </Link>
                    </NextLink>
                </Grid>
            </Grid>

        </Box>
    </form>
      
    </AuthLayout>
  )};

export default RegisterPage;