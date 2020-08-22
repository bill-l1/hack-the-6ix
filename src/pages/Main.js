import React, { useState, useEffect  } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import {withFirebase} from '../components/Firebase'

import AssetList from '../components/AssetList'
import Header from '../components/Header'
import Searchbar from '../components/Searchbar'


const useStyles = makeStyles({
    filters: {
        padding: '20px 5px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const Main = (props) => { 
    const [filters, setFilters] = useState([])
    const [search, setSearch] = useState('')

    const classes = useStyles()

    const onSearchbarChange = async (e) => {
        setSearch(e.target.value)
    }

    return (
        <>
            <Header />

            <div className={classes.filters}>
                <Searchbar onChange={onSearchbarChange} />
                <p>Filters Go Here</p>
            </div>

            <AssetList firebase={props.firebase }search={search} filters={filters}/>
        </>
    )
}

export default withFirebase(Main);