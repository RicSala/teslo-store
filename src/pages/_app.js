import "../../styles/globals.css"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { lightTheme } from "../../themes"
import { SWRConfig } from "swr"
import { AuthProvider, CartProvider, UIProvider } from "../../context"

export default function App({ Component, pageProps }) {
	return (

		<SWRConfig
			value={{
				// Config of how often SWR will revalidate the data, and fetcher function to be used by SWR (in this case we are using the default fetcher return res.json())
				// refreshInterval: 500,
				fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
			}}>
			<AuthProvider>
				<CartProvider>
					<UIProvider>
						<ThemeProvider theme={lightTheme}>
							<CssBaseline />
							<Component {...pageProps} />
						</ThemeProvider>
					</UIProvider>
				</CartProvider>
			</AuthProvider>
		</SWRConfig>


	)
}
