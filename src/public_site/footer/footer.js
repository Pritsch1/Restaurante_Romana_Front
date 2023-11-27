//mobile google link broken

/* ---Dependencies--- */
import { useState, useRef } from 'react';
import { Icon } from '@iconify-icon/react';
import { links } from '../links';
/* ---Bootstrap--- */
import 'bootstrap/dist/css/bootstrap.min.css';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
/* ---My Files--- */
import './footer.scss';
import '../../unique/flex.scss';

function Footer() {
    function redirect(href) {
        window.open(href, '_self', 'noopener, noreferrer');
        window.opener = null;        
    }

    //copy info
    const ref = useRef(null);
    const [show, setShow] = useState(false);
    const [targetIs, setTargetIs] = useState('');
    const [success_copy_display, setSuccess_copy_display] = useState('');
    //copy info values
    const email = ["adm.romana21@gmail.com", 'email', "E-mail"];
    const whatsapp = ["41987180150", 'whatsapp', "WhatsApp"];
    const phone = ["4133367699", 'phone', "Telefone"];

    function copy(icon) {        
        if ('ontouchstart' in window === true) { //<-------- Checks if we are on mobile or not o/
            document.getElementById("call").href = "tel:4133367699";
            document.getElementById("mail").href = "mailto:adm.romana21@gmail.com";
        } else {
            setTargetIs(icon[1]);
            setTimeout(() => {
                setShow(false);
            }, 2000);
            window.navigator.clipboard.writeText(icon[0]);
            setSuccess_copy_display(icon[2]);
            setShow(true);
        }
    }

    return (
        <div className="footer flex wrap" id="?">

            <div ref={ref}>
                <Overlay show={show} target={document.getElementById(targetIs)} placement="bottom" container={ref} containerPadding={0}>
                    <Popover id="popover-contained">
                        <div className="popover-body footer_my_tooltip">
                            <strong>{`${success_copy_display} Copiado!`}</strong>
                        </div>
                    </Popover>
                </Overlay>
            </div>

            { /*Left/Upper Side */}
            <div className="footer_left_div footer_divide footer_margim flex flexcol flex_x_center flex_y_center footer_line_gap">

                { /*Social Media Icons */}
                <div className="footer_social_media_div flex">
                    <div className="links">
                        <Icon icon="ant-design:facebook-outlined" width="23.5" onClick={() => { redirect(links.facebook); }} />
                    </div>
                    {/*<div className="links">
                        <Icon icon="line-md:instagram" width="24" onClick={() => redirect(links.instagram)} />
                    </div>*/}
                </div>
                { /*Rate At Google */}
                <div>
                    <div onClick={() => { 'ontouchstart' in window ? redirect(links.google_page_mobile) : redirect(links.google_page_desktop) }}>
                        Nos Avalie No
                        <span className="footer_google links">Google</span>
                    </div>
                </div>
                { /*email */}
                <div className="flex flex_y_center footer_icon_gap links" id="email" onClick={() => { copy(email); }}>
                    <div className="flex">
                        <Icon icon="fontisto:email" width="20" /> { /*use font size on scss file*/}
                    </div>
                    <div className="flex">
                        <a className="links footer_mail" id="mail" href="#?">adm.romana21@gmail.com</a>
                    </div>
                </div>
                { /*Whatsapp */}
                <div className="flex flex_y_center footer_icon_gap links" id="whatsapp" onClick={() => copy(whatsapp)}>
                    <div className="flex">
                        <Icon icon="nimbus:whatsapp" width="20" />
                    </div>
                    <div className="flex links">
                        <a className="links" href="#?">(41) 98718-0150</a>                        
                    </div>
                </div>
                {/* Phone */}
                <div className="flex flex_y_center footer_phone_gap links" id="phone" onClick={() => copy(phone)}>
                    <div className="flex">
                        <Icon icon="teenyicons:phone-outline" width="18" />
                    </div>
                    <div className="flex">
                        <a className="links" id="call" href="#?">(41) 3336-7699</a>
                    </div>
                </div>
                {/* Work Hours */}
                <div className="flex flexcol flex_y_center footer_line_gap">
                    <div className="flex">
                        Hor&#225;rio de Funcionamento
                    </div>
                    <div className="flex">
                        Segunda &#224; S&#225;bado das 11h &#224;s 15h
                    </div>
                </div>

            </div>

            {/*Right/Bottom Side*/}
            <div className="footer_divide footer_margim flex flex_x_center flex_y_center">
                {/*Google Maps Api*/}
                <iframe className="flex footer_google_maps" title="Google_maps" loading="lazy" allowFullScreen src={links.google_maps_api_overview}></iframe>
            </div>

            <div className="footer_dev flex flex_x_center" onClick={() => redirect(links.linkedin)}>
                <div>&#169; 2023 Desenvolvido por Bruno Pritsch Dec. Todos os direitos reservados.</div>
            </div>
        </div >
    );
}

export default Footer;