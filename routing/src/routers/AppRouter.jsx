import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "../routes/ProtectedRoute";
import NotFoundPage from "../components/NotFoundPage";
import Registration from "../components/Registration";
// import Login from '../components/Login';
import AdminHeader from "../components/admin/AdminHeader";
import AdminAddProduct from "../components/admin/AdminAddProduct";
import AdminFooter from "../components/admin/AdminFooter";
import AdminShowUSers from "../components/admin/AdminShowUsers";
// import Review from '../components/Review';
import AdminShowMessagesList from "../components/admin/AdminShowMessagesList";
import ContactUs from "../components/ContactUs";
import ExtraFooter from "../components/ExtraFooter";
import Footer from "../components/Footer";
// import Gallery from '../components/Gallery';
import HomePageProduct from "../components/HomePageProduct";
// import HomePageProduct from "../components/Test";
import Sidebar from "../components/Sidebar";
import Slider from "../components/Slider";
import Checkout from "../components/Checkout";
// import AboutUs  from"../components/AboutUs";
import AboutUsSlider  from"../components/AboutUs";

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
  <div>
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
    <Slider />
    <HomePageProduct />
    <ExtraFooter />
    <Footer />
  </div>
);
const aboutUs = () => (
  <div>
    <Sidebar />
    {/* <AboutUs /> */}
    <AboutUsSlider />
    <ExtraFooter />
    <Footer />
  </div>
);

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={index} exact={true} />
        <Route path="/aboutUs" component={aboutUs}  />
        <Route path="/product" />
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
