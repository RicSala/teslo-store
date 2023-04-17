import "../../styles/globals.css"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { lightTheme } from "../../themes"

export default function App({ Component, pageProps }) {
	return (
		<ThemeProvider theme={lightTheme}>
			<CssBaseline />
			<Component {...pageProps} />
		</ThemeProvider>
	)
}
