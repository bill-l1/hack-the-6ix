import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import HomeIcon from '@material-ui/icons/Home'


const useStyles = makeStyles({
    filters: {
        padding: '20px 5px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchbar: {
        width: '30%'
    }
})

const Filters = ({categoryNames, onSearchbarChange, onCategoryChange, categories}) => { 
    const classes = useStyles()

    const categoryButtons = categoryNames.map(category => {
        return (
        <Button
            startIcon={<HomeIcon />}
            color={categories.includes(category) ? 'primary' : 'default'}
            onClick={() => onCategoryChange(category)}
        >
            {category}
        </Button>
    )})

    return (
        <div className={classes.filters}>
            <TextField 
                className={classes.searchbar}
                label='Search'
                variant='outlined'
                onChange={onSearchbarChange}
            />
            {categoryButtons}
        </div>
    )
}

export default Filters