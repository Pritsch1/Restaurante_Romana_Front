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
import Axios from 'axios';
import validator from 'validator';
import zxcvbn from 'zxcvbn';
/* ---Bootstrap--- */
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
/* ---My Files--- */
import './admin_signin.scss'
import { create_iv, encrypt_data } from '../../unique/crypto';
/* ---envs--- */
const NODE_ENV = process.env.NODE_ENV;
const LOCAL_URL = process.env.REACT_APP_LOCAL_URL;

function AdminSignin() {
    const navigate = useNavigate();
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
    const [is_checked, set_is_checked] = useState(false);

    function keep_connection() {
        set_is_checked(!is_checked);
    }

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
        const baseURL = NODE_ENV === 'production' ? '' : LOCAL_URL;
        let location = {};        
        setValidated(true); //submit button clicked

        //This is done by onEffect. Keeping it here just for a while till I'm sure it works
        //if (validator.isEmail(email) === false) { set_email_validity(true); set_email_invalidity(true); }
        //if (score < 3) { set_password_validity(true); set_password_invalidity(true); }

        if (validator.isEmail(email) === true && password_strength > 2) {
            await Axios.get('https://api-bdc.net/data/client-info')
                .then((response) => {
                    location = response.data;
                    if (!location.ipString) { location = {}; }
                })
                .catch((error) => { location = {} })

            let data = {
                email: email,
                password: password,
                location: location,
                keep_connected: is_checked,
                height: window.screen.height,
                width: window.screen.width
            };
            const iv = create_iv();
            data = encrypt_data(data, iv);
            const encrypted_data = {
                data: data,
                iv: iv
            }

            await Axios.post(`${baseURL}/adm/receive_signin`, JSON.stringify(encrypted_data),
                {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:60350/adm/receive_signin',
                    'Content-Type': 'application/json'
          }})
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

        if (1 === 2) {
            navigate("/");
        }
    };

    return (
        <div className="admin_signin_color flex flex_x_center flex_y_center">
            <div className="admin_signin_form">
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
                        <label htmlFor="signin_email">Email</label>
                    </Form.Floating>

                    {/* Password */}
                    <Form.Floating className="mb-3">
                        <Form.Control isValid={password_validity} isInvalid={password_invalidity} id="signin_password" type="password" placeholder="" required
                            onChange={(e) => { set_password(e.target.value); }} />
                        <label htmlFor="signin_password">Senha</label>
                    </Form.Floating>

                    <Form.Check className="admin_signin_text" id="keep_connection_form" aria-label="option 1" label="Manter Conectado" onChange={keep_connection} checked={is_checked} />

                    <Button className="admin_signin_button" variant="primary" type="submit">Entrar</Button>

                    <a href="/adm_signup" className="links" >Esqueci a Senha</a>
                    <br />
                    <a href="/adm_signup" className="links">Criar Conta</a>

                </Form>
            </div>
        </div>
    );
}
export default AdminSignin;