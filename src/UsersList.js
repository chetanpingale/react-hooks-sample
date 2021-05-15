import React, { useState, useEffect } from "react";
import axios from "axios";
import {Col, Container, Row, Button, Modal} from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import UsersTable from "./UsersTable";

const UsersList = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [showUserPopup, setShowUserPopup] = useState(false);

    const [newUserFirstName, setNewUserFirstName] = useState('');
    const [newUserLastName, setNewUserLastName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserPhone, setNewUserPhone] = useState('');
    const [newUserAddress, setNewUserAddress] = useState('');

    const fetchUsers = () =>{
        axios.get(`http://localhost:7000/users`)
            .then(res => {
                const users = res.data.users;
                setUsers(users);
            })
    };

    const handleUserClick = (user) => {
        setSelectedUser(user)
    };

    const onAddUser = (event) => {
        event.preventDefault();
        const userObj = {
            first_name: newUserFirstName,
            last_name: newUserLastName,
            address: newUserAddress,
            email: newUserEmail,
            phone: newUserPhone
        }
        axios.post(`http://localhost:7000/user/add`, userObj)
            .then(res => {

                setShowUserPopup(false);
                setNewUserFirstName('');
                setNewUserLastName('');
                setNewUserPhone('');
                setNewUserEmail('');
                setNewUserAddress('');

                fetchUsers();
            }).catch(error => {
            console.log(error);
        });
    };

    const handleUserClose = (user) => {
        setShowUserPopup(false)
    };

    const handleBackClick = () =>{
        setSelectedUser(null);
    };

    const onAddClick = (event) =>{
        event.preventDefault();
        setShowUserPopup(true);
    };

    const handleInputChange = (event, state) => {
        event.preventDefault();
        const value = event.currentTarget.value
        if(state === 'firstName') {
            setNewUserFirstName(value);
        } else if(state === 'lastName') {
            setNewUserLastName(value);
        } else if(state === 'email') {
            setNewUserEmail(value);
        } else if(state === 'phone') {
            setNewUserPhone(value);
        } else if(state === 'address') {
            setNewUserAddress(value);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <Container className='user-container'>
            <h4 className='header-title'>{selectedUser ? 'User Details': 'Users List'}</h4>
            <Button onClick={(event) => onAddClick(event)} variant='primary'>
                Add User
            </Button>
            {
                selectedUser
                    ?
                    <>
                        <Row>
                            <Col><strong>ID</strong></Col>
                            <Col><strong>Email</strong></Col>
                            <Col><strong>First Name</strong></Col>
                            <Col><strong>Last Name</strong></Col>
                        </Row>
                        <Row>
                            <Col>{selectedUser.id}</Col>
                            <Col>{selectedUser.email}</Col>
                            <Col>{selectedUser.first_name}</Col>
                            <Col>{selectedUser.last_name}</Col>
                        </Row>
                        <Row>
                            <Col>
                                <a href='#' onClick={handleBackClick} className='back-link'>back</a>
                            </Col>
                        </Row>
                    </>
                    : <UsersTable users={users} getUsers={fetchUsers}/>
            }
            <Modal show={showUserPopup} onHide={handleUserClose} className='app-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className='add-user-row'>
                        <Col md={6}>
                            First Name
                        </Col>
                        <Col md={6}>
                            <input type='text' value={newUserFirstName} onChange={(event) => handleInputChange(event, 'firstName')} />
                        </Col>
                    </Row>
                    <Row className='add-user-row'>
                        <Col md={6}>
                            Last Name
                        </Col>
                        <Col md={6}>
                            <input type='text' value={newUserLastName} onChange={(event) => handleInputChange(event, 'lastName')} />
                        </Col>
                    </Row>
                    <Row className='add-user-row'>
                        <Col md={6}>
                            Email
                        </Col>
                        <Col md={6}>
                            <input type='text' value={newUserEmail} onChange={(event) => handleInputChange(event, 'email')} />
                        </Col>
                    </Row>
                    <Row className='add-user-row'>
                        <Col md={6}>
                            Phone
                        </Col>
                        <Col md={6}>
                            <input type='text' value={newUserPhone} onChange={(event) => handleInputChange(event, 'phone')} />
                        </Col>
                    </Row>
                    <Row className='add-user-row'>
                        <Col md={6}>
                            Address
                        </Col>
                        <Col md={6}>
                            <input type='text' value={newUserAddress} onChange={(event) => handleInputChange(event, 'address')} />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleUserClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={(event) => onAddUser(event)}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
};
export default UsersList;