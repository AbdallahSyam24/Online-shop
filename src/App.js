import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProductOverView } from "./pages/ProductOverView";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { BtnScroll } from "./components/btn-scroll/BtnScroll";
import Employee from "./pages/Employee";
import EditView from "./components/product-module/EditView";
import AddView from "./components/product-module/AddView";
import DetailView from "./components/product-module/DetailView";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";
import OrderDetailView from "./components/order-module/DetailView";

export default function App() {
    return (
        <main>
            <Header />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/employee' element={<Employee />} />
                <Route path='/products/:id' element={<ProductOverView />} />
                <Route path='/employee/addView' element={<AddView />} />
                <Route path='/employee/editView/:id' element={<EditView />} />
                <Route path='/employee/detailView/:id' element={<DetailView />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/order' element={<Order />} />
                <Route path='/order/detailView/:id' element={<OrderDetailView />} />
            </Routes>
            <BtnScroll />
            <Footer />
        </main>
    )
}
