import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import Fab from '@material-ui/core/Fab'
import PublishIcon from '@material-ui/icons/Publish'

import CategorySelect from './forms/CategorySelect'
import ProviderSelect from './forms/ProviderSelect'
import AssetReviewList from './AssetReviewList'


const useStyles = makeStyles({
    modal: {
        position: 'absolute',
        width: '80vw',
        height: '80vh',
        top: '50%',
        left: '50%',
        marginTop: '-40vh',
        marginLeft: '-40vw',
        backgroundColor: 'white',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.6fr',
        gridTemplateRows: '0.3fr 2.4fr 0.3fr',
        gap: '1px 1px',
        gridTemplateAreas: `
            'claim-header asset-list-header' 
            'form asset-list' 
            'form-footer submit' 
        `
    },
    claimHeader: {
        gridArea: 'claim-header',
        padding: '0 25px'
    },
    form: {
        gridArea: 'form',
        padding: '5px 25px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly' 
    },
    formFooter: {
        gridArea: 'form-footer',
        padding: '5px 25px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignContent: 'center'
    },
    pickers: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    assetListHeader: {
        gridArea: 'asset-list-header',
        paddingRight: '15px'
    },
    assetList: {
        gridArea: 'asset-list',
        paddingRight: '15px',
    },
    submit: {
        gridArea: 'submit',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: '30px 35px'
    },
    templatedTextColour: {
        color: '#4287f5'
    },
    subheading: {
        paddingLeft: '45px'
    },
    datetime: {
        width: '40%', 
        margin: '5px'
    },
    textArea: {
        padding: '5px 0px'
    }
})

const SubmitModal = ({open, onClose, selectedCards}) => { 
    const [category, setCategory] = useState('Property')
    const [provider, setProvider] = useState('Intact')
    const [accountInfo, setAccountInfo] = useState('')
    const [policyInfo, setPolicyInfo] = useState('')
    const [dateInfo, setDateInfo] = useState(new Date())
    const [additionalInfo, setAdditionalInfo] = useState('')

    const classes = useStyles()

    const onCategorySelectChange = e => setCategory(e.target.value)
    const onProviderSelectChange = e => setProvider(e.target.value)
    const onAccountInfoChange = e => setAccountInfo(e.target.value)
    const onPolicyInfoChange = e => setPolicyInfo(e.target.value)
    const onDateInfoChange = d => setDateInfo(d)
    const onAdditionalInfoChange = e => setAdditionalInfo(e.target.value)

    return (
        <Modal open={open} onClose={onClose}>
            <div className={classes.modal}>
                <div className={classes.claimHeader}>
                    <h1>
                        We think you're submitting a 
                        <span className={classes.templatedTextColour}>{` ${category} `}</span> 
                        claim for
                        <span className={classes.templatedTextColour}>{` ${provider}.`}</span> 
                    </h1>
                </div>


                <div className={classes.form}>
                    <h2 className={classes.subheading}>
                        Personal Details:
                    </h2>

                    <TextField
                        className={classes.textArea}
                        multiline
                        label='Account Information'
                        value={accountInfo}
                        onChange={onAccountInfoChange}
                        variant='outlined'
                        fullWidth
                        required
                        rows={3}
                    />
                    <TextField
                        multiline
                        className={classes.textArea}
                        label='Policy Information'
                        value={policyInfo}
                        onChange={onPolicyInfoChange}
                        variant='outlined'
                        fullWidth
                        required
                        rows={3}
                    />

                    <h2 className={classes.subheading}>
                        Incident Details:
                    </h2>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <div className={classes.pickers}>
                            <KeyboardDatePicker
                                className={classes.datetime}
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                label="Incident Date"
                                value={dateInfo}
                                onChange={onDateInfoChange}
                                />
                            <KeyboardTimePicker
                                className={classes.datetime}
                                margin="normal"
                                variant="inline"
                                label="Approximate Incident Time"
                                value={dateInfo}
                                onChange={onDateInfoChange}
                            />
                        </div>
                    </MuiPickersUtilsProvider>
                    <TextField
                        multiline
                        className={classes.textArea}
                        label='Additional Info'
                        value={additionalInfo}
                        onChange={onAdditionalInfoChange}
                        variant='outlined'
                        fullWidth
                        required
                        rows={3}
                    />
                </div>

                <div className={classes.formFooter}>
                    <h3>Not what you expected? Use these dropdowns!</h3>
                    <CategorySelect  category={category} onCategorySelectChange={onCategorySelectChange} />
                    <ProviderSelect className={classes.select} provider={provider} onProviderSelectChange={onProviderSelectChange} /> 
                </div>

                <div className={classes.assetListHeader}> 
                    <h1>
                        Heres what you're submitting
                    </h1>
                </div>

                <div className={classes.assetList}> 
                    <AssetReviewList selectedCards={selectedCards} />
                </div>

                <div className={classes.submit}> 
                    <Fab color="primary" variant='extended'>
                        <PublishIcon />
                        Submit
                    </Fab>
                </div>
            </div>
        </Modal>
    )
}

export default SubmitModal