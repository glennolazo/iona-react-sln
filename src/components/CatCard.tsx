import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

type Props = {
    id: string,
    url: string
}

const CatCard: React.FC<Props> = ({ id, url }) => {
  return (
    <Card>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Link className="btn btn-primary btn-block" to={`/cat/${id}`}>
          View details
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CatCard;
