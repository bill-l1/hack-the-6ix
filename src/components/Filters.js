import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import SearchIcon from '@material-ui/icons/Search';

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
        width: '90%',
        margin: '15px auto 15px auto',
        padding: '10px 20px',
    },
    stickySearch: {
        border: style => style.border,
    },
    searchDiv: {
        width: '40%',
        display: 'flex',
        alignItems: 'center',
        marginRight: 'auto',
        padding: '10px 15px',
        //background: '#f2f2f2',
    },
    searchBar: {
        marginLeft: '10px',
        width: '100%'
    }
})

const Filters = ({insuranceTypes, onSearchbarChange, onCategoryChange, categories}) => { 
    
    const [headerSticky, setHeaderSticky] = useState(0)
    const [style, setStyle] = useState()
    const classes = useStyles(style)

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

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 48) {
                setHeaderSticky(1)
            } else {
                setHeaderSticky(0)
            }
        })
    })

    useEffect(() => {
        if (headerSticky === 0) {
            setStyle({ border: 'none' })
        }
        if (headerSticky === 1) {
            setStyle({ border: '1px solid black' })
        }
    }, [headerSticky])

    return (
        <div className={`${classes.filters} ${classes.stickySearch}`}>
            <div className={classes.searchDiv}>
                <SearchIcon />
                <Input
                    onChange={onSearchbarChange}
                    disableUnderline={true}
                    placeholder='Search'
                    className={classes.searchBar}
                />
            </div>
            {categoryButtons}
        </div>
    )
}

export default Filters