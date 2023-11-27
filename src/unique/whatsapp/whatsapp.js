import 'bootstrap/dist/css/bootstrap.min.css';
import "./whatsapp.scss"
import '../flex.scss'
import { Icon } from '@iconify-icon/react';
import { links } from '../../public_site/links';


function Whatsapp() {
    return (
        <a className="whatsapp_button" href={links.whatsapp_link_0150} rel="noopener noreferrer">
            <Icon className="whatsapp_icon" icon="logos:whatsapp-icon" />
        </a>
    );
}

export default Whatsapp;