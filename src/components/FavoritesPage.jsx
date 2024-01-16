import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import Job from "./Job";

const FavoritesPage = () => {
    const favorites = useSelector((state) => state.favorites.favorites);

    return (
        <Container>
            <Row>
                <Col className="my-3">
                    <h1 className="display-4">Favorite Jobs</h1>
                    {favorites.length === 0 ? (
                        <Alert variant="info">No favorite jobs yet. Add some from the home page.</Alert>
                    ) : (
                        favorites.map((jobData, index) => (
                            <Job
                                key={jobData._id ? `${jobData._id}_${index}` : index}
                                data={jobData}
                            />
                        ))
                    )}
                    <Link to="/">
                        <button className="btn btn-primary">Home</button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default FavoritesPage;
