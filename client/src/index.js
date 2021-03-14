import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { ThemeProvider } from '@material-ui/styles'
import { CookiesProvider } from 'react-cookie'

import App from './App'
import store from './store'
import theme from './theme'

let persistor = persistStore(store)

ReactDOM.render(
	// <React.StrictMode>
	<Provider store={store}>
		<PersistGate loading={ <p>Loading...</p> } persistor={persistor}>
			<CookiesProvider>
				<ThemeProvider theme={theme}>
					<App />
				</ThemeProvider>
			</CookiesProvider>
		</PersistGate>
	</Provider>,
	// </React.StrictMode>,
	document.getElementById('root')
)
