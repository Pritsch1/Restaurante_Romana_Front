import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
/* ---Public Pages--- */
import NavBar from './public_site/navbar/navbar.js';
import Footer from './public_site/footer/footer.js';
import Whatsapp from './unique/whatsapp/whatsapp.js';
import HomePage from './public_site/home/home.js';
import FormPage from './public_site/form/form.js';
import ContactFormPage from './public_site/contact/contact.js';
import MenuPage from './public_site/prices/prices.js';
import AdminSignin from './public_site/admin_signin/admin_signin.js';
import AdminSignup from './public_site/admin_signup/admin_signup.js';
/* ---Protects--- */
import Protect from './admin/protect.js';
/* ---admin--- */
import Orders from './admin/orders/orders.js';
import DailyMenu from './admin/menu/daily_menu.js';

function Public({ children }) {
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

function AdminPublic({ children }) {
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
                    <Route path="/" element={<Public>           <HomePage /> </Public>} exact={true} />
                    <Route path="/coletivas" element={<Public>  <FormPage /> </Public>} exact={true} />
                    <Route path="/contato" element={<Public>    <ContactFormPage /> </Public>} exact={true} />
                    <Route path="/valores" element={<Public>    <MenuPage /> </Public>} exact={true} />
                    <Route path="/adm_signup" element={<AdminPublic> <AdminSignup /> </AdminPublic>} exact={true} />
                    <Route path="/adm_signin" element={<AdminPublic> <AdminSignin /> </AdminPublic>} exact={true} />
                    <Route element={<Protect />}>
                        <Route path="/pedidos" element={<Orders />} exact={true} />
                        <Route path="/menu" element={<DailyMenu />} exact={true} />
                    </Route>
                    {/* Add a catch-all or error route here */}
                    {/*<Route path="*" element={<Error404 />} />*/}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;