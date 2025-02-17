import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col, Spinner, Alert } from 'react-bootstrap'; // Assuming you're using react-bootstrap for UI components

const ViewChildren = () => {
    const [children, setChildren] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Assuming the parent token is stored in localStorage
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            fetchChildren();
        } else {
            setError('No valid token found');
        }
    }, [token]);

    const fetchChildren = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:8080/view-children', {
                headers: { token: token },
            });
            setChildren(response.data.children);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching children:', err);
            setError('Error fetching children details');
            setLoading(false);
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Your Children Details</h2>
            
            {error && <Alert variant="danger">{error}</Alert>}
            
            {loading ? (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <Row>
                    {children.length > 0 ? (
                        children.map((child) => (
                            <Col key={child.childid} sm={12} md={6} lg={4} className="mb-4">
                                <Card className="shadow-sm">
                                    <Card.Body>
                                        <Card.Title>{child.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{child.gender}</Card.Subtitle>
                                        <Card.Text>
                                            <strong>Birthdate:</strong> {new Date(child.dob).toLocaleDateString()}<br />
                                            <strong>Blood Group:</strong> {child.bloodgroup}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Alert variant="info">No children found.</Alert>
                    )}
                </Row>
            )}
        </Container>
    );
};

export default ViewChildren;
