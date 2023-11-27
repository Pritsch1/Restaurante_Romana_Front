import 'bootstrap/dist/css/bootstrap.min.css';
import './contact.scss'
import '../../unique/flex.scss'
import React from 'react';
import Axios from 'axios';
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

function ContactFormFunc() {
    //form validation
    const [validated, setValidated] = useState(false);

    /* Form Toast-------- */
    const [showSuccess, setshowSuccess] = useState(false);
    const [sendButton, setsendButton] = useState("Enviar");
    //Error warning (e.g. 404 status)
    const [showError, setShowError] = useState(false);
    const [error_status, set_error_status] = useState("");
    /* Form Toast-------- */

    //store form values
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

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
                name: name,
                email: email,
                message: message,
            };

            setsendButton(<div><Spinner size="sm" animation="border" /> Enviando...</div>);

            const baseURL = NODE_ENV === 'production' ? '' : LOCAL_URL;

            Axios.post(`${baseURL}/forms/contact_send_form`, data) //http://localhost:1 const baseURL = NODE_ENV === 'production' ? '' : LOCAL_URL;
                .then((res) => {
                    if (res.status === 200) {
                        console.log("200");
                        setsendButton("Enviado!");
                        setName("");
                        setEmail("");
                        setMessage("");
                        setshowSuccess(true);
                        setValidated(false);
                    }
                }
                )
                .catch((error) => {
                    console.log(error.request.status);
                    setsendButton("Enviar");
                    set_error_status(error.request.status);
                    setShowError(true);
                }
                );

        }

        setValidated(true);
        event.preventDefault();
    };

    return (
        <div className="form flex flexcol flex_x_center flex_y_center">
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
                <Toast onClose={() => setShowError(false)} show={showError} bg="warning">
                    <Toast.Header>
                        <div className="me-auto status_family success_header">{`HTTP Status Code ${error_status}`}</div>
                    </Toast.Header>
                    <Toast.Body className="status_family success_body">Oh n&#227;o! Infelizmente algo aconteceu e n&#227;o foi poss&#237;vel enviar seu formul&#225;rio. :(</Toast.Body>
                </Toast>
            </ToastContainer>
            {/* Form Toast---- */}

            <div className='form_field flex flexcol'>
                <Form noValidate validated={validated} className="flex-column" onSubmit={handleSubmit}>
                    {/* Title */}
                    <Row className="mb-5">
                        <div className="forms_title">Entre em Contato</div>
                    </Row>

                    {/* Name */}
                    <Row className="mb-3 form-inputs-row">
                        <Form.Group as={Col} className="mb-3">
                            <Form.Control className="input_family" value={name} placeholder="Nome" type="text" required onChange={(e) => setName(e.target.value)} />
                            <Form.Control.Feedback type="invalid">Campo Obrigat&#243;rio.</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    {/* Email */}
                    <Row className="mb-3 form-inputs-row">
                        <Form.Group as={Col} className="mb-3">
                            <Form.Control className="input_family" value={email} type="email" placeholder="seu@email.com" required onChange={(e) => setEmail(e.target.value)} />
                            <Form.Control.Feedback type="invalid">Campo Obrigat&#243;rio.</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    {/* Message */}
                    <Row className="mb-3 form-inputs-row">
                        <Form.Group className="mb-3" >
                            <Form.Control className="input_family" value={message} placeholder="Mensagem" as="textarea" rows={3} required type="text" onChange={(e) => setMessage(e.target.value)} />
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

export default ContactFormFunc;