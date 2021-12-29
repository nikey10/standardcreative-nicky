import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { initialize } from './util'
// import { store } from '@standardcreative/client-core/src/store'
import { Provider } from 'react-redux'

// Add additional state modules
// const stateModules = import.meta.globEager('./state/*State')
// store.registerStateModules(stateModules)

import store from './store'

import('./env-config').then((module) => {
	const envConfig = module.default
	envConfig()
	// Initialize i18n and client-core
	initialize()
		// then load the app
		.then((_) => {
			const AppPage = React.lazy(() => import('./pages/_app'))
			ReactDOM.render(
				<Suspense fallback={<></>}>
					<Provider store={store}>
						<AppPage />
					</Provider>
				</Suspense>,
				document.getElementById('root')
			)
		})
})
