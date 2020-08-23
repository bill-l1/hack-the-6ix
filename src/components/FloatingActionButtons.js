import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import PostAddIcon from '@material-ui/icons/PostAdd'
import GavelIcon from '@material-ui/icons/Gavel'
import HelpIcon from '@material-ui/icons/Help'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles({
    iconContainer: {
        position: 'fixed',
        bottom: '0px',
        right: '0px',
        width: '215px',
        padding: '40px 60px',
        display: 'flex',
        justifyContent: 'space-between'
    }
})

const FloatingActionButtons = ({onAddAssetPress, onSubmitPress, onGetInfoPress}) => { 

    const classes = useStyles()

    return (
        <div className={classes.iconContainer}>
            <Tooltip title='Add an asset to your collection' placement='top'>
                <Fab color="primary" aria-label="add-asset">
                    <PostAddIcon />
                </Fab>
            </Tooltip>

            <Tooltip title='Package together documents for a claim' placement='top'>
                <Fab color="primary" aria-label="generate-package" onClick={onSubmitPress}>
                    <GavelIcon />
                </Fab>
            </Tooltip>

            <Tooltip title='Find out whats important about insurance for you' placement='top'>
                <Fab color="primary" aria-label="-get-info" onClick={onGetInfoPress}>
                    <HelpIcon />
                </Fab>
            </Tooltip>
        </div>
    )
}

export default FloatingActionButtons