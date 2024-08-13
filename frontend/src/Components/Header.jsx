import {Navbar, Nav, Container, Badge} from "react-bootstrap";
import {FaShoppingCart, FaUser} from "react-icons/fa";
import {LinkContainer} from 'react-router-bootstrap';
import logo from "../assets/logo.png";
import {useSelector} from "react-redux";

export function Header() {

    const { cartItems}=useSelector((state)=>state.cart);
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
                            <LinkContainer to="/login">
                                <Nav.Link href="#link"><FaUser/>Sign In</Nav.Link>
                            </LinkContainer>

                        </Nav>
                    </Navbar.Collapse>
                </Container>

            </Navbar>

        </header>
    </>
}
