import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { initialize } from './util'
import Splash from '@standardcreative/social/src/components/Splash'
import { store } from '@standardcreative/client-core/src/store'

// Add additional state modules
const stateModules = import.meta.globEager('./state/*State')
store.registerStateModules(stateModules)

import('./env-config').then((module) => {
  const envConfig = module.default
  envConfig()
  // Initialize i18n and client-core
  initialize()
    // then load the app
    .then((_) => {
      const StoreProvider = React.lazy(() => import('./pages/_app'))
      ReactDOM.render(
        <Suspense fallback={<Splash />}>
          <StoreProvider />
        </Suspense>,
        document.getElementById('root')
      )
    })
})
