import {Link, useNavigate, useParams} from "react-router-dom";
//import products from "../../public/products.js";
import {Button, Card, Col, Form, Image, ListGroup, Row} from "react-bootstrap";
import Ratings from "../Components/Ratings.jsx";
import {useState} from "react";

import {useGetProductDetailsQuery} from "../Slices/ProductsapiSlice.js";

import Loader from "../Components/Loader.jsx";
import Message from "../Components/Message.jsx";
import {useDispatch} from "react-redux";
import {addToCart} from "../Slices/cartSlice.js";

export default function ProductScreen() {
    const {id: productId} = useParams();
    const [qty,setQty]=useState(1);
    const dispatch=useDispatch();
    const navigate=useNavigate();


  const {data:product,isLoading,error}=useGetProductDetailsQuery(productId);

    const addToCarthandler=()=>{
        dispatch(addToCart({...product,qty}));
        navigate('/cart');
    };

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
                      {product?.countInStock>0 &&(
                          <ListGroup.Item>
                            <Row>
                                <Col>
                                    Qty
                                </Col>
                                <Col>
                                    <Form.Control
                                    as="select"
                                    value={qty}
                                    onChange={(e)=>setQty(Number(e.target.value))}
                                    >
                                        {[...Array(product.countInStock).keys()].map((x)=>

                                            (<option key={x+1} value={x+1}>
                                                {x+1}
                                            </option>)

                                        )}
                                    </Form.Control>
                                </Col>
                            </Row>
                          </ListGroup.Item>
                      )}
                      <ListGroup.Item>
                          <Button className="btn-block" type="button"
                                  disabled={product?.countInStock === 0}
                          onClick={addToCarthandler}>
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
            <Loader/>
        ):error?(
            <Message variant='danger'>{error?.data?.message||error.error}</Message>
        ):(
            productRender
        )}

    </div>


}
