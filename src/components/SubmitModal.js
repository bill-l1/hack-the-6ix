import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'

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
        gridTemplateColumns: '1.4fr 0.6fr',
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
        gridArea: 'form'
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
    assetListHeader: {
        gridArea: 'asset-list-header'
    },
    assetList: {
        gridArea: 'asset-list'  
    },
    submit: {
        gridArea: 'submit'
    },
    templatedTextColour: {
        color: '#4287f5'
    },
    subheading: {
        paddingLeft: '45px'
    }
})

const SubmitModal = ({open, onClose, selectedCardIds}) => { 
    const [category, setCategory] = useState('Property')
    const [provider, setProvider] = useState('Intact')

    const classes = useStyles()

    const onCategorySelectChange = e => {
        setCategory(e.target.value)
    }

    const onProviderSelectChange = e => {
        setProvider(e.target.value)
    }

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
                    
                    
                </div>

                <div className={classes.formFooter}>
                    <h3>Not what you expected? Use these dropdowns!</h3>
                    <CategorySelect  category={category} onCategorySelectChange={onCategorySelectChange} />
                    <ProviderSelect className={classes.select} provider={provider} onProviderSelectChange={onProviderSelectChange} /> 
                </div>

                <div className={classes.assetListHeader}> 
                    <h1>
                        These are the assets you will be submitting
                    </h1>
                </div>

                <div className={classes.assetList}> 
                    <AssetReviewList selectedCardIds={selectedCardIds} />
                </div>

                <div className={classes.submit}> 
                    submit
                </div>
            </div>
        </Modal>
    )
}

export default SubmitModal