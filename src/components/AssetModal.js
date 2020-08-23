import React, {useState, useImperativeHandle, forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import tileData from './tileData';

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

const AssetInfo = ({getData, handleData, handleFiles}) => {
    const classes = useStyles();

    const getToolTip = cat => {
        switch (cat){
            case 'Property': 
                return 'Details may include location, years of inhabitance, date of construction, and more.'
            case 'Auto':
                return 'Details may include model, brand, mileage, number of drivers, and more.'
            case 'Valuables':
                return 'Details may include model, serial number, brand, source of purchase, and more.'
            case 'Misc.':
                return 'Details may include model, serial number, brand, source of purchase, and more.'
            default:
                return 'Details may include model, serial number, brand, source of purchase, and more.'
        }
    }

    const data = getData();

    return (
        <form className={classes.info}>
            <label> Name:
                <Input
                    name='name'
                    defaultValue = {data.name}
                    onChange={handleData}
                /> 
            </label>
            <label> Category:
                <Select
                    name='category'
                    labelId='Category'
                    autoWidth = {true}
                    defaultValue={data.category}
                    onChange={handleData}
                >
                    <MenuItem value={'Property'}>Property</MenuItem>
                    <MenuItem value={'Auto'}>Auto</MenuItem>
                    <MenuItem value={'Valuables'}>Valuables</MenuItem>
                    <MenuItem value={'Misc.'}>Misc.</MenuItem>
                </Select>
            </label>
            <label> Quantity:
                <Input
                    name='quantity'
                    defaultValue = {data.quantity}
                    onChange={handleData}
                /> 
            </label>
            <label> Purchase Date: 
                <Input
                    name='date'
                    type='date'
                    defaultValue = {data.date}
                    onChange={handleData}
                />
            </label>
            <label> Paid Price: 
                <Input
                    name = 'value'
                    defaultValue = {data.value}
                    onChange={handleData}
                />
            </label>
            <label> Additional Information: </label>
            <TextField
                name='description'
                multiline
                rowsMax={10}
                helperText={getToolTip(data.category)}
                onChange={handleData}
                />

            <input accept="image/*"
                className={classes.input}
                style={{ display: 'none' }}
                id='add-image'
                name="addImage"
                multiple type="file" 
                onChange={handleFiles}
            />
            <input accept="all/*"
                className={classes.input}
                style={{ display: 'none' }}
                id='add-docs'
                name="addDoc"
                multiple type="file"
                onChange={handleFiles}
            />
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

/*doesnt work right now, was meant to open an image
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
*/

const AssetPics = ({docs, pendingDocs}) => {
    const classes = useStyles();
    console.log('PENDING DOCS', JSON.parse(JSON.stringify(pendingDocs)));
    return (
      <div className={classes.gridList}>
        <GridList cellHeight={300} spacing={1} className={classes.gridList}>
          {docs.map((doc) => (
            <GridListTile cols={2} rows={2} key={doc.id}>
                <a href={doc.url}><img src={doc.url || 'car.jpg'} alt={'document'} /></a>
                <GridListTileBar
                    title={'obama'}
                    titlePosition="top"
                    actionPosition="left"
                    className={classes.titleBar}
                />
            </GridListTile>
          ))}
          {pendingDocs.map((file) => {
              let tempPath = URL.createObjectURL(file);
              return (
                <GridListTile cols={1} rows={1}>
                    <img src={tempPath} alt={'document'} />
                    <GridListTileBar
                        title={file.name}
                        titlePosition="top"
                        actionPosition="left"
                        className={classes.titleBar}
                    />
                </GridListTile>
            )
          })}
        </GridList>
      </div>
    );
  }

const AssetModal = ({assetData, assetDocs, defaultValues, updateAsset, addPendingDocs, uploadPercent}, ref) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [isNew, setIsNew] = useState(true);
    const [data, setData] = useState(assetData);
    const [allDocs, setAllDocs] = useState(assetDocs)
    const [isChanged, setIsChanged] = useState(false);

    const getLocalData = () => {
        return data;
    }
    
    const handleDataChange = e => {
        setIsChanged(true);
        setData({...data, [e.target.name]:e.target.value})
    }
    
    const handleFiles = e => {
        console.log(e.target.files);
        addPendingDocs(e.target.files);
    }

    const handleOpen = (isNewAsset=true) => {
        setIsNew(isNewAsset);
        setOpen(true);
    };

    useImperativeHandle(ref, () => ({
        open(isNewAsset=true) {
            handleOpen(isNewAsset)
        },

        close(isSave=false) {
            handleClose(isSave)
        },
      }));

    const handleClose = (isSave=false) => {
        if (isChanged && !isSave) {
            if(!window.confirm('Do you want to discard your changes?')) return
        }
        setOpen(false);
        setData(defaultValues);
        assetDocs = [];
    };

    const handleSave = () => {
        if (isChanged){
            updateAsset(data, isNew);
        }
    }

    return (
        <div className={classes.root}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.modal}>
                    {uploadPercent ?
                    (
                        <div>{uploadPercent && <p>{uploadPercent}</p>}</div>
                    ) : (
                        <div className={classes.paper}>
                            <div>
                                <AssetInfo getData={getLocalData} handleData={handleDataChange} handleFiles={handleFiles} />
                            </div>
                            <div>
                                <AssetPics docs={assetDocs.docs} pendingDocs={assetDocs.pendingDocs} />
                            </div>
                            <div className={classes.button}>
                            <Button type="button" onClick={()=> {handleClose(false)}}>
                                Cancel
                            </Button>
                            <Button type="submit" onClick={handleSave}>
                                Save
                            </Button>
                            </div>
                        </div>
                    )
                    }
            </Modal>
        </div>
    )
}

export default forwardRef(AssetModal);