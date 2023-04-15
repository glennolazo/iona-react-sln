import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import "../styles.css";

const SingleCatPage = () => {
  const { data }: any = useLoaderData();
  const cat = data as { breeds: any[]; id: string; url: string; width: string };
  const breed = cat.breeds[0];

  return (
    <div className="Cat">
      <Container>
        <Card>
          <Card.Header>
            <Link className="btn btn-primary" to={`/?breed=${breed.id}`}>
              Back
            </Link>
          </Card.Header>
          <Card.Img src={cat.url} />
          <Card.Body>
            <h4>{breed.name}</h4>
            <h5>Origin: {breed.origin}</h5>
            <h6>{breed.temperament}</h6>
            <p>{breed.description}</p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default SingleCatPage;
