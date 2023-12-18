/*
Generate Random string
www.youtube.com/watch?v=AzA_LTDoFqY&ab_channel=SamMeech-Ward
frontendmasters.com/courses/web-auth-apis/
www.epicweb.dev/
owasp.org/www-community/attacks/
expressjs.com/en/api.html
www.youtube.com/watch?v=RNyNttTFQoc&ab_channel=MafiaCodes
poe.com/login
www.twilio.com/en-us
Start git repos from scratch. Might have some api keys there :)
*/





/* ---Dependencies--- */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';
import zxcvbn from 'zxcvbn';
/* ---Bootstrap--- */
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
/* ---My Files--- */
import './admin_signin.scss'
import { create_iv, encrypt_data } from '../../unique/crypto';
/* ---envs--- */
const NODE_ENV = process.env.NODE_ENV;
const LOCAL_URL = process.env.REACT_APP_LOCAL_URL;

function AdminSignin() {
    /* ---Navigation--- */
    const baseURL = NODE_ENV === 'production' ? '' : LOCAL_URL;
    const navigate = useNavigate(); 
    const path = sessionStorage.getItem("path");
    const [account_created, set_account_created] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data_not_found, set_data_not_found] = useState(false);
    const [login_button, set_login_button] = useState("Entrar");
    /* ---input field values--- */
    const [email, set_email] = useState("");
    const [password, set_password] = useState("");
    /* ---input field feedback--- */
    const [email_validity, set_email_validity] = useState(false);
    const [email_invalidity, set_email_invalidity] = useState(false);
    const [password_validity, set_password_validity] = useState(false);
    const [password_invalidity, set_password_invalidity] = useState(false);
    const [password_strength, set_password_strength] = useState(0);
    /* ---on submit = true--- */
    const [validated, setValidated] = useState(false);
    /* ---Keep Loggedin--- */
    const [is_checked_keep_connection, set_is_checked_keep_connection] = useState(false);
    /* reveals_password--- */
    const [show_password, set_show_password] = useState("password");
    const [is_checked_password, set_is_checked_password] = useState(false);

    function keep_connection() {
        set_is_checked_keep_connection(!is_checked_keep_connection);
    }

    function reveal_password() {
        set_is_checked_password(!is_checked_password);
        if (is_checked_password === true) {
            set_show_password("password");
        } else {
            set_show_password("text");
        }
    }

    useEffect(() => {
        axios.post(`${baseURL}/adm/prevent`, JSON.stringify({}),
            {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:60350/adm/auth',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                //console.log("response: ", response.data);
                if (response.data === true) { navigate(path || "/pedidos"); }
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    //console.log("server: " + error.response.data);
                } else {
                    //console.log("front: " + error.message);
                }
            });
    }, [baseURL, navigate, path]);

    useEffect(() => {
        /*---Validators-------------------------------------------------------------------------------------------------------*/
        function validate_password_strength(e) {
            const result = zxcvbn(e);
            const score = result.score; // 0 to 4, with 4 being the strongest

            set_password_strength(score);
            if (score > 2) { set_password_validity(true); set_password_invalidity(false); }
            if (score < 3 && validated === true) { set_password_validity(false); set_password_invalidity(true); }
        }

        function validate_email(e) {
            if (validator.isEmail(e) === false && validated === true) { set_email_validity(false); set_email_invalidity(true); }
            else if (validator.isEmail(e) === true && validated === true) { set_email_validity(true); set_email_invalidity(false); }
        }
        /*--------------------------------------------------------------------------------------------------------------------*/

        validate_email(email);
        validate_password_strength(password);
    }, [email, password, validated]);

    /* ---onSubmit--- */
    async function handleSignin(event) {
        event.preventDefault(); //disable onSubmit redirect
        let location = {};
        setValidated(true); //submit button clicked

        //This is done by onEffect. Keeping it here just for a while till I'm sure it works
        //if (validator.isEmail(email) === false) { set_email_validity(true); set_email_invalidity(true); }
        //if (score < 3) { set_password_validity(true); set_password_invalidity(true); }

        if (validator.isEmail(email) === true && password_strength > 2) {
            setLoading(true);
            set_data_not_found(false);
            set_login_button(<Spinner size="sm" animation="border" />);

            await axios.get('https://api-bdc.net/data/client-info')
                .then((response) => {
                    location = response.data;
                    if (!location.ipString) { location = {}; }
                })
                .catch((error) => { location = {} })

            let data = {
                email: email,
                password: password,
                location: location,
                keep_connected: is_checked_keep_connection,
                height: window.screen.height,
                width: window.screen.width
            };
            const iv = create_iv();
            data = encrypt_data(data, iv);
            const encrypted_data = {
                data: data,
                iv: iv
            }

            await axios.post(`${baseURL}/adm/receive_signin`, JSON.stringify(encrypted_data),
                {
                    withCredentials: true,
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:60350/adm/receive_signin',
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    //console.log("response: ", response.data);
                    setLoading(false);
                    set_login_button("Entrar");
                    navigate(path || "/pedidos");
                })
                .catch((error) => {
                    setLoading(false);
                    set_login_button("Entrar");
                    if (error.response.data === "Data not found") {
                        set_data_not_found(true);
                    } else if (error.response.data === "Not Authorized") {
                        set_account_created(true);
                    }

                    if (error.response && error.response.data) {
                        //console.log("server: " + error.response.data);
                    } else {
                        //console.log("front: " + error.message);
                    }
                });
        }
    };

    return (
        <div className="admin_signin_color flex flex_x_center flex_y_center">
            {account_created ? (
                <ToastContainer
                    className="p-3"
                    position="middle-center"
                    style={{ zIndex: 1 }}
                >
                    <Toast bg="success">
                        <Toast.Header closeButton={false}>
                            <strong className="me-auto">Conta Criada</strong>
                            <small>Aguardando Confirma&#231;&#227;o</small>
                        </Toast.Header>
                        <Toast.Body className="admin_signin_toast">Por favor aguarde o administrador de sistema fazer a libera&#231;&#227;o do seu acesso.</Toast.Body>
                    </Toast>
                </ToastContainer>
            ) : (
                <div className="admin_signin_form">
                    {/* Loading Spinner */}
                    {loading && (
                        <div className="loading_box">
                            <div className="flex flex_x_center">
                                <Spinner animation="border" variant="success" role="status" />
                            </div>
                            <div className="loading_text">Loading...</div>
                        </div>
                    )}

                    <Accordion className="admin_signin_accordion">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Restaurante Romana</Accordion.Header>
                            <Accordion.Body>
                                Este sistema &#233; destinado para opera&#231;&#245;es do restaurante.
                                Em caso de d&#250;vidas, bugs ou sugest&#245;es informe
                                a Romana e ela encaminha para o desenvolvedor.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    <Form noValidate onSubmit={handleSignin}>

                        {/* Email */}
                        <Form.Floating className="mb-3">
                            <Form.Control isValid={email_validity} isInvalid={email_invalidity} id="signin_email" type="email" placeholder="" required
                                onChange={(e) => { set_email(e.target.value); }} />
                            <Form.Control.Feedback type="invalid">Formato Invalido</Form.Control.Feedback>
                            <label htmlFor="signin_email">Email</label>
                        </Form.Floating>

                        {/* Password */}
                        <Form.Floating className="mb-3">
                                <Form.Control isValid={password_validity} isInvalid={password_invalidity} id="signin_password" type={show_password} placeholder="" required
                                onChange={(e) => { set_password(e.target.value); }} />
                            <label htmlFor="signin_password">Senha</label>
                        </Form.Floating>

                            <div>
                                <Form.Check className="admin_signup_text" id="reveal_password" aria-label="option 1" label="Revelar Senha" onChange={reveal_password} checked={is_checked_password} />
                                <Form.Check className="admin_signin_text" id="keep_connection_form" aria-label="option 1" label="Manter Conectado" onChange={keep_connection} checked={is_checked_keep_connection} />
                            </div>                        

                            {data_not_found && (
                                <div className="admin_signin_datanotfound">
                                    Dados incorretos. Verifique seu email e/ou senha.
                                </div>
                            )}

                        <Button className="admin_signin_button" variant="primary" type="submit">{login_button}</Button>

                        <a href="/adm_signup" className="links" >Esqueci a Senha</a>
                        <br />
                        <a href="/adm_signup" className="links">Criar Conta</a>

                    </Form>
                </div>
            )}
        </div>
    );
}
export default AdminSignin;