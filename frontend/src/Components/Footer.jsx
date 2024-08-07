import {Container, Row, Col} from "react-bootstrap";


export function Footer() {
    const currDate = new Date().getFullYear();
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        <p>
                            ProShop &copy; {currDate}
                        </p>

                    </Col>
                </Row>
            </Container>


        </footer>
    )

}
