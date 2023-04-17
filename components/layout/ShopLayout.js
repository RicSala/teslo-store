import Head from "next/head"
import { Navbar } from "../ui/Navbar"
import { SideMenu } from "../ui"

export const ShopLayout = ({
	title,
	pageDescription,
	imageFullUrl,
	children
}) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={pageDescription} />
				<meta name="og:title" content={title} />
				<meta name="og:description" content={pageDescription} />

				{imageFullUrl && (
					<meta name="og:image" content={imageFullUrl} />
				)}
			</Head>

			<nav>
				<Navbar />
			</nav>

			<SideMenu/>

			<main
				style={{
					margin: "80px",
					maxWidth: "1440px",
					padding: "0 30px"
				}}
			>
				{children}
			</main>

			<footer></footer>
		</>
	)
}
