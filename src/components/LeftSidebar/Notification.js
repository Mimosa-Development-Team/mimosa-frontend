import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import CloseIcon from '@material-ui/icons/Close'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import Switch from '@material-ui/core/Switch'
import { withStyles } from '@material-ui/core'
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded'
import AddMailModal from 'components/Dialog/addmail'
import capitalizeText from 'utils/parsing/capitalize'

import TimeAgo from 'react-timeago'
import enString from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import { useGlobalState } from 'store/state'
import getRawData from 'utils/hookstate/getRawData'
import { useNotification } from './hooks'
import styles from './styles.module.scss'

const formatter = buildFormatter(enString)
const SwitchToggle = withStyles({
  switchBase: {
    color: 'orange',
    marginTop: '-8px',
    '&$checked': {
      color: 'orange',
      marginTop: '-8px'
    },
    '&$checked + $track': {
      backgroundColor: 'orange',
      marginTop: '-8px'
    }
  },
  checked: {},
  track: {
    color: 'orange',
    marginTop: '-8px',
    '&$checked': {
      color: 'orange',
      marginTop: '-8px'
    },
    '&$checked + $track': {
      backgroundColor: 'orange',
      marginTop: '-8px'
    }
  }
})(Switch)

const Notification = ({ anchorEl, setAnchorEl }) => {
  const history = useHistory()
  const { user: proxyUser } = useGlobalState()
  const { user } = getRawData(proxyUser)
  const [notificationId, setNotificationId] = useState(null)
  const [modal, setModal] = useState(false)
  const {
    notificationRefetch,
    notification,
    deleteNotificationSingleMutate,
    updateEmail,
    deleteNotificationAllMutate
  } = useNotification(notificationId)
  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    notificationRefetch()
  }, [anchorEl, notification, user])

  return (
    <div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{
          marginLeft: '260px',
          marginTop: '-100px'
        }}
      >
        <AddMailModal modal={modal} setModal={setModal} />
        <CloseIcon
          style={{
            right: 10,
            top: 10,
            position: 'absolute',
            color: 'grey',
            fontSize: '20px',
            cursor: 'pointer'
          }}
          onClick={handleClose}
        />
        <div
          style={{
            paddingLeft: '15px',
            paddingTop: '15px'
          }}
        >
          <h2>Notifications</h2>
        </div>
        {user && user.email && (
          <div
            style={{ paddingLeft: '15px', paddingTop: '15px' }}
          >
            <i
              style={{
                color: '#EF8C1F',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              {user.email}{' '}
              <SwitchToggle
                checked={user.emailNotification}
                labelPlacement="top"
                onChange={() => {
                  updateEmail({
                    emailNotification: !user.emailNotification
                  })
                }}
                name="checkedA"
                inputProps={{
                  'aria-label': 'secondary checkbox'
                }}
              />
            </i>
          </div>
        )}
        {user && !user.email && (
          <div
            style={{
              backgroundColor: '#FBE8D2',
              color: 'orange',
              cursor: 'pointer'
            }}
            onClick={() => setModal(!modal)}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                padding: '10px',
                justifyContent: 'center'
              }}
            >
              <MailOutlineIcon />
              <span
                style={{ marginLeft: '5px', color: 'orange' }}
              >
                Add Email Address
              </span>
            </div>
          </div>
        )}
        {/* <hr
            style={{
              marginTop: '10px',
              marginLeft: '15px',
              width: '89%',
              opacity: '.4'
            }}
          /> */}
        <div
          style={{
            maxHeight: '550px',
            width: '380px',
            padding: '15px'
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {notification && notification.length <= 0 && (
                <div
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  <i>No notification!</i>
                </div>
              )}
              {notification &&
                notification.map((x, i) => {
                  return (
                    <div className={`${styles.comment}`}>
                      <Grid container key={i}>
                        <Grid item xs={3}>
                          <Avatar
                            style={{
                              backgroundColor:
                                x.mmUser && x.mmUser.userColor
                            }}
                          >
                            {x.mmUser &&
                              x.mmUser.firstName.charAt(0)}
                          </Avatar>
                        </Grid>
                        <Grid
                          item
                          xs={7}
                          onClick={() => {
                            history.push(
                              `/contribution?list=${x.contributionId}&active=${x.contributionId}&from=home`
                            )
                          }}
                        >
                          <span>
                            <b>
                              {x.mmUser && x.mmUser.firstName}{' '}
                              {x.mmUser && x.mmUser.lastName}
                            </b>{' '}
                            commented on your{' '}
                            <b>{capitalizeText(x.type)}</b>{' '}
                            contributions
                          </span>
                        </Grid>
                        <Grid item xs={2}>
                          <DeleteOutlineRoundedIcon
                            onClick={async () => {
                              await setNotificationId(x.id)
                              await deleteNotificationSingleMutate()
                            }}
                            style={{
                              color: 'red',
                              marginLeft: '25px',
                              marginTop: '6px',
                              cursor: 'pointer'
                            }}
                          />
                        </Grid>
                        <Grid item xs={3} />
                        <Grid item xs={9}>
                          <span style={{ color: '#F2BA1D' }}>
                            <TimeAgo
                              date={x.createdAt}
                              formatter={formatter}
                            />
                          </span>
                        </Grid>
                      </Grid>
                    </div>
                  )
                })}
            </Grid>
          </Grid>
        </div>
        {notification && notification.length > 0 && (
          <div
            style={{
              backgroundColor: '#f74545',
              textAlign: 'center',
              color: 'white',
              padding: '8px',
              marginBottom: '8px',
              cursor: 'pointer',
              position: 'fixed',
              width: '380px',
              borderBottomLeftRadius: '5px',
              borderBottomRightRadius: '5px'
            }}
            onClick={() => deleteNotificationAllMutate()}
          >
            <i>Clear All Notifications</i>
          </div>
        )}
      </Menu>
      {anchorEl && (
        <div
          style={{
            position: 'absolute',
            marginLeft: '250px',
            marginTop: '-16px'
          }}
        >
          <div
            style={{
              borderTop: '10px solid transparent',
              borderBottom: '10px solid transparent',
              borderRight: '10px solid white'
            }}
          />
        </div>
      )}
    </div>
  )
}

export default Notification
