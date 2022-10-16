import React from 'react';
import Icon from '../atoms/Icon';

import ListItem from '../atoms/ListItem';
import classes from './PasswordListItem.module.css';

interface PasswordListItemProps {
    name: string;
    disabled: boolean;
    onclickAction: () => void;
    vulnerable: boolean;
    selected: string;
    passID: string;
}

function PasswordListItem({ name, vulnerable, onclickAction, passID, selected, ...rest }: PasswordListItemProps) {
    return (
        <ListItem
            clickable
            className={classes.listItem}
            {...rest}
            style={passID === selected ? { backgroundColor: 'lightblue' } : {}}
            onClick={onclickAction}
        >
            {name}
            {vulnerable && <Icon size="small" className="fas fa-exclamation-triangle" />}
        </ListItem>
    );
}

export default React.memo(PasswordListItem);
