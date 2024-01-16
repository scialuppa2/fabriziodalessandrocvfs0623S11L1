import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchResults } from "../redux/reducers/actions";
import Job from "./Job";

const MainSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.favorites.searchResults);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleNavigateToFavorites = () => {
    navigate("/favorites");
  };

  const handleFavorite = (job, operation) => {
    dispatch({
      type: "FAVORITE_OPERATION",
      payload: { job, operation },
    });
  };

  const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/jobs?search=";

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(baseEndpoint + query + "&limit=20");
      if (response.ok) {
        const { data } = await response.json();
        dispatch(setSearchResults(data));
      } else {
        setError("Error fetching results");
      }
    } catch (error) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={10} className="mx-auto my-3">
          <h1 className="display-1">Remote Jobs Search</h1>
        </Col>
        <Col xs={10} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Control type="search" value={query} onChange={handleChange} placeholder="type and press Enter" />
          </Form>
        </Col>
        <Col xs={10} className="mx-auto mb-5">
          <Button variant="outline-dark" onClick={handleNavigateToFavorites}>
            Go to Favorites
          </Button>
          {loading && <Spinner animation="border" className="ml-2" />}
          {error && <Alert variant="danger" className="ml-2">{error}</Alert>}
          {!loading && searchResults.length === 0 && <p>No jobs found for "{query}"</p>}
          {searchResults.map((jobData, index) => (
            <Job
              key={jobData._id ? `${jobData._id}_${index}` : index}
              data={jobData}
              handleFavorite={(operation) => handleFavorite(jobData, operation)}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default MainSearch;
