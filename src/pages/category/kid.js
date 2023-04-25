import { Typography } from "@mui/material";
import { ShopLayout } from "../../../components/layout";
import { useProducts } from "../../../hooks";
import { FullScreenLoading } from "../../../components/ui";
import { ProductList } from "../../../components/products";



const KidPage = () => {

  const { products, isLoading, isError } = useProducts("/products?gender=kid")

  return (
    <ShopLayout title={'Para niños'} pageDescription={'Compra tu ropa de niños aquí'}>
      <Typography variant="h1" sx={{ mb: 1 }}>Kids</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>Todos los productos </Typography>

      {
        isLoading ? <FullScreenLoading /> :
          <ProductList products={products} />
      }

    </ShopLayout>
  )
};

export default KidPage