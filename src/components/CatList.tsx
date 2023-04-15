import React from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CatCard from './CatCard'

type Props = {
  cats: { id: string, url: string }[]
}

const CatList = ({ cats }: Props) => {
  return (
    <>
      {!cats?.length ? (
        <Col xs={12} style={{ marginBottom: "20px" }}>
          No cats available
        </Col>
      ) : (
        cats?.map(({ id, url }, i) => (
          <Col md={3} sm={6} xs={12} key={i}>
            <CatCard id={id} url={url}/>
          </Col>
        ))
      )}
    </>
  )
}

export default CatList