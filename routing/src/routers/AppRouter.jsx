import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "../routes/ProtectedRoute";
import NotFoundPage from "../components/NotFoundPage";
import Registration from "../components/Registration";
import Login from "../components/Login";
import AdminHeader from "../components/admin/AdminHeader";
import AdminAddProduct from "../components/admin/AdminAddProduct";
import AdminFooter from "../components/admin/AdminFooter";
import AdminShowUSers from "../components/admin/AdminShowUsers";
// import Review from "../components/Review";
import AdminShowMessagesList from "../components/admin/AdminShowMessagesList";
import ContactUs from "../components/ContactUs";
import ExtraFooter from "../components/ExtraFooter";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import HomePageProduct from "../components/HomePageProduct";
import Sidebar from "../components/Sidebar";
// import Slider from "../components/Slider";
import Checkout from "../components/Checkout";

import Product from "../components/Product";

const logg = () => (
  <div>
    <Login />
  </div>
);

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
    <Registration />
  </div>
);

const checkout = () => (
  <div>
    <Sidebar />
    <Checkout />
    <ExtraFooter />
    <Footer />
  </div>
);

const contactus = () => (
  <div className="wrapper--all">
    <Sidebar />
    <ContactUs />
    <ExtraFooter />
    <Footer />
  </div>
);

const product = () => (
  <div className="wrapper--all">
    <Sidebar />
    <Product />
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
    <HomePageProduct />
    <Gallery />
    <ExtraFooter />
    <Footer />
  </div>
);

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={index} exact={true} />
        <Route path="/login" component={logg} />
        <Route path="/product" />
        <Route path="/products/tables/1" component={product} />
        <Route path="/contactus" component={contactus} />
        <Route path="/registration" component={registration} />
        <ProtectedRoute path="/checkout" component={checkout} />
        <ProtectedRoute path="/admin" component={Admin} exact={true} />
        <ProtectedRoute path="/admin/messages" component={Messages} />
        <ProtectedRoute path="/admin/users" component={adminShowUSers} />
        <Route path="/contact" />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
