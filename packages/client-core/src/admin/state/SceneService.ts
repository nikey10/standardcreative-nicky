import { client } from '../../feathers'
import { store, useDispatch } from '../../store'
import { SceneAction } from './SceneActions'
import { accessSceneState } from './SceneState'

export const SceneService = {
  fetchAdminScenes: async (incDec?: 'increment' | 'decrement' | 'all') => {
    const dispatch = useDispatch()
    const adminScene = accessSceneState()
    const skip = adminScene.scenes.skip.value
    const limit = adminScene.scenes.limit.value
    const scenes = await client.service('collection').find({
      query: {
        $skip: incDec === 'increment' ? skip + limit : incDec === 'decrement' ? skip - limit : skip,
        $limit: incDec === 'all' ? 1000 : limit,
        $sort: {
          name: 1
        }
      }
    })
    dispatch(SceneAction.collectionsFetched(scenes))
  },
  deleteScene: async (sceneId: string) => {}
}
