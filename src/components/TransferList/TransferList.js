import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
        width:"100%",
        margin: 'auto',
    },
    cardHeader: {
        padding: theme.spacing(1, 2),
    },
    list: {
        minWidth: 200,
        maxWidth: 350,
        height: 450,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));

function not(a, b) {
    return a.filter((item) => {
        const test = b.map(function (e) {return e.id; }).indexOf(item.id);
        return test === -1
        // b.indexOf(value.id) === -1)
    });
}

function intersection(a, b) {
    return a.filter((item) => {
        const test = b.map(function (e) { return e.id; }).indexOf(item.id);
        return test !== -1
        // return b.indexOf(item.id) !== -1
    });
}

function union(a, b) {
    return [...a, ...not(b, a)];
}

export default function TransferList(props) {
    const {
        titleLeft, titleRight,
        leftItems, setLeftItems,
        rightItems, setRightItems
    } = props
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const leftChecked = intersection(checked, leftItems);
    const rightChecked = intersection(checked, rightItems);
    //-------------------------------------------------
    const handleToggle = (value) => () => {
        const currentIndex = checked.map(function (e) { return e.id; }).indexOf(value.id);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setRightItems(rightItems.concat(leftChecked));
        setLeftItems(not(leftItems, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeftItems(leftItems.concat(rightChecked));
        setRightItems(not(rightItems, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const checkBoxHandle = (item) => {
        const test = checked.map(function (e) { return e.id; }).indexOf(item.id);
        return test != -1
    }
    const customList = (title, items) => (
        <Card>
            <CardHeader
                className={classes.cardHeader}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                        disabled={items.length === 0}
                        inputProps={{ 'aria-label': 'all items selected' }}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} selected`}
            />
            <Divider />
            <List className={classes.list} dense component="div" role="list">
                {items.map((item) => {
                    const labelId = `transfer-list-all-item-${item.value}-label`;
                    return (
                        <ListItem key={item.id} listid={item.id} role="listitem" button onClick={handleToggle(item)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checkBoxHandle(item)}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${item.value}`} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Card>
    );

    return (
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
            <Grid item>{customList(titleLeft, leftItems)}</Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Grid item>{customList(titleRight, rightItems)}</Grid>
        </Grid>
    );
}
