import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../../../components/layout";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { validations } from "../../../utils";
import { tesloApi } from "../../../api";
import { ErrorOutline } from "@mui/icons-material";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context";
import { useRouter } from "next/router";

const LoginPage = (props) => {

const router = useRouter()
const { register, handleSubmit, watch, formState: { errors } } = useForm();
const [showError, setShowError] = useState(false);
const { loginUser } = useContext(AuthContext);
const destination = router.query.p?.toString();



const onLoginUser = async ({email, password}) => {
    setShowError(false);
    const isValidLogin = await loginUser(email, password);

    console.log("user", email, password, isValidLogin)

    if (!isValidLogin) {
        setShowError(true);
        setTimeout(() => {
            setShowError(false);
        }, 3000);
        return 
    }


    router.replace(destination || '/');

}

  return (
    <AuthLayout title='ingresar'>

        <form onSubmit={handleSubmit(onLoginUser)} noValidate>
            <Box sx={{ width:350, padding:'10px 20px'}}>
                    
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h1" component={'h1'}>Ingresar</Typography>
                        <Chip
                            sx={{display: showError ? 'flex' : 'none'}}
                            label = "No reconocemos ese usuario/contraseña"  
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
                            {...register("email",{
                                required: 'Este campo es requerido',
                                validate: validations.isEmail,

                            })}
                            error={errors.email ? true : false}
                            helperText={errors.email?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Contraseña"
                            type="password"
                            variant="filled"
                            {...register("password",{
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
                        <NextLink href={`/auth/register${destination ? `?p=${destination}`:`` }`} passHref style={{textDecorationColor: "gray"}}>
                            <Link component={'span'}>
                                ¿No tienes una cuenta?
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>

            </Box>
        </form>
      
    </AuthLayout>
  )};

export default LoginPage;