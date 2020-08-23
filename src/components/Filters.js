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
        border: '1px solid grey',
        borderRadius: 'none',
        width: '90%',
        margin: '15px auto 15px auto',
        padding: '10px 20px',
    },
    stickySearch: {
        borderWidth: style => style.borderWidth,
        borderRadius: style => style.borderRadius
    },
    searchDiv: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        marginRight: 'auto',
        padding: '10px 15px',
    },
    searchBar: {
        marginLeft: '10px',
        width: '100%',
    },
    button: {
        margin: '0px 5px',
    },
    active: {
        background: '#d5f5d8',
        '&:hover': {
            background: '#d5f5d8',
        }
    },
    inactive: {
        '&:hover': {
            background: '#d5f5d8',
        }
    },
})

const Filters = ({insuranceTypes, onSearchbarChange, onCategoryChange, categories}) => { 
    
    const [headerSticky, setHeaderSticky] = useState(0)
    const [style, setStyle] = useState()
    const classes = useStyles(style)

    const categoryButtons = insuranceTypes.map(category => {
        return (
        <Button
            startIcon={category.icon}
            //color={categories.includes(category.name) ? 'primary' : 'default'}
            className={`${categories.includes(category.name) ? classes.active : classes.inactive} ${classes.button}`}
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
            setStyle({ borderWidth: '1px 0px 1px 0px', borderRadius: '0px' })
        }
        if (headerSticky === 1) {
            setStyle({ borderWidth: '1px', borderRadius: '5px' })
        }
    }, [headerSticky])

    return (
        <div className={`${classes.stickySearch} ${classes.filters}`}>
            <div className={classes.searchDiv}>
                <SearchIcon />
                <Input
                    onChange={onSearchbarChange}
                    disableUnderline={true}
                    placeholder='Search'
                    className={classes.searchBar}
                />
            </div>
            <div>
                {categoryButtons}
            </div>
        </div>
    )
}

export default Filters