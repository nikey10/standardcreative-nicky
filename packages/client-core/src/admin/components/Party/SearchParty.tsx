import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import SearchIcon from '@material-ui/icons/Search'
import { usePartyStyles } from './style'

const SearchParty = () => {
  const classes = usePartyStyles()

  return (
    <Paper component="form" className={classes.searchRoot}>
      <InputBase className={classes.input} placeholder={`Search for party`} inputProps={{ 'aria-label': 'party ' }} />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchParty
