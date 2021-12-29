import { createState, DevTools, useState, none, Downgraded } from '@hookstate/core'
import { UserSeed } from '@standardcreative/common/src/interfaces/User'
import { IdentityProviderSeed } from '@standardcreative/common/src/interfaces/IdentityProvider'
import { AuthUserSeed } from '@standardcreative/common/src/interfaces/AuthUser'
import { RouteActionType } from './RouteActions'

export const ROUTE_PAGE_LIMIT = 100

const state = createState({
  isLoggedIn: false,
  isProcessing: false,
  error: '',
  authUser: AuthUserSeed,
  user: UserSeed,
  identityProvider: IdentityProviderSeed,
  routes: {
    routes: [] as {
      id: string
      project: string
      routes: string[]
    }[],
    activeRoutes: [] as {
      project: string
      route: string
    }[],
    skip: 0,
    limit: ROUTE_PAGE_LIMIT,
    total: 0,
    retrieving: false,
    fetched: false,
    updateNeeded: true,
    lastFetched: Date.now()
  }
})

export const receptor = (action: RouteActionType): any => {
  let result: any
  state.batch((s) => {
    switch (action.type) {
      case 'ADMIN_ROUTE_INSTALLED_RECEIVED':
        result = action.data.data
        return s.routes.merge({ routes: result, updateNeeded: false })
      case 'ADMIN_ROUTE_ACTIVE_RECEIVED':
        result = action.data.data
        console.log('ADMIN_ROUTE_ACTIVE_RECEIVED')
        return s.routes.merge({ activeRoutes: result, updateNeeded: false })
    }
  }, action.type)
}

export const accessRouteState = () => state

export const useRouteState = () => useState(state) as any as typeof state
