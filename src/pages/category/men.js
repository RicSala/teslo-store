import { Typography } from "@mui/material";
import { ShopLayout } from "../../../components/layout";
import { useProducts } from "../../../hooks";
import { FullScreenLoading } from "../../../components/ui";
import { ProductList } from "../../../components/products";



const MenPage = (props) => {

    const { products, isLoading, isError } = useProducts("/products?gender=men")

  return (
    <ShopLayout title={'Men'} pageDescription={'Compra tu ropa de hombre aquí'}>
        <Typography variant="h1" sx={{ mb: 1 }}>Men</Typography>
        <Typography variant="h2" sx={{ mb: 1 }}>Todos los productos </Typography>
      
        {
            isLoading? <FullScreenLoading/> :
            <ProductList products={products} />
        }

    </ShopLayout>
  )};

export default MenPage