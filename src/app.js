import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
//My components
import NavBar from './public_site/navbar/navbar.js';
import Footer from './public_site/footer/footer.js';
import Whatsapp from './unique/whatsapp/whatsapp.js';
import HomePage from './public_site/home/home.js';
import FormPage from './public_site/form/form.js';
import ContactFormPage from './public_site/contact/contact.js';
import MenuPage from './public_site/prices/prices.js';
import AdminSignin from './public_site/admin_signin/admin_signin.js';
import AdminSignup from './public_site/admin_signup/admin_signup.js';
import Protect from './admin/protect.js';
import Orders from './admin/orders/orders.js';

function Layout({ children }) {
    const location = useLocation();

    return (
        <div>
            <NavBar />
            {location.pathname !== '/coletivas' && <Whatsapp />}
            <main>{children}</main>
            <Footer />
        </div>
    );
}

function Layout2({ children }) {
    return (
        <div>
            <NavBar />
            <main>{children}</main>
        </div>
    );
}

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout>           <HomePage /> </Layout>} exact={true} />
                    <Route path="/coletivas" element={<Layout>  <FormPage /> </Layout>} exact={true} />
                    <Route path="/contato" element={<Layout>    <ContactFormPage /> </Layout>} exact={true} />
                    <Route path="/valores" element={<Layout>    <MenuPage /> </Layout>} exact={true} />
                    <Route path="/adm_signup" element={<Layout2> <AdminSignup /> </Layout2>} exact={true} />
                    <Route path="/adm_signin" element={<Layout2> <AdminSignin /> </Layout2>} exact={true} />
                    <Route element={<Protect />}>
                        <Route path="/pedidos" element={<Orders />} exact={true} />    
                    </Route>
                    {/* Add a catch-all or error route here */}
                    {/*<Route path="*" element={<Error404 />} />*/}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;