import 'bootstrap/dist/css/bootstrap.min.css';
import './prices.scss'
import '../../unique/flex.scss';
import { useState, useRef } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import CloseButton from 'react-bootstrap/CloseButton';
import { Icon } from '@iconify-icon/react';

function Menu() {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const [text, setText] = useState("");
    const ref = useRef(null);

    const handleClick = (event, id) => {
        setShow(!show);
        setTarget(event.target);
        if (id === 1) { setText("Marmitas feitas por clientes devem ser pesadas."); }
        if (id === 2) { setText("A salada acompanha a marmita. Caso queira montar do seu jeito sera cobrado taxa."); }
    };

    return (
        <div className="menu flex flex_x_center flex_y_center">
            <div className="menu_board">

                <div ref={ref}>
                    <Overlay show={show} target={target} placement="bottom" container={ref} containerPadding={20}>
                        <Popover id="popover-contained">
                            <Popover.Header as="h3"><CloseButton onClick={() => { setShow(false) }} /></Popover.Header>
                            <Popover.Body>
                                <strong>{text}</strong>
                            </Popover.Body>
                        </Popover>
                    </Overlay>
                </div>

                <div className="menu_header flex flex_x_center">Valores</div>
                <div className="home_itens flex wrap menu_gap">
                    {/* ---Section 1--- */}
                    <div className="flex flexcol flex_x_center flex1">
                        <div className="home_center">
                            {/* buffet info */}
                            <div className="menu_sub_header">Buffet</div>
                            <div className="flex flexcol menu_itens_gap">
                                <div>Livre: R$ 22,00</div>
                                <div>Livre aos S&#225;bados: R$ 24,00</div>
                                <div>Quilo: R$ 48,00</div>
                            </div>
                            {/* to go info */}
                            <div className="flex flexcol menu_itens_gap">
                                <div className="menu_sub_header">
                                    Marmitas
                                    <Icon className="home_togo_info" icon="gridicons:info-outline"
                                        onClick={(e) => { handleClick(e, 1); }} />
                                </div>
                                <div>Grande: R$ 18,00</div>
                                <div>M&#233;dia: R$ 17,00</div>
                                <div>Montar Salada: R$ 2,00
                                    <Icon className="home_togo_info2" icon="gridicons:info-outline"
                                        onClick={(e) => { handleClick(e, 2); }} />
                                </div>
                                <div>Taxa de Entrega: R$ 3,00</div>
                            </div>
                        </div>
                    </div>

                    {/* ---Section 2--- */}
                    <div className="flex flexcol flex_x_center flex1">
                        <div className="home_center">
                            <div className="menu_sub_header">Por&#231;&#245;es</div>
                            <div className="flex flexcol wrap menu_itens_gap">
                                {/* protein portion */}
                                <div className="flex flexcol menu_itens_gap">
                                    <div className="menu_sub_sub_header">Carne</div>
                                    <div>Grande: R$ 25,00 (500g)</div>
                                    <div>M&#233;dia: R$ 20,00 (400g)</div>
                                    <div>Pequena R$ 10,00 (200g)</div>
                                </div>
                                {/* main portion */}
                                <div className="flex flexcol menu_itens_gap">
                                    <div className="menu_sub_sub_header">Guarni&#231;&#227;o</div>
                                    <div>Grande: R$ 14,00</div>
                                    <div>M&#233;dia: R$ 10,00</div>
                                    <div>Pequena R$ 5,00</div>
                                </div>
                                {/* salat portion */}
                                <div className="flex flexcol menu_itens_gap">
                                    <div className="menu_sub_sub_header">Salada</div>
                                    <div>Grande: R$ 10,00</div>
                                    <div>M&#233;dia: R$ 8,00</div>
                                    <div>Pequena R$ 4,00</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ---Section 3--- */}
                    <div className="flex flexcol flex_x_center flex1">
                        <div className="home_center">
                            <div className="menu_sub_header">Bebidas</div>
                            <div className="flex flexcol wrap menu_itens_gap">
                                <div>Mini 200ml: R$ 4,00</div>
                                <div>Lata: R$ 6,00</div>
                                <div>Cini Vidro 600ml: R$ 6,00</div>
                                <div>Pet 600ml: R$ 7,00</div>
                                <div>Coca Cola 1L: R$ 9,00</div>
                                <div>Coca Cola 2L: R$ 12,00</div>
                                <div>Cini 2L: R$ 10,00</div>
                                <div>Guaran&#225; 2L: R$ 12,00</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Menu;