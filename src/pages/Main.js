import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AssetModal from '../components/AssetModal'


const useStyles = makeStyles((theme) => ({
    root: {
      height: 300,
      flexGrow: 1,
      minWidth: 300,

    },
    modal: {
      display: 'flex',
      padding: theme.spacing(1),
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      width: 1000,
      height: 600,
      backgroundColor: '#f5f5dc',
      border: '3px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },

  }));


const Main = (props) => {
    return (
        <div>
            <AssetModal name="House" />
        </div>
    )
}

export default Main