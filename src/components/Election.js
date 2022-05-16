import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom"
import { Card, Col, Badge, Stack } from "react-bootstrap";

export default function Election({ electionId, election }){
  const { id, position, description, votes, owner, candidates, scores } =
    election;

  

  return (
    <div> 
    <Col key={id}>
      <Card className=" h-100">
        <Card.Header>
          <Stack direction="horizontal" gap={2}>
            <span className="font-monospace text-secondary">{owner}</span>
            <Badge bg="secondary" className="ms-auto">
              {votes} votes
            </Badge>
          </Stack>
        </Card.Header>
        <Card.Body className="d-flex  flex-column text-center">
          <Card.Title>{position}</Card.Title>
          <Card.Text className="flex-grow-1 ">{description}</Card.Text>
          <Link to={`election/${electionId}`} state={{id}}>View Election</Link>
        </Card.Body>
      </Card>
    </Col>
    </div>
  );
};

Election.propTypes = {
  election: PropTypes.instanceOf(Object).isRequired,
};