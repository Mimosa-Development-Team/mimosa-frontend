/* eslint-disable no-console */
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'

const LightTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 16,
    padding: '15px'
  },
  arrow: {
    '&:before': {
      border: '1px solid white'
    },
    color: 'white'
  }
}))(Tooltip)

const TooltipUi = ({ title, ...propsList }) => {
  console.log(title)
  return (
    <LightTooltip title={title} arrow>
      {propsList.children}
    </LightTooltip>
  )
}

export default TooltipUi
