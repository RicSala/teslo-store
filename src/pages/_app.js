import "../../styles/globals.css"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { lightTheme } from "../../themes"
import { SWRConfig } from "swr"
import { AuthProvider, CartProvider, UIProvider } from "../../context"

export default function App({ Component, pageProps }) {
	return (

		<SWRConfig
			value={{
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
