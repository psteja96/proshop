import {useState, useEffect} from "react";
import {FormContainer} from "../Components/FormContainer.jsx";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useRegisterMutation} from "../Slices/usersApiSlice.js";
import Loader from "../Components/Loader.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setCredentials} from "../Slices/authSlice.js";
import {toast} from "react-toastify";

export default function RegisterScreen(){
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPass,setConformPass]=useState('');


    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [register, {isLoading}]=useRegisterMutation();
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
        if(password!==confirmPass){
            toast.error('Passwords Do Not Match');
            return;
        }else{
        try {
            const res=await register({name,email,password}).unwrap();
            dispatch(setCredentials({...res}));
            navigate(redirect);
        }catch (e){
            toast.error(e?.data?.message || e.error);
        }}
    }
    return(
        <FormContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='my-3' >
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type='text'
                                  placeholder='enter name'
                                  value={name}
                                  onChange={(e)=>setName(e.target.value)}></Form.Control>

                </Form.Group>
                <Form.Group controlId='email' className='my-3' >
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email'
                                  placeholder='enter email'
                                  value={email}
                                  onChange={(e)=>setEmail(e.target.value)}></Form.Control>

                </Form.Group>
                <Form.Group controlId='password' className='my-3' >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password'
                                  placeholder='enter password'
                                  value={password}
                                  onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPass' className='my-3' >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password'
                                  placeholder='Re-enter password'
                                  value={confirmPass}
                                  onChange={(e)=>setConformPass(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit'variant='primary' className='mt-2' disabled={isLoading}>Register</Button>
                <Row className='py-3'>
                    <Col>
                        Already have an account? <Link to={redirect?`/login?redirect=${redirect}`:'/login'}>Login</Link>
                    </Col>
                </Row>
                {isLoading && <Loader/>}
            </Form>
        </FormContainer>
    )

}
