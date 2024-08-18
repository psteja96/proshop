import {useState, useEffect} from "react";
import {FormContainer} from "../Components/FormContainer.jsx";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useLoginMutation} from "../Slices/usersApiSlice.js";
import Loader from "../Components/Loader.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setCredentials} from "../Slices/authSlice.js";
import {toast} from "react-toastify";



export function LoginScreen(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [login, {isLoading}]=useLoginMutation();
    const {userInfo}=useSelector((state) => state.auth);

    const {search}=useLocation();
    const sp=new URLSearchParams(search);
    const redirect=sp.get('redirect')|| '/';

    useEffect(()=>{
     if(userInfo){
         navigate(redirect);
        }
    },[userInfo,redirect,navigate])


    const submitHandler=async (e)=>{
        e.preventDefault();
        try {
            const res=await login({email,password}).unwrap();
            dispatch(setCredentials({...res}));
            navigate(redirect);
        }catch (e){
        toast.error(e?.data?.message || e.error);
        }
    }
    return(
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'className='my-3' >
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email'
                placeholder='enter email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}></Form.Control>

            </Form.Group>
                <Form.Group controlId='password'className='my-3' >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password'
                                  placeholder='enter password'
                                  value={password}
                                  onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit'variant='primary' className='mt-2' disabled={isLoading}>Sign In</Button>
                <Row className='py-3'>
                    <Col>
                        New Customer? <Link to={redirect?`/register?redirect=${redirect}`:'/register'}>Register</Link>
                    </Col>
                </Row>
                {isLoading && <Loader/>}
            </Form>
        </FormContainer>
    )
}
