import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'


const useStyles = makeStyles({
    filters: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'sticky',
        zIndex: 1,
        top: '30px', 
        background: '#fff',
        border: '1px solid black',
        borderRadius: '5px',
        width: '80%',
        margin: '15px auto 15px auto',
        padding: '5px 20px',
    },
    searchbar: {
        width: '30%'
    }
})

const Filters = ({insuranceTypes, onSearchbarChange, onCategoryChange, categories}) => { 
    const classes = useStyles()

    const categoryButtons = insuranceTypes.map(category => {
        return (
        <Button
            startIcon={category.icon}
            color={categories.includes(category.name) ? 'primary' : 'default'}
            onClick={() => onCategoryChange(category.name)}
        >
            {category.name}
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