import 'bootstrap/dist/css/bootstrap.min.css';
import './form.scss'
import '../../unique/flex.scss';
import React from 'react';
import Axios from 'axios';
import { count_digits, allow_only_numbers, zip_auto_correct, phone_auto_correct } from './form_functions';
import { useState } from 'react';
//bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Spinner from 'react-bootstrap/Spinner';
/* ---envs--- */
const NODE_ENV = process.env.NODE_ENV;
const LOCAL_URL = process.env.REACT_APP_LOCAL_URL;

function FormFunc() {
    /* ---Loading Box--- */
    const [loading, setLoading] = useState(false);
    //form validation
    const [validated, setValidated] = useState(false);
    /* Form Toast-------- */
    const [showSuccess, setshowSuccess] = useState(false);
    const [sendButton, setsendButton] = useState("Enviar");
    const [zipButton, setzipButton] = useState("Buscar");
    const [showZIPError, setShowZIPError] = useState(false);
    const [showZIPShort, setshowZIPShort] = useState(false);
    const [ZIPLength, setZIPLength] = useState(0);
    //Error warning (e.g. 404 status)
    const [showHTTPError, setShowHTTPError] = useState(false);
    const [error_status, set_error_status] = useState("");
    /* Form Toast-------- */

    //store form values
    const [zip_value, setZip] = useState("");
    const [street, setStreet] = useState("");
    const [address_number, setAddress_number] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company_name, setCompany_name] = useState("");
    const [meal_quantity, setMeal_quantity] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    //auto-fill zip api
    function zip() {
        setzipButton(<div><Spinner size="sm" animation="border" /> Buscando...</div>);
        if (ZIPLength < 8) {
            setshowZIPShort(true);
        } else {
            fetch(`https://viacep.com.br/ws/${zip_value}/json/`).then((response) => response.json().then(data => {
                //console.log(data);
                if (data.logradouro !== undefined || data.localidade !== undefined || data.uf !== undefined) {
                    document.getElementById('form_street').value = data.logradouro;
                    setStreet(data.logradouro);
                    document.getElementById('form_city').value = data.localidade;
                    setCity(data.localidade);
                    document.getElementById('form_state').value = data.uf;
                    setState(data.uf);
                } else {
                    setShowZIPError(true);
                }
            })).catch((error) => {
                //console.log(error); 
                setShowZIPError(true); 
            });
        }
        setTimeout(() => { setzipButton("Buscar"); }, 500);
    }

    //Form Validation
    const handleSubmit = (event) => {

        //event.preventDefault();

        /*
        This stops the submit from auto navigating
        */

        setsendButton("Enviar");
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {

            let data = {
                zip_value: zip_value,
                street: street,
                address_number: address_number,
                city: city,
                state: state,
                name: name,
                email: email,
                company_name: company_name,
                meal_quantity: meal_quantity,
                phone: phone,
                message: message,
            };

            /* --- Loading FeedBack--- */
            setsendButton(<div><Spinner size="sm" animation="border" /> Enviando...</div>);
            setLoading(true);

            const baseURL = NODE_ENV === 'production' ? '' : LOCAL_URL;

            Axios.post(`${baseURL}/forms/send_form`, data)
                .then((res) => {
                    if (res.status === 200) {
                        //console.log("200");
                        setLoading(false);
                        setsendButton("Enviado!");
                        setZip("");
                        setStreet("");
                        setAddress_number("");
                        setCity("");
                        setState("");
                        setName("");
                        setEmail("");
                        setCompany_name("");
                        setMeal_quantity("");
                        setPhone("");
                        setMessage("");
                        setshowSuccess(true);
                        setValidated(false);
                    }
                }
                ).catch((error) => {
                    //console.log(error.request.status);
                    setLoading(false);
                    setsendButton("Enviar");
                    set_error_status(error.request.status);
                    setShowHTTPError(true);
                }
                );

        }
        setValidated(true);
        event.preventDefault();
    };
    
    return (
        <div className="form flex flexcol flex_x_center flex_y_center">
            {/* Loading Spinner */}
            {loading && (
                <div className="loading_box loading_box_black">
                    <div className="flex flex_x_center">
                        <Spinner animation="border" variant="success" role="status" />
                    </div>
                    <div className='loading_text'>Loading...</div>
                </div>
            )}

            {/* Form Toast---- */}
            {/* Success */}
            <ToastContainer className="position-fixed" position="top-end" style={{ zIndex: 1000 }}>
                <Toast onClose={() => setshowSuccess(false)} show={showSuccess} bg="success">
                    <Toast.Header>
                        <div className="me-auto status_family success_header">Formul&#225;rio Enviado!</div>
                    </Toast.Header>
                    <Toast.Body className="success_white status_family success_body" >Obrigado Por Entrar Em Contato! Responderemos em At&#233; 3 Dias &#218;teis.</Toast.Body>
                </Toast>
            </ToastContainer>

            {/* HTTP Errors */}
            <ToastContainer className="position-fixed" position="top-end" style={{ zIndex: 1000 }}>
                <Toast onClose={() => setShowHTTPError(false)} show={showHTTPError} bg="warning">
                    <Toast.Header>
                        <div className="me-auto status_family success_header">{`HTTP Status Code ${error_status}`}</div>
                    </Toast.Header>
                    <Toast.Body className="status_family success_body">Oh n&#227;o! Infelizmente algo aconteceu e n&#227;o foi poss&#237;vel enviar seu formul&#225;rio. :(</Toast.Body>
                </Toast>
            </ToastContainer>

            {/* ZIP Errors */}
            {/* ZIP not found */}
            <ToastContainer className="position-fixed" position="top-end" style={{ zIndex: 1000 }}>
                <Toast onClose={() => setShowZIPError(false)} show={showZIPError} bg="warning">
                    <Toast.Header>
                        <div className="me-auto status_family success_header">CEP N&#227;o Encontrado :/</div>
                    </Toast.Header>
                    <Toast.Body className="status_family success_body">Hmmm, N&#227;o Foi Poss&#237;vel Encontrar o Endere&#231;o. Verifique o CEP Digitado ou Preencha o Endere&#231;o Manualmente.</Toast.Body>
                </Toast>
            </ToastContainer>
            {/* ZIP too short */}
            <ToastContainer className="position-fixed" position="top-end" style={{ zIndex: 1000 }}>
                <Toast onClose={() => setshowZIPShort(false)} show={showZIPShort} bg="warning">
                    <Toast.Header>
                        <div className="me-auto status_family success_header">CEP Muito Curto</div>
                    </Toast.Header>
                    <Toast.Body className="status_family success_body">{`O CEP \u{E9} composto por 8 n\u{FA}meros. Voc\u{EA} digitou ${ZIPLength} n\u{FA}meros`}</Toast.Body>
                </Toast>
            </ToastContainer>
            {/* Form Toast---- */}

            <div className='form_field flex flexcol'>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    {/* Title */}
                    <Row className="mb-5">
                        <div className="forms_title">Pedir Or&#231;amento</div>
                    </Row>

                    {/* ZIP */}
                    <Row className="mb-3 form-inputs-row">

                        <div className="mb-3 input-group">
                            <input
                                value={zip_value}
                                placeholder="Buscar CEP"
                                aria-label="Buscar CEP"
                                className="form-control input_family"
                                controlid="zip-input"
                                required
                                inputMode="numeric"
                                onChange={(e) => {
                                    setZip(zip_auto_correct(e));
                                    setZIPLength(count_digits(e));
                                    if (ZIPLength === 7) { setshowZIPShort(false); }
                                }}
                            />
                            <button type="button" onClick={zip} className="btn btn-success form_zip_button">{zipButton}</button>
                            <Form.Control.Feedback type="invalid">Campo Obrigat&#243;rio.</Form.Control.Feedback>
                        </div>
                    </Row>

                    {/* Street */}
                    <Row className="mb-3 form-inputs-row">
                        <Form.Group as={Col} className="mb-3">
                            <Form.Control className="input_family" value={street} placeholder="Logradouro" required type="text" id="form_street" onChange={(e) => setStreet(e.target.value)} />
                            <Form.Control.Feedback type="invalid">Campo Obrigat&#243;rio.</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    {/* Building Number */}
                    <Row className="mb-3 form-inputs-row">
                        <Form.Group as={Col} className="mb-3">
                            <Form.Control className="input_family" value={address_number} placeholder="Numero Predial" required id="form_building_number" onChange={(e) => { setAddress_number(allow_only_numbers(e)); }} />
                            <Form.Control.Feedback type="invalid">Campo Obrigat&#243;rio.</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    {/* City */}
                    <Row className="mb-3 form-inputs-row">
                        <Form.Group as={Col} className="mb-3">
                            <Form.Control className="input_family" value={city} placeholder="Cidade" required type="text" id="form_city" onChange={(e) => setCity(e.target.value)} />
                            <Form.Control.Feedback type="invalid">Campo Obrigat&#243;rio.</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    {/* State */}
                    <Row className="mb-3 form-inputs-row">
                        <Form.Group as={Col} className="mb-3">
                            <Form.Control className="input_family" value={state} placeholder="Estado" required type="text" id="form_state" onChange={(e) => setState(e.target.value)} />
                            <Form.Control.Feedback type="invalid">Campo Obrigat&#243;rio.</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    {/* Name */}
                    <Row className="mb-3 form-inputs-row">
                        <Form.Group as={Col} className="mb-3">
                            <Form.Control className="input_family" value={name} placeholder="Nome" type="text" id="form_name" onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                    </Row>

                    {/* Email */}
                    <Row className="mb-3 form-inputs-row">
                        <Form.Group as={Col} className="mb-3">
                            <Form.Control className="input_family" value={email} type="email" placeholder="seu@email.com" id="form_email" required onChange={(e) => setEmail(e.target.value)} />
                            <Form.Control.Feedback type="invalid">Campo Obrigat&#243;rio.</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    {/* Company Name */}
                    <Row className="mb-3 form-inputs-row">
                        <Form.Group as={Col} className="mb-3">
                            <Form.Control className="input_family" value={company_name} placeholder="Nome da Empresa" type="text" id="form_company_name" onChange={(e) => setCompany_name(e.target.value)} />
                        </Form.Group>
                    </Row>

                    {/* Meals/Day */}
                    <Row className="mb-3 form-inputs-row">
                        <Form.Group as={Col} className="mb-3">
                            <Form.Control className="input_family" inputMode="numeric" value={meal_quantity} placeholder="Refei&ccedil;&otilde;es por dia" id="form_meals" onChange={(e) => { setMeal_quantity(allow_only_numbers(e)); }} />
                        </Form.Group>
                    </Row>

                    {/* Phone */}
                    <Row className="mb-3 form-inputs-row">
                        <Form.Group as={Col} className="mb-3">
                            <Form.Control className="input_family" inputMode="numeric" value={phone} placeholder="Telefone" id="form_phone" onChange={(e) => { setPhone(phone_auto_correct(e)); }} />
                        </Form.Group>
                    </Row>

                    {/* Message */}
                    <Row className="mb-3 form-inputs-row">
                        <Form.Group className="mb-3" >
                            <Form.Control className="input_family" value={message} placeholder="Mensagem" as="textarea" rows={3} required type="text" id="form_message" onChange={(e) => setMessage(e.target.value)} />
                            <Form.Control.Feedback type="invalid">Campo Obrigat&#243;rio.</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    {/* Submit */}
                    <Row className="mb-3 form-inputs-row">
                        <Form.Group className="mb-3" >
                            <Button type="submit">{sendButton}</Button>
                        </Form.Group>
                    </Row>

                </Form>
            </div>
        </div>
    );
}

export default FormFunc;