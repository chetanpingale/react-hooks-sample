import React, { useState, useEffect } from "react";
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const UsersList = () => {
    const [selectedUser, setSelectedUser] = useState(false);
    const [users, setUsers] = useState([]);

    const fetchUsers = () =>{
        axios.get(`https://reqres.in/api/users?per_page=12`)
            .then(res => {
                const users = res.data.data;
                setUsers(users);
            })
    };

    const handleUserClick = (user) => {
        setSelectedUser(user)
    };

    const handleBackClick = () =>{
        setSelectedUser(null);
    };

    useEffect(() => {
        fetchUsers();
    });



    return (
        <Container className='user-container'>
            <h4 className='header-title'>{selectedUser ? 'User Details': 'Users List'}</h4>
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
                    : <Row>
                        { users.map(person => {
                            return (
                                <Col md={3}>
                                    <img onClick={() => handleUserClick(person)} className='user-avatar' src={person.avatar}/>
                                </Col>
                            )
                        })}
                    </Row>
            }

        </Container>
    );
};
export default UsersList;