import {Navbar, Nav, Container, Badge, NavDropdown} from "react-bootstrap";
import {FaShoppingCart, FaUser} from "react-icons/fa";
import {LinkContainer} from 'react-router-bootstrap';
import logo from "../assets/logo.png";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useLogoutMutation} from "../Slices/usersApiSlice.js";
import {logout} from "../Slices/authSlice.js";

export function Header() {

    const { cartItems}=useSelector((state)=>state.cart);
    const {userInfo}=useSelector(state => state.auth);

    const dispatch=useDispatch();
    const navigate=useNavigate();

     const [logoutApiCall]=useLogoutMutation();
    const logoutHandler=async ()=>{
        try{
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login')
        }catch (e) {
            console.log(e);
        }
    }
    return <>
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            <img src={logo} alt="Pro Shop Logo"/>
                            Pro Shop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link href="#home"><FaShoppingCart/>Cart
                                    { cartItems.length>0 && (<Badge pill bg='success' >
                                        {cartItems.reduce((a,c)=>a+c.qty,0)}
                                    </Badge>) }
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo?(
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ):(<LinkContainer to="/login">
                                <Nav.Link to="/login"><FaUser/>Sign In</Nav.Link>
                            </LinkContainer>)}


                        </Nav>
                    </Navbar.Collapse>
                </Container>

            </Navbar>

        </header>
    </>
}
