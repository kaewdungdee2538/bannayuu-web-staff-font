import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from './ButtonSearchStyle';


function ButtonSearch(props) {
    const { placeholder, searchFunc } = props
    const classes = useStyles();
    const [text, setText] = useState("");
    function onSearchClick(e) {
        e.preventDefault();
        searchFunc(text);
    }

    return (
        <Paper component="form" className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder={placeholder}
                inputProps={
                    {
                        'aria-label': {placeholder},
                        onChange: event => setText(event.target.value)
                    }}

            />
            <IconButton type="submit"
                className={classes.iconButton}
                aria-label="search"
                onClick={onSearchClick}
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}
export default ButtonSearch;