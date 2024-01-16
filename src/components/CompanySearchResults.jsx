import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import Job from "./Job";
import { useParams, Link } from "react-router-dom";


const CompanySearchResults = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/jobs?company=";

  useEffect(() => {
    const getJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(baseEndpoint + params.company);
        if (response.ok) {
          const { data } = await response.json();
          const uniqueJobs = data.filter((job, index, self) => self.findIndex(j => j._id === job._id) === index);
          setJobs(uniqueJobs);
        } else {
          setError("Error fetching results");
        }
      } catch (error) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (params.company) {
      setJobs([]);
      setLoading(true);
      setError(null);

      getJobs();
    }
  }, [params.company]);

  return (
    <Container>
      <Row>
        <Col className="my-3">
          <h1 className="display-4">Job posting for: {params.company}</h1>
          {loading && <Spinner animation="border" />}
          {error && <Alert variant="danger">{error}</Alert>}
          {!loading && jobs.length === 0 && !error && <p>No jobs found for {params.company}</p>}
          {!loading && jobs.map((jobData, index) => (
            <Job
              key={jobData._id ? `${jobData._id}_${index}` : index}
              data={jobData}
            />
          ))}
          <Link to="/">
            <button className="btn btn-primary">Home</button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default CompanySearchResults;


