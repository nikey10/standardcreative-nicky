import { createState, DevTools, useState, none, Downgraded } from '@hookstate/core'
import { UserSeed } from '@standardcreative/common/src/interfaces/User'
import { IdentityProviderSeed } from '@standardcreative/common/src/interfaces/IdentityProvider'
import { AuthUserSeed } from '@standardcreative/common/src/interfaces/AuthUser'
import { SceneActionType } from './SceneActions'
import { SceneData } from '@standardcreative/common/src/interfaces/SceneData'

export const SCENE_PAGE_LIMIT = 100

const state = createState({
  isLoggedIn: false,
  isProcessing: false,
  error: '',
  authUser: AuthUserSeed,
  user: UserSeed,
  identityProvider: IdentityProviderSeed,
  scenes: {
    scenes: [] as Array<SceneData>,
    skip: 0,
    limit: SCENE_PAGE_LIMIT,
    total: 0,
    retrieving: false,
    fetched: false,
    updateNeeded: true,
    lastFetched: Date.now()
  }
})

export const receptor = (action: SceneActionType): any => {
  let result: any
  state.batch((s) => {
    switch (action.type) {
      case 'ADMIN_SCENES_RETRIEVED':
        result = action.sceneDataResult
        return s.scenes.merge({
          scenes: result.data,
          skip: result.skip,
          limit: result.limit,
          total: result.total,
          retrieving: false,
          fetched: true,
          updateNeeded: false,
          lastFetched: Date.now()
        })
    }
  }, action.type)
}

export const accessSceneState = () => state

export const useSceneState = () => useState(state) as any as typeof state
