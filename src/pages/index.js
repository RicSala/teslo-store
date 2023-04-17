import { Inter } from "next/font/google"
import { ShopLayout } from "../../components/layout"
import { Card, CardActionArea, CardMedia, Grid, Typography } from "@mui/material"

import { initialData } from "../../database/products"
import { ProductList } from "../../components/products"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
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

			<ProductList products={initialData.products} />
		</ShopLayout>
	)
}
