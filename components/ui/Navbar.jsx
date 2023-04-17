import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material"
import {
	AppBar,
	Badge,
	Box,
	Button,
	IconButton,
	Link,
	Toolbar,
	Typography
} from "@mui/material"
import NextLink from "next/link"

export const Navbar = () => {
	return (
		<AppBar>
			<Toolbar>
				<NextLink
					href="/"
					passHref
					style={{
						textDecoration: "none"
					}}
					className="nav-link"
				>
					<Link component={"span"} display="flex" alignItems="center">
						<Typography variant="h6"> Teslo | </Typography>
						<Typography sx={{ ml: 0.5 }}>Shop </Typography>
					</Link>
				</NextLink>

				<Box flex={1} />
				<Box sx={{ display: { xs: "none", sm: "block" } }}>
					<NextLink
						href="/category/men"
						passHref
						className="nav-link"
					>
						<Link component={"span"} className="menu-link">
							<Button>Hombres</Button>
						</Link>
					</NextLink>
					<NextLink
						href="/category/women"
						passHref
						className="nav-link"
					>
						<Link component={"span"}>
							<Button>Mujeres</Button>
						</Link>
					</NextLink>
					<NextLink
						href="/category/kid"
						passHref
						className="nav-link"
					>
						<Link component={"span"}>
							<Button>Niños</Button>
						</Link>
					</NextLink>
				</Box>
				<Box flex={1} />

				<IconButton>
					<SearchOutlined />
				</IconButton>
				<NextLink href="/cart" passHref className="nav-link">
					<Link component={"span"}>
						<IconButton>
							<Badge badgeContent="2" color="secondary">
								<ShoppingCartOutlined />
							</Badge>
						</IconButton>
					</Link>
				</NextLink>

				<Button>Menú</Button>
			</Toolbar>
		</AppBar>
	)
}
