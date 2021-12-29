/**
 * @author Tanya Vykliuk <tanya.vykliuk@gmail.com>
 */
import React, { useEffect, useState } from 'react'

import { useDispatch } from '@standardcreative/client-core/src/store'

import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { useTranslation } from 'react-i18next'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
// import TwitterIcon from '@material-ui/icons/Twitter';
// import InstagramIcon from '@material-ui/icons/Instagram';
// import TitleIcon from '@material-ui/icons/Title';
// import SimpleModal from '../SimpleModal';
// @ts-ignore
import styles from './CreatorCard.module.scss'
import { useCreatorState } from '@standardcreative/client-core/src/social/state/CreatorState'
import { CreatorService } from '@standardcreative/client-core/src/social/state/CreatorService'
import { PopupsStateService } from '@standardcreative/client-core/src/social/state/PopupsStateService'
import { FeedService } from '@standardcreative/client-core/src/social/state/FeedService'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core'
import SimpleModal from '../SimpleModal'

interface Props {
  creator: any
}

const CreatorCard = ({ creator }: Props) => {
  const creatorState = useCreatorState()
  const isMe = creator === creatorState.creators.currentCreator?.id?.value
  const { t } = useTranslation()
  const [openBlock, setOpenBlock] = React.useState(false)
  const [openFiredModal, setOpenFiredModal] = useState(false)
  const [creatorsType, setCreatorsType] = useState('followers')
  const dispatch = useDispatch()
  const creatorData = isMe ? creatorState.creators.currentCreator : creatorState.creators.creator

  // const [anchorEl, setAnchorEl] = useState(null);
  // const handleClick = (event) => {
  //     setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //     setAnchorEl(null);
  // };
  // const handleEditClick = () =>{
  //     // handleClose();
  //     // history.push('/creatorEdit');
  // };

  // const handleFollowCreator = (creatorId) => followCreator(creatorId)
  // const handleUnFollowCreator = (creatorId) => unFollowCreator(creatorId)

  // const handleFollowersByCreator = (creatorId) => {
  //   getFollowersList(creatorId)
  //   setOpenFiredModal(true)
  //   setCreatorsType('followers')
  // }
  // const handleFollowingByCreator = (creatorId) => {
  //   getFollowingList(creatorId)
  //   setOpenFiredModal(true)
  //   setCreatorsType('following')
  //   console.log(creatorState)
  // }

  const currentCreator = creatorState.creators.currentCreator?.id?.value
  useEffect(() => {
    CreatorService.getBlockedList(currentCreator)
  }, [])

  const blackList = creatorState.creators.blocked.value
  const checkId = (obj) => obj.id === creator?.id
  const isBlockedByMe = blackList?.some(checkId)

  const handleBlockCreator = (creatorId) => {
    CreatorService.blockCreator(creatorId)
    setOpenBlock(false)
    PopupsStateService.updateCreatorPageState(false)
  }

  const handleBlockedList = (creatorId) => {
    CreatorService.getBlockedList(creatorId)
    setOpenFiredModal(true)
    setCreatorsType('blocked')
  }

  const openBlockConfirm = () => {
    setOpenBlock(true)
  }

  const closeBlockConfirm = () => {
    setOpenBlock(false)
  }
  // const renderSocials = () =>  <>
  //         {creator.twitter && <a target="_blank" href={'http://twitter.com/'+creator.twitter}><Typography variant="h4" component="p" align="center"><TwitterIcon />{creator.twitter}</Typography></a>}
  //         {creator.instagram && <a target="_blank" href={'http://instagram.com/'+creator.instagram}><Typography variant="h4" component="p" align="center"><InstagramIcon />{creator.instagram}</Typography></a>}
  //         {creator.tiktok && <a target="_blank" href={'http://tiktok.com/@'+creator.tiktok}><Typography variant="h4" component="p" align="center"><TitleIcon />{creator.tiktok}</Typography></a>}
  //         {creator.snap && <a target="_blank" href={'http://snap.com/'+creator.snap}><Typography variant="h4" component="p" align="center"><TwitterIcon />{creator.snap}</Typography></a>}
  //     </>;

  const renderEditButton = () => (
    <Button
      variant="text"
      className={styles.moreButton}
      aria-controls="owner-menu"
      aria-haspopup="true"
      onClick={() => {
        PopupsStateService.updateCreatorFormState(true)
        FeedService.clearCreatorFeatured()
      }}
    >
      <MoreHorizIcon />
    </Button>
  )

  return creator ? (
    <>
      <Card className={styles.creatorCard} elevation={0} key={creator.username} square={false}>
        {creator.background ? (
          <CardMedia className={styles.bgImage} src={creator.background} title={creator.name} />
        ) : (
          <section className={styles.bgImage} />
        )}
        <section className={styles.controls}>
          <Button
            variant="text"
            className={styles.backButton}
            onClick={() => {
              PopupsStateService.updateCreatorPageState(false)
            }}
          >
            <ArrowBackIosIcon />
            {t('social:creator.back')}
          </Button>
          {isMe && renderEditButton()}
        </section>
        {/*hided for now*/}
        {/* <section className={styles.countersButtons}>
                    <section className={styles.countersButtonsSub}>
                        <Button variant={'outlined'} color='primary' className={styles.followButton} onClick={()=>handleFollowersByCreator(creator.id)}>Followers</Button>
                        <Button variant={'outlined'} color='primary' className={styles.followButton} onClick={()=>handleFollowingByCreator(creator.id)}>Following</Button>
                    </section>
                </section> */}
        {creatorData.avatar.value ? (
          <CardMedia
            className={styles.avatarImage}
            image={creatorData.avatar.value}
            title={creatorData.username.value}
          />
        ) : (
          <section className={styles.avatarImage} />
        )}
        <CardContent className={styles.content}>
          <Typography className={styles.username}>@{creatorData.username.value}</Typography>
          <Typography className={styles.titleContainer}>{creatorData.name.value}</Typography>
          <Typography className={styles.tags}>{creatorData.tags.value}</Typography>
          <Typography>{creatorData.bio.value}</Typography>
          {isMe ? (
            <Button
              variant={'outlined'}
              color="primary"
              className={styles.followButton}
              onClick={() => handleBlockedList(creatorData.id.value)}
            >
              {t('social:creator.blocked-list')}
            </Button>
          ) : (
            ' '
          )}
          {isMe || isBlockedByMe ? (
            ''
          ) : (
            <Button onClick={openBlockConfirm} variant={'outlined'} color="primary" className={styles.followButton}>
              {t('social:creator.block-user')}
            </Button>
          )}
          <Dialog
            open={openBlock}
            onClose={closeBlockConfirm}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{'Block this user?'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">{t('social:creator.dialog-content')}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeBlockConfirm} color="primary">
                {t('social:cancel')}
              </Button>
              <Button onClick={() => handleBlockCreator(creatorData.id.value)} color="primary" autoFocus>
                {t('social:confirm')}
              </Button>
            </DialogActions>
          </Dialog>

          {/* 
          {!isMe && creator.followed === false && <Button variant={'contained'} color='primary' className={styles.followButton} 
                            onClick={()=>handleFollowCreator(creator.id)}>Follow</Button>}
                    {!isMe && creator.followed === true && <Button variant={'outlined'} color='primary' className={styles.followButton} 
                        onClick={()=>handleUnFollowCreator(creator.id)}>UnFollow</Button>} */}
          {/*hided for now*/}
          {/* {renderSocials()} */}
        </CardContent>
      </Card>
      <SimpleModal
        type={creatorsType}
        list={creatorState.creators.blocked.value}
        open={openFiredModal}
        onClose={() => setOpenFiredModal(false)}
      />
    </>
  ) : (
    <></>
  )
}

export default CreatorCard
