import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import tileData from './tileData';
import { createChainedFunction } from '@material-ui/core'

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
      display: 'flex',
      justifyContent: 'space-between',
      flexFlow: 'row no wrap',
      width: 1000,
      height: 600,
      backgroundColor: '#f5f5dc',
      border: '3px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    button: {
    },
    info: {
        display: 'flex',
        justifyContent: 'space-evenly',
        flexFlow: 'column wrap',
    },
    gridList: {
        width: 500,
        height: 600,
    },
  }));

const AssetInfo = (props) => {
    const classes = useStyles();

    return (
        <form className={classes.info}>
            <label> Name:
                <Input
                    defaultValue = {props.name}
                    onChange={event => {
                        console.log(event.target.value)
                    }}
                /> 
            </label>
            <label> Brand: 
                <Input
                    defaultValue = {props.brand}
                    onChange={event => {
                        console.log(event.target.value)
                    }}
                />
            </label>
            <label> Quantity:
                <Input
                    defaultValue = {props.quantity}
                    onChange={event => {
                        console.log(event.target.value)
                    }}
                /> 
            </label>
            <label> Purchase Date: 
                <Input
                    defaultValue = {props.date}
                    onChange={event => {
                        console.log(event.target.value)
                    }}
                />
            </label>
            <label> Paid Price: 
                <Input
                    defaultValue = {props.price}
                    onChange={event => {
                        console.log(event.target.value)
                    }}
                />
            </label>
            <input accept="image/*"
                className={classes.input}
                style={{ display: 'none' }}
                id="add-image"
                multiple type="file" />
            <input accept="all/*"
                className={classes.input}
                style={{ display: 'none' }}
                id="add-docs"
                multiple type="file" />
            <label htmlFor="add-image">
                <Button variant = "contained" component="span" className={classes.button}>
                    Add Pictures
                </Button>
            </label>
            <label htmlFor="add-docs">
                Documents
                <Button variant = "contained" component="span" className={classes.button}>
                    Add Documents
                </Button>
            </label>
      </form>
    )
}

const ZoomImg = (props) => {

    return( 
    <div>
    <Modal
        open= {true}
        >
        <div>hi</div>
    </Modal>
    </div>
    )
}

const AssetPics = (props) => {
    const classes = useStyles();

    return (
      <div className={classes.gridList}>
        <GridList cellHeight={300} spacing={1} className={classes.gridList}>
          {tileData.map((tile) => (
            <GridListTile cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1} onClick={ZoomImg}>
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                titlePosition="top"
                actionPosition="left"
                className={classes.titleBar}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }

const AssetModal = (props) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        /*
        if (changes were made) {
            show confirm discard changes popup
        }
        else {
            setOpen(false);
        } */
        setOpen(false);
    };

    const handleSave = () => {
        /*
        if (changes were made) {
            update values
        } */
        setOpen(false);
    }

    return (
        <div>
            <button type="button" onClick={handleOpen}>
                Create Asset
            </button>
            <div className={classes.root}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className={classes.modal}>
                    <div className={classes.paper}>
                        <div >
                            <AssetInfo />
                        </div>
                        <div>
                            <AssetPics />
                        </div>
                        <div className={classes.button}>
                        <Button type="button" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleClose}>
                            Save
                        </Button>
                        </div>
                    </div>
            </Modal>
            </div>
        </div>
    )
}

export default AssetModal