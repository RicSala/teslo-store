import { Inter } from "next/font/google"
import { Card, CardActionArea, CardMedia, Grid, Typography } from "@mui/material"


import { ShopLayout } from "../../components/layout"
import { initialData } from "../../database/seed-data"
import { ProductList } from "../../components/products"
import { useProducts } from "../../hooks"
import { FullScreenLoading } from "../../components/ui"

const inter = Inter({ subsets: ["latin"] })


export default function HomePage() {

	const { products, isLoading, isError } = useProducts("/products")

	return (
		<ShopLayout
			title={"Teslo-Shop"}
			pageDescription={"Los mejores productos"}
			imageFullUrl={"adsf"}
		>
			<Typography variant="h1" component="h1">
				Teslo Shop
			</Typography>
			<Typography variant="h2" sx={{ mb: 1 }}>
				Todos los productos
			</Typography>
			{
				isLoading ? <h1>Cargando</h1> :
					<ProductList products={products} />
			}

		</ShopLayout>
	)
}
