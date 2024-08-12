import {Link, useParams} from "react-router-dom";
//import products from "../../public/products.js";
import {Button, Card, Col, Image, ListGroup, Row} from "react-bootstrap";
import Ratings from "../Components/Ratings.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useGetProductDetailsQuery} from "../Slices/ProductsapiSlice.js";
import Products from "../Components/Products.jsx";

export default function ProductScreen() {
    const {id: productId} = useParams();
  //  const [product,setProduct]=useState([]);

  const {data:product,isLoading,error}=useGetProductDetailsQuery(productId);

  const productRender=(
      <Row>
          <Col md={5}>
              <Image src={product?.image} alt={product?.name} fluid/>
          </Col>
          <Col md={4}>
              <ListGroup variant='flush'>
                  <ListGroup.Item>
                      <h3>{product?.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <Ratings value={product?.ratings} text={`${product?.numReviews} Reviews`}/>
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <h3>Price: €{product?.price}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <h3>Description: {product?.description}</h3>
                  </ListGroup.Item>
              </ListGroup>
          </Col>
          <Col md={3}>
              <Card>
                  <ListGroup variant="flush">
                      <ListGroup.Item>
                          <Row>
                              <Col>Price:</Col>
                              <Col><strong>€{product?.price}</strong></Col>
                          </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                          <Row>
                              <Col>Status:</Col>
                              <Col><strong>{product?.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong></Col>
                          </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                          <Button className="btn-block" type="button"
                                  disabled={product?.countInStock === 0}>
                              Add To Cart
                          </Button>
                      </ListGroup.Item>
                  </ListGroup>
              </Card>
          </Col>
      </Row>
  )
    return <div>
        <h1>ProductScreen</h1>
        <Link className="btn btn-light my-3" to="/">
            Go Back
        </Link>

        {isLoading?(
            <h2>isLoading...</h2>
        ):error?(
            <div>{error?.data?.message || error.error()}</div>
        ):(
            productRender
        )}

    </div>


}
