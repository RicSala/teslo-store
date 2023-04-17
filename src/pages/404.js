import { Inter } from "next/font/google"
import { ShopLayout } from "../../components/layout"
import { Box, Typography } from "@mui/material"

const inter = Inter({ subsets: ["latin"] })

export default function Custom404() {
	return (
		<ShopLayout
			title={"Página no encontrada"}
			pageDescription={"Nada que ver aquí"}
		>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="end"
				height="calc(100vh - 200px)"
				sx={{ flexDirection: { xs: "column", sm: "row" } }}
			>
				<Typography
					variant="h1"
					component="h1"
					fontSize={60}
					fontWeight={200}
				>
					404 |
				</Typography>
				<Typography
					marginLeft={2}
				>
					No encontramos ninguna página aquí
				</Typography>
			</Box>
		</ShopLayout>
	)
}
