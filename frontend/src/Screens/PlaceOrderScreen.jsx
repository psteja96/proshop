import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import CheckoutStepper from "../Components/CheckoutStepper.jsx";
import {Button, Col, Image, ListGroup, Row} from "react-bootstrap";
import Message from "../Components/Message.jsx";
import {useCreateOrderMutation} from "../Slices/ordersApiSlice.js";
import Loader from "../Components/Loader.jsx";
import {clearCartItems} from "../Slices/cartSlice.js";
import {toast} from "react-toastify";


export default function PlaceOrderScreen(){
  const navigate=useNavigate();
  const cart=useSelector(state => state.cart);
  const dispatch=useDispatch();
  const [createOrder,{isLoading,error}]=useCreateOrderMutation();

  useEffect(()=>{
      if(!cart.shippingAddress.address){
          navigate('/shipping');
      }else if(!cart.paymentMethod){
          navigate('/payment');
      }
  },[cart.shippingAddress.address,cart.paymentMethod,navigate])

     const placeOrderHandler=async ()=>{
       try {
           const res=await createOrder({
               orderItems:cart.orderItems,
               shippingAddress:cart.shippingAddress,
               paymentMethod:cart.paymentMethod,
               itemsPrice:cart.itemsPrice,
               shippingPrice:cart.shippingPrice,
               taxPrice:cart.taxPrice,
               totalPrice:cart.totalPrice,
           });
     //  console.log(res);
         // navigate(`/order/${res._id}`);
           //dispatch(clearCartItems());
       }catch (e) {
           toast.error(e);
       }
     }

    return <>
        <CheckoutStepper step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address:</strong>
                            {cart.shippingAddress.address},{cart.shippingAddress.city},{cart.shippingAddress.postalCode}
                            ,{cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>payment type:</strong>
                        {cart.paymentMethod}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length===0?(
                            <Message>Your cart is Empty</Message>
                        ):(
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item,index)=>(
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                               <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item._id}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty}* €{item.price}=€{Math.round(item.price*item.qty)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <ListGroup >
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Items: </Col>
                            <Col>€{cart.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping: </Col>
                            <Col>€{cart.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax Price: </Col>
                            <Col>€{cart.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total Price: </Col>
                            <Col>€{cart.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>{error && <Message variant='danger'>{error}</Message>}</ListGroup.Item>
                    <ListGroup.Item>
                        <Button type='button' className='btn-block' disabled={cart.cartItems.length===0
                        }  onClick={placeOrderHandler}>
                            Place Order
                        </Button>
                        {isLoading && <Loader/>}
                    </ListGroup.Item>


                </ListGroup>
            </Col>
        </Row>
    </>
}
