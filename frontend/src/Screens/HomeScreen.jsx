import {Col, Row} from "react-bootstrap";
//import products from "../../public/products.js";
import Products from "../Components/Products.jsx";

import {useGetProductsQuery} from "../Slices/ProductsapiSlice.js";
import Loader from "../Components/Loader.jsx";
import Message from "../Components/Message.jsx";
import {useGetUsrQuery} from "../Slices/usersApiSlice.js";
//import axios from "axios";

export default function HomeScreen() {

   // const [products,setProducts]=useState([]);

    const {data:products, isLoading, isError}=useGetProductsQuery();
    const {data:usrData}=useGetUsrQuery();
  console.log(usrData);
    return <>

    {isLoading?(

        <Loader/>
    ):isError?(
        <Message variant='danger'>{isError?.data.message||isError.error}</Message>
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
