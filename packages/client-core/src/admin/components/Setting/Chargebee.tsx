import React, { useEffect } from 'react'
import { Paper, Typography } from '@material-ui/core'
import InputBase from '@material-ui/core/InputBase'
import { ChargebeeSettingService } from '../../state/Setting/ChargebeeSettingServices'
import { useChargebeeSettingState } from '../../state/Setting/ChargebeeSettingState'
import { useDispatch } from '../../../store'
import { useStyles } from './styles'
import { useAuthState } from '../../../user/state/AuthState'
interface Props {}

const ChargeBee = (props: Props) => {
  const classes = useStyles()
  const chargeBeeSettingState = useChargebeeSettingState()
  const [chargebee] = chargeBeeSettingState?.Chargebee?.chargebee.value || []
  const dispatch = useDispatch()
  const authState = useAuthState()
  const user = authState.user

  useEffect(() => {
    if (user?.id?.value != null && chargeBeeSettingState?.Chargebee?.updateNeeded?.value) {
      ChargebeeSettingService.fetchChargeBee()
    }
  }, [authState])

  return (
    <div>
      <form>
        <Typography component="h1" className={classes.settingsHeading}>
          {' '}
          CHARGEBEE
        </Typography>
        <Paper component="div" className={classes.createInput}>
          <label>URL:</label>
          <InputBase
            value={chargebee?.url || ''}
            name="url"
            className={classes.input}
            disabled
            style={{ color: '#fff' }}
          />
        </Paper>
        <Paper component="div" className={classes.createInput}>
          <label>ApiKey:</label>
          <InputBase
            value={chargebee?.apikey || ''}
            name="apikey"
            className={classes.input}
            disabled
            style={{ color: '#fff' }}
          />
        </Paper>
      </form>
    </div>
  )
}

export default ChargeBee
