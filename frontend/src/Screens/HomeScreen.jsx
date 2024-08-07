import {Col, Row} from "react-bootstrap";
//import products from "../../public/products.js";
import Products from "../Components/Products.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

export default function HomeScreen() {

    const [products,setProducts]=useState([]);
    useEffect(() => {
       const fetchProducts=async () =>{
           const {data}=await axios.get('http://localhost:5001/api/products');
           console.log(data);
           setProducts(data);
       };
       fetchProducts();

    }, []);
    return <>
        <h1>Latest Products</h1>
        <Row>
            {products.map((data) => (

                    <Col key={data._id} md={6} lg={4} xl={3}>
                        <Products product={data}/>
                    </Col>
                )
            )}
        </Row>

    </>
}
