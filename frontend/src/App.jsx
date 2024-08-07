import {useState} from 'react'


import {Header} from "./Components/Header.jsx";
import {Container} from "react-bootstrap";
import {Footer} from "./Components/Footer.jsx";
import {Outlet} from "react-router-dom";


function App() {
    // const [count, setCount] = useState(0)
    return (
        <>
            <Header/>
            <main className='py-3'>
                <Container>
                    <Outlet/>
                </Container>
            </main>
            <Footer/>
        </>
    )
}

export default App
