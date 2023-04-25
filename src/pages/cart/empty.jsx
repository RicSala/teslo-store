import { Box, Link, Typography } from "@mui/material";
import { ShopLayout } from "../../../components/layout";
import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import NextLink from "next/link";
// REVIEW: sx vs style vs properties
// REVIEW: What do we need materialUI link for?

const EmptyPage = () => {
  return (
    <ShopLayout title={"Carrito de compra vacío"} pageDescription="No hay artículos en el carrito de compras">

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display='flex' flexDirection='column' alignItems='center'>
          <Typography>Su carrito está vacío</Typography>
          <NextLink href={'/'} passHref style={{ textDecoration: 'none' }}>
            <Link typography="h4" color="secondary" component={'span'}>
              Regresar
            </Link>
          </NextLink>
        </Box>

      </Box>

    </ShopLayout>
  )
};

export default EmptyPage;