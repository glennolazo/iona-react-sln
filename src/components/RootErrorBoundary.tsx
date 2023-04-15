import React from 'react'
import { Container, Row } from 'react-bootstrap'

const RootErrorBoundary = () => {
  return (
    <Container>
        <Row style={{ padding: "10px 0" }}>
          <h1>Page not found!</h1>
        </Row>
    </Container>
  )
}

export default RootErrorBoundary