import {useState} from "react";
import {FormContainer} from "../Components/FormContainer.jsx";
import {Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {saveShippingAddress} from "../Slices/cartSlice.js";
import CheckoutStepper from "../Components/CheckoutStepper.jsx";


export default function ShippingScreen(){

    const cart=useSelector(state=>state.cart);
    const {shippingAddress}=cart;

    const [address,setAddress]=useState(shippingAddress.address||'');
    const [city,setCity]=useState(shippingAddress.city || '');
    const [postalCode,setPostalCode]=useState(shippingAddress.postalCode ||'');
    const [country,setCountry]=useState(shippingAddress.country ||'');

    const dispatch=useDispatch();
    const navigate=useNavigate();


    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(saveShippingAddress({address,city,postalCode,country}));
        navigate('/payment');
    }

    return <FormContainer>
        <CheckoutStepper step1 step2/>
        <h1>Shipping Page</h1>
        <Form onSubmit={submitHandler}>
             <Form.Group controlId='address' className='my-2'>
                 <Form.Label>Address</Form.Label>
                 <Form.Control
                     type='text'
                     placeholder='Enter Address'
                     value={address}
                     onChange={(e)=>{setAddress(e.target.value)}}
                 >
                 </Form.Control>
             </Form.Group>
            <Form.Group controlId='city' className='my-2'>
                <Form.Label>City</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter City'
                    value={city}
                    onChange={(e)=>{setCity(e.target.value)}}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='postalCode' className='my-2'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Postal Code'
                    value={postalCode}
                    onChange={(e)=>{setPostalCode(e.target.value)}}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='country' className='my-2'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Country'
                    value={country}
                    onChange={(e)=>{setCountry(e.target.value)}}
                >
                </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary' className='my-2'>
                Continue
            </Button>
        </Form>
    </FormContainer>

}
