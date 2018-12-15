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

// All messages in the admin part
import AdminShowMessagesList from "../components/admin/AdminShowMessagesList";

//Messages component to send
import ContactUs from "../components/ContactUs";

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

const contactus = () => (
  <div>
    <ContactUs />
  </div>
);

const adminShowUSers = () => (
  <div>
    <AdminShowUSers />
  </div>
);

const index = () => (
  <div>
    <Login />
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
        <ProtectedRoute path="/profile" />
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
