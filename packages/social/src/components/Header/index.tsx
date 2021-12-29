/**
 * @author Tanya Vykliuk <tanya.vykliuk@gmail.com>
 */
import React, { useEffect, useState } from 'react'
// @ts-ignore
import styles from './Header.module.scss'
import Avatar from '@material-ui/core/Avatar'
import { useDispatch } from '@standardcreative/client-core/src/store'

import { useCreatorState } from '@standardcreative/client-core/src/social/state/CreatorState'
import { CreatorService } from '@standardcreative/client-core/src/social/state/CreatorService'
import { PopupsStateService } from '@standardcreative/client-core/src/social/state/PopupsStateService'
import { useTranslation } from 'react-i18next'
import { useAuthState } from '@standardcreative/client-core/src/user/state/AuthState'

interface Props {
  logo?: string
  setView: any
}
const AppHeader = ({ setView, onGoRegistration }: any) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [creator, setCreator] = useState({})
  const auth = useAuthState()
  useEffect(() => {
    if (auth.user.id.value) {
      CreatorService.getLoggedCreator()
    }
  }, [])
  const creatorState = useCreatorState()

  useEffect(() => {
    setCreator(
      creatorState.creators.fetchingCurrentCreator.value === false && creatorState.creators.currentCreator.value
    )
  }, [])

  return (
    <nav className={styles.headerContainer}>
      <img
        src="/assets/LogoColored.png"
        className={styles.headerLogo}
        alt="Creator"
        style={{
          cursor: 'pointer'
        }}
        onClick={() => {
          onGoRegistration(() => {
            setView('featured')
          })
        }}
      />
      {creator && (
        <Avatar
          onClick={() => {
            onGoRegistration(() => {
              PopupsStateService.updateCreatorFormState(true)
            })
          }}
          alt={creator?.username}
          src={'/assets/userpic.png'}
        />
      )}
    </nav>
  )
}

export default AppHeader
