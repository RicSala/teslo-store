import { Typography } from "@mui/material";
import { ShopLayout } from "../../../components/layout";
import { useProducts } from "../../../hooks";
import { FullScreenLoading } from "../../../components/ui";
import { ProductList } from "../../../components/products";



const WomenPage = () => {

  const { products, isLoading, isError } = useProducts("/products?gender=women")

  return (
    <ShopLayout title={'Para mujer'} pageDescription={'Compra tu ropa de mujer aquí'}>
      <Typography variant="h1" sx={{ mb: 1 }}>Women</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>Todos los productos </Typography>

      {
        isLoading ? <FullScreenLoading /> :
          <ProductList products={products} />
      }

    </ShopLayout>
  )
};

export default WomenPage