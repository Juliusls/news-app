import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'
import theme from './theme'
import { ThemeProvider } from '@material-ui/styles'

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
let persistor = persistStore(store)

ReactDOM.render(
	// <React.StrictMode>
	<Provider store={store}>
		<PersistGate loading={ <p>Loading...</p> } persistor={persistor}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</PersistGate>
	</Provider>,
	// </React.StrictMode>,
	document.getElementById('root')
)
