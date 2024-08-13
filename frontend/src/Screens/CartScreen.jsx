import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Form, Image, ListGroup, Row} from "react-bootstrap";
import Message from "../Components/Message.jsx";
import {FaTrash} from "react-icons/fa";
import {addToCart, removeFromCart} from "../Slices/cartSlice.js";


export default function CartScreen(){

    const navigate=useNavigate();
    const dispatch=useDispatch();

    const cart=useSelector((state)=>state.cart);
    const {cartItems}=cart;
    const addToCartHandler=async (product,qty)=>{
        dispatch(addToCart({...product,qty}))
    }
    const removeFromCartHandler=async (id)=>{
        dispatch(removeFromCart(id));
    }
    const checkOutHandler=()=>{
        navigate('/login?redirect=/shipping');
    }
    return <Row>
  <Col md={8}>
      <h1> Shopping Cart </h1>
      {cartItems.length===0?(
          <Message>
              Your Cart is empty <Link to="/">Go Back</Link>
          </Message>
      ):(
          <ListGroup variant="flush">
              {cartItems.map((data)=>(
                  <ListGroup.Item key={data._id}>
                  <Row>
                      <Col md={2}>
                            <Image alt={data.name} src={data.image} fluid rounded/>

                      </Col>
                      <Col md={3}>
                          <Link to={`/products/${data._id}`}>{data.name}</Link>
                      </Col>
                      <Col md={3}>
                          ${data.price}
                      </Col>
                      <Col md={2}>
                          <Form.Control
                              as="select"
                              value={data.qty}
                                onChange={(e)=>addToCartHandler(data,Number(e.target.value))}
                          >
                              {[...Array(data.countInStock).keys()].map((x)=>

                                  (<option key={x+1} value={x+1}>
                                      {x+1}
                                  </option>)

                              )}
                          </Form.Control>
                      </Col>
                      <Col md={2}>
                          <Button onClick={()=>removeFromCartHandler(data._id)} type='button' variant='light'>
                            <FaTrash/>
                          </Button>
                      </Col>
                  </Row>
                  </ListGroup.Item>
              ))}
          </ListGroup>
      )}
  </Col>
        <Col md={4}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Sub Total ({cartItems.reduce((acc,item)=>acc+item.qty,0)}) Items </h2>
                    ${cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button  type="button" className='btn-block'
                             disabled={cartItems.length===0}
                    onClick={checkOutHandler}>
                        Proceed to Check Out
                    </Button>
                </ListGroup.Item>
            </ListGroup>
        </Col>
    </Row>
}
