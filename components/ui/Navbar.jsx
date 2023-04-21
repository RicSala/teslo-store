import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material"
import {
	AppBar,
	Badge,
	Box,
	Button,
	IconButton,
	Input,
	InputAdornment,
	Link,
	Toolbar,
	Typography
} from "@mui/material"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useRef, useState } from "react"
import { CartContext, UIContext } from "../../context"






export const Navbar = () => {


	const { numberOfItems } = useContext(CartContext) //TODO this is throwing an error sometimes in npm run dev

	const router = useRouter();
	const { toggleSideMenu, isMenuOpen } = useContext(UIContext)
	const { asPath, push } = useRouter()


	/// ************* SEARCH BAR ************* ///

	const [searchTerm, setSearchTerm] = useState('');
	const [isSearchVisible, setIsSearchVisible] = useState(false);

	const navigateTo = (path) => {
	}
	
	const onSearchTerm = () => {
		if (searchTerm.trim().length === 0) return;
		router.push(`/search/${searchTerm}`)
	}
  
	const inputRef = useRef();
  
	useEffect(() => {
	  if (isMenuOpen) {
		console.log("menu is open");
		setTimeout(() => {
		  if (inputRef.current) {
			console.log("before focus", inputRef.current)
			const innerInputElement = inputRef.current.querySelector('input');
			console.log("inner input element", innerInputElement)
			if (innerInputElement) {
			  innerInputElement.focus();
			}
		  }
		}, 100); // Adjust the delay as needed
	  }
	}, [isMenuOpen]);

	/// ************* SEARCH BAR END ************* ///


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
				<Box sx={{ display: isSearchVisible? 'none': { xs: "none", sm: "block" } }} className="fadeIn">
					<NextLink
						href="/category/men"
						passHref
						className="nav-link"
					>
						<Link component={"span"} className="menu-link">
							<Button color={asPath === "/category/men"? 'primary' : 'info'}>Hombres</Button>
						</Link>
					</NextLink>
					<NextLink
						href="/category/women"
						passHref
						className="nav-link"
					>
						<Link component={"span"}>
							<Button color={asPath === "/category/women"? 'primary' : 'info'}>Mujeres</Button>
						</Link>
					</NextLink>
					<NextLink
						href="/category/kid"
						passHref
						className="nav-link"
					>
						<Link component={"span"}>
							<Button color={asPath === "/category/kid"? 'primary' : 'info'}>Niños</Button>
						</Link>
					</NextLink>
				</Box>
				<Box flex={1} />

				
				{/* big screens */}
				{
					isSearchVisible ?
						<Input
						// do not show on small screens
								sx={{ display: { xs: "none", sm: "flex" } }}
								autoFocus
								type="text"
								placeholder="Buscar"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								ref={inputRef}
								className="fadeIn"

								// for some reason, on keydown generates several events, so we use onKeyUp
								onKeyUp={(e) => { if (e.key === 'Enter') onSearchTerm() }}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
										onClick={()=> setIsSearchVisible(false)} 
										>
											<ClearOutlined/>
										</IconButton>
									</InputAdornment>
								}
								
							/> : 
							<IconButton onClick={()=> setIsSearchVisible(true)} className="fadeIn"
							// dont on small screens
							sx={{ display: { xs: "none", sm: "flex" } }}

							>
								<SearchOutlined />
							</IconButton>

				}



				{/* small screens */}
				<IconButton
				sx={{ display: { xs: "flex", sm: "none" } }}
				onClick={toggleSideMenu}
				>
					<SearchOutlined />
				</IconButton>



				<NextLink href="/cart" passHref className="nav-link">
					<Link component={"span"}>
						<IconButton>
							<Badge badgeContent={numberOfItems > 9 ? '+9' : numberOfItems} color="secondary">
								<ShoppingCartOutlined />
							</Badge>
						</IconButton>
					</Link>
				</NextLink>

				<Button
					onClick={toggleSideMenu}
				>Menú</Button>
			</Toolbar>
		</AppBar>
	)
}
