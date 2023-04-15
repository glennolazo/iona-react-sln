import { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";

import CatList from "../../components/CatList";
import ApiService from "../../service/ApiService";

import "../styles.css";

const findIndex = (array: any, predicate: any) => {
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      return i;
    }
  }
  return -1;
};

const HomePage: React.FC = () => {
  const [isLoading, setIsloading] = useState(false);
  const [cats, setCats] = useState<{ id: string; url: string }[]>([]);
  const [breed, setBreed] = useState("");
  const [hasNext, setHasNext] = useState(false);
  const [page, setPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  // Router Hooks
  const [searchParams] = useSearchParams();
  const { data }: any = useLoaderData();
  const breeds = data as { id: string; name: string }[];
  const searchParam = searchParams.get("breed") || "";

  useEffect(() => {
    loadSelectedBreed(1, searchParam);
    setBreed(searchParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam]);

  const selectBreed = (breed: string) => {
    setBreed(breed);
    setCats([]);
    if (breed) {
      loadSelectedBreed(1, breed);
    }
  };

  const loadSelectedBreed = (page: number, newBreed: string = breed) => {
    setIsloading(true);
    setPage(page);

    const reqParams = {
      page,
      limit: 10,
      breed_id: newBreed,
    };
    ApiService.getAll("/images/search", reqParams)
      .then(({ data }) => {
        const newCats = data.filter(
          (cat: any) => findIndex(cats, ({ id }: any) => id === cat.id) < 0
        );
        setCats((oldCats) => [...oldCats, ...newCats]);
        setHasNext(newCats.length === 0);
        setIsloading(false);
      })
      .catch((err) => {
        setErrorMessage(
          "Apologies but we could not load new cats for you at this time! Miau!"
        );
        console.error(err.message);
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  return (
    <div className="Home">
      <Container>
        <h1>Cat Browser</h1>
        <Row style={{ padding: "10px 0" }}>
          <Col md={3} sm={6} xs={12}>
            <Form>
              <Form.Group controlId="breed">
                <Form.Label>Breed</Form.Label>
                <Form.Select
                  value={breed}
                  onChange={(e) => {
                    selectBreed(e.target.value);
                  }}
                >
                  <option value="">Select breed</option>
                  {breeds.map((breed: any) => (
                    <option key={breed.id} value={breed.id}>
                      {breed.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          {errorMessage && (
            <Col xs={12}>
              <Alert variant="danger">
                <Alert.Heading>An exception occurs!</Alert.Heading>
                <p>{errorMessage}</p>
              </Alert>
            </Col>
          )}
          <CatList cats={cats} />
        </Row>
        {hasNext ? null : (
          <Row style={{ marginTop: "20px" }}>
            <Col md={3} sm={6} xs={12}>
              <Button
                variant="success"
                disabled={!breed || isLoading}
                type="button"
                onClick={() => {
                  loadSelectedBreed(page + 1);
                }}
              >
                {isLoading ? "Loading cats..." : "Load more"}
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default HomePage;
