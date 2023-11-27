import 'bootstrap/dist/css/bootstrap.min.css';
import "./navbar.scss"
import '../../unique/flex.scss';
import { links } from '../links';
import { Icon } from '@iconify-icon/react';
import Logo from "../../unique/logo.png"
//bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
    function waze_link() {
        if ('ontouchstart' in window === true) {
            return links.waze_map_route_mobile;
        } else {
            return links.waze_map_route;
        }
    }

    return (
        <div> {/* navbar classname */}
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>

                    {/* Logo */}
                    <Navbar.Brand href="/" rel="noopener noreferrer">
                        <img src={Logo} alt="logo" className="navbar_logo" />
                    </Navbar.Brand>
                    {/* Dropdown Action */}
                    <Navbar.Toggle className="navbar_toggle" aria-controls="basic-navbar-nav" />

                    {/* Collapsable menu + links */}
                    <Navbar.Collapse className="justify-content-end navbar_collapse">
                        <Nav>
                            <Nav.Link href="/" rel="noopener noreferrer">Home</Nav.Link>
                            <Nav.Link href="/contato" rel="noopener noreferrer">Contato</Nav.Link>
                            <Nav.Link href="/valores" rel="noopener noreferrer">Valores</Nav.Link>
                            {/* Dropdown */}
                            <NavDropdown title="Rotas">

                                {/* Aling Icon with text */}

                                {/* Google */}
                                <NavDropdown.Item href={links.google_map_route} rel="noopener noreferrer">
                                    <div className="flex flexrow google_route">
                                        <div className="navbar_icons"><Icon icon="logos:google-maps" color="black" width="24" height="24" /></div>
                                        <div className="navbar_google_maps">Google</div>
                                    </div>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                {/* Waze */}
                                <NavDropdown.Item href={waze_link()} rel="noopener noreferrer">
                                    <div className="flex flexrow">
                                        <div className="navbar_icons"><Icon icon="simple-icons:waze" color="black" width="22" height="22" /></div>
                                        <div className="navbar_waze_maps">Waze</div>
                                    </div>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                {/* Where am I? */}
                                <NavDropdown.Item href={links.apple_map_route} rel="noopener noreferrer">
                                    <div className="flex flexrow">
                                        <div className="navbar_icons"><Icon icon="fontisto:apple" color="black" width="26" height="26" /></div>
                                        <div className="navbar_apple_maps">Maps</div>
                                    </div>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </div>
    );
}


export default NavBar;