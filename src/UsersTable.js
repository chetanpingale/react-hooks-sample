import React, {useState, useEffect} from 'react';
import  axios from 'axios';
import {Col, Row, Modal, Button} from "react-bootstrap";
import EditIcon from "./icons/editIcon";
import DeleteIcon from "./icons/deleteIcon";

const UsersTable = (props) => {
    const {users} = props;
    const [isEdit, setEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [show, setShow] = useState(false);
    const [showDetail, setShowDetail] = useState(false);

    const handleYes = (event) => {
        const {id} = selectedUser;
        event.preventDefault();
        axios.post(`http://localhost:7000/user/delete`, {userId: id})
            .then(res => {
                debugger
                setShow(false);
                setSelectedUser(null);
            }).catch(error => {
            console.log(error);
        });
    }
    const handleClose = () => setShow(false);
    const handleDetailClose = () => setShowDetail(false);

    const handleDelete = (event, user) => {
        event.preventDefault();
        setSelectedUser(user);
        setShow(true);
    }
    const handleEdit = (event, id) => {
        event.preventDefault();
        const user = users.find(p => p.id === id);
        setEdit(true);
        setSelectedUser(user)
    }
    const handleFirstNameChange = (event) => {
        event.preventDefault();
        const value = event.currentTarget.value
        const _selectedUser = JSON.parse(JSON.stringify(selectedUser));
        _selectedUser.first_name = value;
        setSelectedUser(_selectedUser);
    }

    const handleLastNameChange = (event) => {
        event.preventDefault();
        const value = event.currentTarget.value
        const _selectedUser = JSON.parse(JSON.stringify(selectedUser));
        _selectedUser.last_name = value;
        setSelectedUser(_selectedUser);
    }

    const handleEmailChange = (event) => {
        event.preventDefault();
        const value = event.currentTarget.value
        const _selectedUser = JSON.parse(JSON.stringify(selectedUser));
        _selectedUser.email = value;
        setSelectedUser(_selectedUser);
    }
    const handleSave = () => {
        debugger
        axios.post(`http://localhost:7000/user/edit`, selectedUser)
            .then(res => {
                debugger
                setEdit(false);
                selectedUser(null);
            }).catch(error => {
                console.log(error);
            });
    }

    const showDetailModal = (event, user) => {
        event.preventDefault();
        setSelectedUser(user)
        setShowDetail(true);

    }
    useEffect(() => {
        props.getUsers();
    }, [isEdit, show]);

    if(isEdit && selectedUser) {
        const {first_name, last_name, email} = selectedUser;
        return (
            <div>
                <div>
                    <Row>
                        <Col md={3}>First Name</Col>
                        <Col md={3}>Last Name</Col>
                        <Col md={3}>Email</Col>

                    </Row>
                    <Row>
                        <Col md={3}><input type='text' value={first_name} onChange={handleFirstNameChange}/></Col>
                        <Col md={3}><input type='text' value={last_name} onChange={handleLastNameChange}/></Col>
                        <Col md={3}><input type='text' value={email} onChange={handleEmailChange}/></Col>
                        <Col md={3}><button onClick={handleSave}>Save</button></Col>
                    </Row>
                </div>
            </div>

        )
    }
    return (
        <>
            <Row>
                <Col md={2}>
                    ID
                </Col>
                <Col md={2}>
                    First Name
                </Col>
                <Col md={2}>
                    Last Name
                </Col>
                <Col md={2}>
                    Email
                </Col>
                <Col md={2}>
                    Action
                </Col>
                <Col md={2}>
                    Details
                </Col>
            </Row>
            {users.map(person => {
                return (
                    <Row>
                        <Col md={2}>
                            {person.id}
                        </Col>
                        <Col md={2}>
                            {person.first_name}
                        </Col>
                        <Col md={2}>
                            {person.last_name}
                        </Col>
                        <Col md={2}>
                            {person.email}
                        </Col>
                        <Col md={2}>
                            <EditIcon onClick={(event) => handleEdit(event, person.id)}/>
                            <DeleteIcon onClick={(event) => handleDelete(event, person)}/>
                        </Col>
                        <Col md={2}>
                            <a href='#' className='app-link' onClick={(event) => showDetailModal(event, person)}>Show Details</a>
                        </Col>
                    </Row>
                )
            })}
            <Modal show={show} onHide={handleClose} className='app-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to delete</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={(event) => handleYes(event)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
            {
                selectedUser && showDetail
                    ? <Modal show={showDetail} onHide={handleDetailClose} className='app-modal'>
                        <Modal.Header closeButton>
                            <Modal.Title>User Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col md={4}>First Name</Col>
                                <Col md={4}>{selectedUser.first_name}</Col>
                            </Row>
                            <Row>
                                <Col md={4}>Last Name</Col>
                                <Col md={4}>{selectedUser.last_name}</Col>
                            </Row>
                            <Row>
                                <Col md={4}>Email</Col>
                                <Col md={4}>{selectedUser.email}</Col>
                            </Row>
                            <Row>
                                <Col md={4}>Address</Col>
                                <Col md={4}>{selectedUser.address}</Col>
                            </Row>
                            <Row>
                                <Col md={4}>Phone Number</Col>
                                <Col md={4}>{selectedUser.phone}</Col>
                            </Row>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleDetailClose}>
                                close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    : null
            }

        </>
    )

}

export default UsersTable;