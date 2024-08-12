import {Col, Row} from "react-bootstrap";
//import products from "../../public/products.js";
import Products from "../Components/Products.jsx";
import {useEffect, useState} from "react";
import {useGetProductsQuery} from "../Slices/ProductsapiSlice.js";
//import axios from "axios";
useGetProductsQuery
export default function HomeScreen() {

   // const [products,setProducts]=useState([]);

    const {data:products, isLoading, isError}=useGetProductsQuery();

    return <>

    {isLoading?(

        <h2>Loading...</h2>
    ):isError?(
        <div>{isError?.data.message||isError.error}</div>
    ):(
        <>
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
    )}


    </>
}
