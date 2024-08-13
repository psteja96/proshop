import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/styles/index.css';
import './assets/styles/bootstrap.custom.css';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen.jsx";
import ProductScreen from "./Screens/ProductScreen.jsx";
import {Provider} from "react-redux";
import store from "./Store.js";
import CartScreen from "./Screens/CartScreen.jsx";

//import 'bootstrap/dist/css/bootstrap.min.css';
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route index={true} path="/" element={<HomeScreen/>}></Route>
            <Route path="product/:id" element={<ProductScreen/>}></Route>
            <Route path="/cart" element={<CartScreen/>}></Route>
        </Route>
    )
)
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
        <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>
)
