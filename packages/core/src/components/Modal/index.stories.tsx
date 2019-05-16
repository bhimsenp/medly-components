import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Button from '../Button';
import Input from '../Input';
import Select from '../Select';
import Modal from './Modal';

storiesOf('Core', module).add(
    'Modal',
    () => (
        <Modal open={boolean('Open', true)} onCloseModal={action('Close Clicked')}>
            <Modal.Header>Add User</Modal.Header>
            <Modal.Content>
                <Select fullWidth label="Role">
                    <option value="0">Admin</option>
                    <option value="1">Pharmacist</option>
                    <option value="2">Covered Entity</option>
                </Select>
                <Input type="text" fullWidth label="Name" placeholder="Enter your Name" />
                <Input
                    type="email"
                    fullWidth
                    required
                    label="Email Address"
                    placeholder="Enter Email Address"
                    description="We will never share your email with anyone"
                />
                <Input type="password" fullWidth required label="New Password" placeholder="Enter New Password" />
                <Input type="password" fullWidth required label="Confirm Password" placeholder="Enter Confirm Password" />
                <Input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" fullWidth label="Contact no." placeholder="Enter your Contactno." />
            </Modal.Content>
            <Modal.Actions>
                <Button variant="outlined">Add User</Button>
            </Modal.Actions>
        </Modal>
    ),
    {
        props: {
            propTablesExclude: [Button, Input, Select, Modal.Header, Modal.Content, Modal.Actions]
        }
    }
);