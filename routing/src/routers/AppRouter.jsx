import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "../routes/ProtectedRoute";
import { ProtectedAdmin } from "../routes/ProtectedAdmin";
import NotFoundPage from "../components/NotFoundPage";
import Login from "../components/Login";
import AdminHeader from "../components/admin/AdminHeader";
import AdminAddProduct from "../components/admin/AdminAddProduct";
import AdminFooter from "../components/admin/AdminFooter";
import AdminShowUSers from "../components/admin/AdminShowUsers";
import AdminShowMessagesList from "../components/admin/AdminShowMessagesList";
import ContactUs from "../components/ContactUs";
import ExtraFooter from "../components/ExtraFooter";
import Footer from "../components/Footer";
import HomePageProduct from "../components/HomePageProduct";
import Sidebar from "../components/Sidebar";
import Checkout from "../components/Checkout";
import ProductFilter from "../components/ProductFilter";
import Product from "../components/Product";
import Slider from "../components/Slider";
import BackToTop from "../components/BackToTop";
import AboutUs from "../components/AboutUs";

import "antd/dist/antd.css";

const Admin = () => (
  <div>
    <AdminHeader />
    <AdminAddProduct />
    <AdminFooter />
  </div>
);

const Messages = () => (
  <div>
    <AdminHeader />
    <AdminShowMessagesList />
    <AdminFooter />
  </div>
);

const registration = () => (
  <div>
    <Sidebar />
    <Login />
    <ExtraFooter />
    <Footer />
  </div>
);

const aboutUs = () => (
  <div className="wrapper--about">
    <Sidebar />
    <BackToTop />
    <AboutUs />
    <ExtraFooter />
    <Footer />
  </div>
);

const login = () => (
  <div>
    <Sidebar />
    <Login />
    <ExtraFooter />
    <Footer />
  </div>
);

const checkout = () => (
  <div>
    <BackToTop />
    <Sidebar />
    <Checkout />
    <ExtraFooter />
    <Footer />
  </div>
);

const contactus = () => (
  <div>
    <BackToTop />
    <Sidebar />
    <ContactUs />
    <ExtraFooter />
    <Footer />
  </div>
);

const adminShowUSers = () => (
  <div>
    <AdminHeader />
    <AdminShowUSers />
    <AdminFooter />
  </div>
);

const index = () => (
  <div>
    <Sidebar />
    <BackToTop />
    <Slider />
    <HomePageProduct />
    <ExtraFooter />
    <Footer />
  </div>
);

const filter = () => (
  <div>
    <BackToTop />
    <Sidebar />
    <ProductFilter />
    <ExtraFooter />
    <Footer />
  </div>
);

const product = ({ match }) => (
  <div className="wrapper--all">
    <BackToTop />
    <Sidebar />
    <Product match={match} />
    <ExtraFooter />
    <Footer />
  </div>
);

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={index} exact={true} />
        <Route path="/product" />
        <Route path="/contactus" component={contactus} />
        <Route path="/registration" component={registration} />
        <Route path="/login" component={login} />
        <Route path="/shop" component={filter} />
        <Route path="/aboutus" component={aboutUs} />
        <Route path="/products/:id" component={product} />
        <ProtectedRoute path="/checkout" component={checkout} />
        <ProtectedAdmin path="/admin" component={Admin} exact={true} />
        <ProtectedAdmin path="/admin/messages" component={Messages} />
        <ProtectedAdmin path="/admin/users" component={adminShowUSers} />
        <Route path="/contact" />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
