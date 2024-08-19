import {useEffect, useState} from "react";
import {FormContainer} from "../Components/FormContainer.jsx";
import CheckoutStepper from "../Components/CheckoutStepper.jsx";
import {Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {savePaymentMethod} from "../Slices/cartSlice.js";


export default function PaymentScreen(){
    const [payment,setPayment]=useState('Paypal');

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const cart=useSelector(state => state.cart);
    const {shippingAddress}=cart;
    useEffect(()=>{
        if(!shippingAddress){
            navigate('/shipping');
        }
    },[shippingAddress,navigate]);

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(savePaymentMethod(payment));
        navigate('/placeorder');
    }
    return <FormContainer>
        <CheckoutStepper step1 step2 step3/>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Payment Method</Form.Label>
                <Form.Check
                type='radio'
                label='Paypal or Credit Card'
                id='Paypal'
                checked
                onChange={(e)=>setPayment(e.target.value)}
                >
                </Form.Check>
            </Form.Group>

            <Button type='submit' variant='dark'>Continue</Button>
        </Form>

    </FormContainer>
}
