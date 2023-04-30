import "../../styles/globals.css"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { lightTheme } from "../../themes"
import { SWRConfig } from "swr"
import { AuthProvider, CartProvider, UIProvider } from "../../context"
import { SessionProvider } from "next-auth/react"
import { PayPalScriptProvider } from "@paypal/react-paypal-js";



export default function App({
	Component,
	pageProps: {
		session,
		...pageProps
	} }) {
	return (

		<SessionProvider session={session}>
			<PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>

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
			</PayPalScriptProvider>
		</SessionProvider>


	)
}
