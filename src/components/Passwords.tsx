import React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import { Password } from '../models';
import List from '../atoms/List';
import PasswordListItem from './PasswordListItem';
import classes from './Passwords.module.css';

interface Props {
    editing: boolean;
    passwords: { [key: string]: Password };
    onSelectPassword: (id: string) => void;
}

function Passwords({ editing, passwords, onSelectPassword }: Props) {
    const [highlight, setHighlight] = useState('');

    function renderListItem(password: Password) {
        function handleClick() {
            onSelectPassword(password.id);
            setHighlight(password.id);
        }

        return (
            <PasswordListItem
                key={`PswListItem_${password.name}`}
                name={password.name}
                disabled={editing}
                passID={password.id}
                selected={highlight}
                onclickAction={handleClick}
                vulnerable={password.value.length < 2}
            />
        );
    }

    return <List className={clsx(classes.passwords)}>{Object.values(passwords).map(renderListItem)}</List>;
}

export default Passwords;
