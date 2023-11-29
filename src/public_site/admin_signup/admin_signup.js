/* ---Dependencies--- */
import 'bootstrap/dist/css/bootstrap.min.css';
import zxcvbn from 'zxcvbn';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
/* ---Bootstrap--- */
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
/* ---My Files--- */
import './admin_signup.scss'
import { create_iv, encrypt_data } from '../../unique/crypto';
/* ---envs--- */
const NODE_ENV = process.env.NODE_ENV;
const LOCAL_URL = process.env.REACT_APP_LOCAL_URL;

function AdminSignup() {
    const navigate = useNavigate();
    /* ---input field values--- */
    const [email, set_email] = useState("");
    const [password, set_password] = useState("");
    const [password2, set_password2] = useState("");
    const [phone, set_phone] = useState("");
    /* ---input field feedback--- */
    const [password_strength, set_password_strength] = useState("");
    const [password_strength_color, set_password_strength_color] = useState(0);
    const [password_validity, set_password_validity] = useState(false);
    const [password_invalidity, set_password_invalidity] = useState(false);
    const [password2_validity, set_password2_validity] = useState(false);
    const [password2_invalidity, set_password2_invalidity] = useState(false);
    const [email_validity, set_email_validity] = useState(false);
    const [email_invalidity, set_email_invalidity] = useState(false);
    const [phone_validity, set_phone_validity] = useState(false);
    const [phone_invalidity, set_phone_invalidity] = useState(false);
    /* ---on submit = true--- */
    const [validated, setValidated] = useState(false);
    /* reveals_password--- */
    const [show_password, set_show_password] = useState("password");
    const [is_checked, set_is_checked] = useState(false);

    function reveal_password() {
        set_is_checked(!is_checked);
        if (is_checked === true) {
            set_show_password("password");
        } else {
            set_show_password("text");
        }
    }

    useEffect(() => {
        /*---Validators-------------------------------------------------------------------------------------------------------*/
        function validate_password_strength(e) {
            const result = zxcvbn(e);
            const score = result.score; // 0 to 4, with 4 being the strongest
            if (score === 0) {
                set_password_strength(20);
                set_password_strength_color("danger");
            }
            if (score === 1) {
                set_password_strength(40);
                set_password_strength_color("danger");
            }
            if (score === 2) {
                set_password_strength(60);
                set_password_strength_color("warning");
            }
            if (score === 3) {
                set_password_strength(80);
                set_password_strength_color("info");
            }
            if (score === 4) {
                set_password_strength(100);
                set_password_strength_color("success");
            }
            if (e === "") {
                set_password_strength(0);
            }
            if (score > 2) { set_password_validity(false); set_password_invalidity(false); }
            if (score > 2 && validated === true) { set_password_validity(true); set_password_invalidity(false); }
            if (score < 3 && validated === true) { set_password_validity(false); set_password_invalidity(true); }
        }

        function validate_password_copy(e) {
            if (e === password && validated === true) { set_password2_validity(true); set_password2_invalidity(false); }
            else if (e !== password && validated === true) { set_password2_validity(false); set_password2_invalidity(true); }
        }

        function validate_email(e) {
            if (validator.isEmail(e) === false && validated === true) { set_email_validity(false); set_email_invalidity(true); }
            else if (validator.isEmail(e) === true && validated === true) { set_email_validity(true); set_email_invalidity(false); }
        }

        function validate_phone(e) {
            if (e.length < 11 && validated === true) { set_phone_validity(false); set_phone_invalidity(true); }
            else if (e.length >= 11 && validated === true) { set_phone_validity(true); set_phone_invalidity(false); }
        }
    /*--------------------------------------------------------------------------------------------------------------------*/

        validate_email(email);
        validate_password_strength(password);
        validate_phone(phone);
        validate_password_copy(password2);
    }, [email, password, password2, phone, validated]);
    
    /* ---onSubmit--- */
    async function handleSignin(event) {
        event.preventDefault(); //disable onSubmit redirect
        let location = {};
        const baseURL = NODE_ENV === 'production' ? '' : LOCAL_URL;
        setValidated(true); //submit button clicked

        //This is done by onEffect. Keeping it here just for a while till I'm sure it works
        //if (validator.isEmail(email) === false) { set_email_validity(true); set_email_invalidity(true); }
        //if (password_strength < 80) { set_password_validity(true); set_password_invalidity(true); }        
        //if (password !== password2) { set_password2_validity(true); set_password2_invalidity(true); }
        //if (phone.length < 11) { set_phone_validity(true); set_phone_invalidity(true); }

        if (password_strength >= 80 && validator.isEmail(email) === true && password === password2 && phone.length > 10) {
            await Axios.get('https://api-bdc.net/data/client-info')
                .then((response) => {
                    location = response.data;
                    if (!location.ipString) { location = {}; }
                })
                .catch((error) => { location = {}; })

            let data = {
                email: email,
                password: password,
                phone: phone,
                location: location,
                height: window.screen.height,
                width: window.screen.width
            };

            const iv = create_iv();
            data = encrypt_data(data, iv);
            const encrypted_data = {
                data: data,
                iv: iv
            }

            await Axios.post(`${baseURL}/adm/receive_signup`, JSON.stringify(encrypted_data),
                {
                    withCredentials: true,
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:60350/adm/receive_signup',
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    console.log("response: ", response.data);
                })
                .catch((error) => {
                    if (error.response && error.response.data) {
                        console.log("server: " + error.response.data);
                    } else {
                        console.log("front: " + error.message);
                    }
                });
        }
    };

    return (
        <div className="admin_signup_color flex flex_x_center flex_y_center">
            <div className="admin_signup_form">

                <Accordion className="admin_signup_accordion">
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
                        <Form.Control isValid={email_validity} isInvalid={email_invalidity} type="email" placeholder="" required
                            onChange={(e) => { set_email(e.target.value); }} />
                        <Form.Control.Feedback type="invalid">Formato Invalido</Form.Control.Feedback>
                        <label>Email</label>
                    </Form.Floating>

                    {/* Password */}
                    <Form.Floating className="mb-3">
                        <Form.Control isValid={password_validity} isInvalid={password_invalidity} type={show_password} placeholder="" autoComplete="new-password" required
                            onChange={(e) => { set_password(e.target.value); }} />
                        <label className="">Senha</label>
                        <Form.Control.Feedback type="invalid">Senha Muito Fraca!</Form.Control.Feedback>
                    </Form.Floating>

                    <Form.Floating className="mb-3">
                        <Form.Control isValid={password2_validity} isInvalid={password2_invalidity} type={show_password} autoComplete="new-password" placeholder="" required
                            onChange={(e) => { set_password2(e.target.value); }} />
                        <Form.Control.Feedback type="invalid">As senhas s&#227;o diferentes.</Form.Control.Feedback>
                        <label>Repetir Senha</label>
                    </Form.Floating>

                    <div>
                        <Form.Check className="admin_signup_text" id="keep_connection_form" aria-label="option 1" label="Revelar Senha" onChange={reveal_password} checked={is_checked} />
                        <div className="admin_signup_text" >For&#231;a da Senha:</div>
                        <div className="admin_signup_pass_bar"><ProgressBar variant={password_strength_color} now={password_strength} /></div>
                    </div>

                    {/* Phone */}
                    <Form.Floating className="mb-3">
                        <Form.Control isValid={phone_validity} isInvalid={phone_invalidity} placeholder="" inputMode="numeric" required
                            onChange={(e) => { set_phone(e.target.value); }} />
                        <Form.Control.Feedback type="invalid">Telefone invalido.</Form.Control.Feedback>
                        <label>Telefone</label>
                    </Form.Floating>

                        <Button className="admin_signup_button" variant="primary" type="submit">Criar Conta</Button>

                        <a href="/adm_signin" className="links">J&#225; Tenho Uma Conta.</a>

                </Form>
            </div>
        </div>
    );
}

export default AdminSignup;