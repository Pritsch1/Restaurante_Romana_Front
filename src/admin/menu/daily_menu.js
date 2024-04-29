/* ---Dependencies--- */
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react"
import axios from 'axios';
/* ---Bootstrap--- */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Table from 'react-bootstrap/Table';
/* ---My Files--- */
import './daily_menu.scss'
import mytext from './daily_menu_format';
/* ---envs--- */
const NODE_ENV = process.env.NODE_ENV;
const LOCAL_URL = process.env.REACT_APP_LOCAL_URL;

function DailyMenu() {
    /* ---Others--- */
    const [menu_preview, set_menu_preview] = useState("");
    const baseURL = NODE_ENV === 'production' ? '' : LOCAL_URL;
    const [toast, set_toast] = useState(false);
    /* ---Tracks the input and dropdown focused--- */
    const [focused_input, set_focused_input] = useState([null, null]);
    /* ---Switches between editing and preview--- */
    const [show_fields, set_show_fields] = useState(true);
    const [show_preview, set_show_preview] = useState(false);
    /* ---DataBase Items--- */
    const [db_side, set_db_side] = useState([]);
    const [db_main, set_db_main] = useState([]);
    const [db_bread, set_db_bread] = useState([]);
    /* ---Holds the values typed by the user at the input fields--- */
    const [sides, set_sides] = useState(["", "", "", "", ""]);
    const [mains, set_mains] = useState(["", "", "", "", "", "", "", ""]);
    const [bread, set_bread] = useState([""]);

    /* ---Get Menu From Db--- */
    useEffect(() => {
        axios.get(`${baseURL}/adm_menu/query_menu`, {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:60350/adm_menu/query_menu',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                let main = response.data.main_dish;
                let side = response.data.side_dish;
                let len = main.length > side.length ? main.length : side.length;
                for (let i = 0; i < len; i++) {
                    if (main[i] !== undefined) {
                        set_db_main(prev => {
                            return [...prev, main[i]];
                        });
                    }
                    if (side[i] !== undefined) {
                        set_db_side(prev => {
                            return [...prev, side[i]];
                        });
                    }
                    set_db_bread(["adasd"])
                }
            })
            .catch((error) => {
                console.error('Error fetching items:', error)
            });
    }, [baseURL]);

    /* ---Makes the new focused input empty--- */
    useEffect(() => {
        /*if (focused_input[0] !== null) {
            document.getElementById(focused_input[0]).focus();
        }*/
        if (focused_input[0] !== null) {
            const focusedElement = document.getElementById(focused_input[0]);

            if (focusedElement) {
                focusedElement.focus();

                focusedElement.scrollIntoView({
                    behavior: 'auto',
                    block: 'center'
                });
            }
        }

    }, [focused_input, sides, mains]);

    function change_focus(id) {
        document.getElementById(id).focus();
    }

    /* ---Handle Input Fields--- */
    function record_input(e, index, current_values, dish) {
        const value = e;
        const list = [...current_values];
        list[index] = value;
        set_new_list(list, dish);
    };

    function remove_input_field(index, current_values, dish) {
        const list = [...current_values];
        list.splice(index, 1);
        set_new_list(list, dish);
    };

    function set_new_list(list, dish) {
        if (dish === "side") { set_sides(list); }
        if (dish === "main") { set_mains(list); }
        if (dish === "bread") { set_bread(list); }
    }

    function add_input_field(current_values, dish) {
        if (dish === "side") { set_sides([...current_values, ""]); }
        if (dish === "main") { set_mains([...current_values, ""]); }
        if (dish === "bread") { set_bread([...current_values, ""]); }
    };

    function render_dropdown(input, db_array) {
        //set_filtered_items([]);
        let match = [];
        match = db_array.filter((item) => {

            return item.toLowerCase().includes(input.toLowerCase());
        })
        //set_filtered_items(match);
        return match;
    }

    function copy_menu() {
        window.navigator.clipboard.writeText(menu_preview);
    }

    /* ---see preview--- */
    function on_confirm() {
        set_show_fields(!show_fields); //TESTING
        set_show_preview(!show_preview);
        set_menu_preview(mytext);
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
        const yyyy = today.getFullYear();
        let inserted_values = mytext;
        let side_formated = ""
        let main_formated = ""
        let bread_formated = "> *P\u{E3}o Especial*\n\n"
        let len = mains.length > sides.length ? mains.length : sides.length;
        for (let i = 0; i < len; i++) {
            if (sides[i] !== undefined) {
                side_formated += '* ' + sides[i] + '\n';
            }
            if (mains[i] !== undefined) {
                main_formated += '* ' + mains[i] + '\n';
            }
            if (bread[i] !== undefined && bread[i] !== "") {
                bread_formated += '* ' + bread[i] + '\n';
            }
        }
        inserted_values = inserted_values.replace(`$1`, `${dd}/${mm}/${yyyy}`);
        inserted_values = inserted_values.replace(`$2`, side_formated);
        inserted_values = inserted_values.replace(`$3`, main_formated);
        inserted_values = inserted_values.replace(`$4`, bread_formated);
        inserted_values = inserted_values.replace(`$5`, "23,00");
        inserted_values = inserted_values.replace(`$6`, "49,00");
        inserted_values = inserted_values.replace(`$7`, "21,00");
        inserted_values = inserted_values.replace(`$8`, "19,00");
        inserted_values = inserted_values.replace(`$9`, "15,00");
        set_menu_preview(inserted_values);
    }

    function display_new_items() {
        const new_sides = sides.filter(value => value !== '' && !db_side.includes(value));
        const new_mains = mains.filter(value => value !== '' && !db_main.includes(value));
        const new_breads = bread.filter(value => value !== '' && !db_bread.includes(value));

        return (<Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Prato</th>
                    <th>Nome</th>
                </tr>
            </thead>
            <tbody>
                {new_sides.map((item, index) => {
                    return (
                        <tr>
                        <td>{index + 1}</td>
                        <td>Carne</td>
                        <td>{item}</td>
                    </tr>
                    )
                })}
                {new_mains.map((item, index) => {
                    return (
                        <tr>
                            <td>{index + 1}</td>
                            <td>Acompanhamento</td>
                            <td>{item}</td>
                        </tr>
                    )
                })}
                {new_breads.map((item, index) => {
                    return (
                        <tr>
                            <td>{index + 1}</td>
                            <td>P&#227;o</td>
                            <td>{item}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>);
;        
    }

    const MENU_INPUTS_ELEMNT = ({ current_input_value, index, dish_type, inputed_values, db_array, min_inputs, max_inputs }) => {
        const dropdown_items = render_dropdown(current_input_value, db_array);
        let dropdown_item_rendered = false;

        return (
            <div className="flex flexcol gap10">
                <div className="flex flexrow gap10">
                    <InputGroup>
                        <Form.Control
                            name={`${dish_type}${index}`}
                            type="text"
                            id={`${dish_type}${index}`}
                            value={current_input_value}
                            onClick={() => set_focused_input([`${dish_type}${index}`, index])}
                            onChange={(e) => {
                                set_focused_input([`${dish_type}${index}`, index])
                                record_input(e.target.value, index, inputed_values, dish_type);
                            }}
                            onKeyDown={(e) => {
                                set_focused_input([`${dish_type}${index}`, index])
                                if ((e.nativeEvent.code === "ArrowDown" || e.nativeEvent.code === "Tab") && dropdown_item_rendered) {
                                    e.preventDefault();
                                    change_focus(`dropdown_id${dish_type}${0}`);
                                }
                                /*if (e.nativeEvent.code === "Tab" && !dropdown_item_rendered && sides[index + 1] !== undefined) {
                                    e.preventDefault();
                                    set_focused_input([`${dish_type}${index + 1}`, index + 1])
                                }*/
                            }}
                            onKeyUp={() => set_focused_input([`${dish_type}${index}`, index]) }
                        />
                        <Button onClick={() => record_input("", index, inputed_values, dish_type)} variant="danger">X</Button>
                    </InputGroup>

                    {inputed_values.length > min_inputs && (
                        <Button onClick={() => {
                            document.getElementById(`${dish_type}${index}`).blur();
                            set_focused_input([null, null]);
                            remove_input_field(index, inputed_values, dish_type);
                        }} variant="danger">-</Button>
                    )}

                </div>
                <div>
                    {focused_input[0] === `${dish_type}${index}` && dropdown_items[0] !== undefined && current_input_value !== "" && current_input_value !== dropdown_items[0] && (
                        <Dropdown className="d-inline mx-2" show={true}>
                            <Dropdown.Menu>
                                {dropdown_items.map((item, idx) => {
                                    dropdown_item_rendered = true;
                                    return (
                                        <Dropdown.Item
                                            key={`dropdown${dish_type}${idx}`}
                                            id={`dropdown_id${dish_type}${idx}`}
                                            onClick={() => {
                                                document.getElementById(`dropdown_id${dish_type}${idx}`).blur();
                                                const list = [...inputed_values];
                                                list[index] = item;
                                                if (dish_type === "side") { set_sides(list); }
                                                if (dish_type === "main") { set_mains(list); }
                                            }}
                                        >{item}</Dropdown.Item>
                                    )
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                </div>

                <div>
                    {inputed_values.length - 1 === index && inputed_values.length < max_inputs && (
                        <Button onClick={() => add_input_field(inputed_values, dish_type)} variant="success">Adicionar Item</Button>
                    )}
                </div>
            </div >
        )
    };

    return (
        <div className="flex flex_x_center daily_menu">
            <div className="flex flexcol daily_menu_container gap30">

                {/* ---Side Dish--- */}
                <div className="flex">
                    {show_fields && (
                        <div>
                            <h2>Carnes</h2>

                            {sides.map((current_input_value_param, index_param) => (
                                <MENU_INPUTS_ELEMNT
                                    current_input_value={current_input_value_param}
                                    index={index_param}
                                    dish_type="side"
                                    inputed_values={sides}
                                    db_array={db_side}
                                    key={`sides_div${index_param}`}
                                    min_inputs={1}
                                    max_inputs={8}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* ---Main Dish--- */}
                <div className="flex">
                    {show_fields && (
                        <div>
                            <h2>Acompanhamentos</h2>

                            {mains.map((current_input_value_param, index_param) => (
                                <MENU_INPUTS_ELEMNT
                                    current_input_value={current_input_value_param}
                                    index={index_param}
                                    dish_type="main"
                                    inputed_values={mains}
                                    db_array={db_main}
                                    key={`mains_div${index_param}`}
                                    min_inputs={1}
                                    max_inputs={12}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* ---Bread--- */}
                <div className="flex">
                    {show_fields && (
                        <div>
                            <h2>P&#227;o</h2>

                            {bread.map((current_input_value_param, index_param) => (
                                <MENU_INPUTS_ELEMNT
                                    current_input_value={current_input_value_param}
                                    index={index_param}
                                    dish_type="bread"
                                    inputed_values={bread}
                                    db_array={db_bread}
                                    key={`bread_div${index_param}`}
                                    min_inputs={1}
                                    max_inputs={4}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* ---Preview Hidden--- */}
                <div className="flex">
                    {show_fields && (
                        <div>
                            <h2>Preview do Menu</h2>
                            <Button onClick={on_confirm} variant={"success"}>Ver</Button>
                        </div>
                    )}
                </div>

                {/* ---Preview--- */}
                <div className="flex">
                    {show_preview && (
                        <div>
                            <h2>Preview do Menu</h2>

                            <div className="flex flexcol flex_x_center">
                                <div className="flex flexcol daily_menu_preview_container">
                                    <div className="daily_menu_phone_frame">
                                        <div className="daily_menu_message_preview">{menu_preview}</div>
                                    </div>
                                </div>
                                <div className="flex flexrow flex_x_center">
                                    <Button onClick={() => {
                                        on_confirm();
                                        set_toast(false);
                                    }} variant="danger">Editar</Button>
                                    <Button onClick={(e) => {
                                        copy_menu(e.target.value);
                                        set_toast(true);
                                    }} variant="success">COPIAR! CO PI AR!</Button>
                                </div>
                            </div>

                        </div>
                    )}
                </div>

                <div className="flex">
                {toast && (
                <ToastContainer
                    className="p-3"
                    position="middle-center"
                    style={{ zIndex: 1 }}
                >
                    <Toast bg="light">
                        <Toast.Header closeButton={false}>
                            <strong className="me-auto">Novos Items</strong>
                        </Toast.Header>
                                <Toast.Body className="daily_menu_toast">{display_new_items()}</Toast.Body>
                                <Button variant="success">Adicionar</Button>
                                <Button onClick={() => { set_toast(false) }} variant="danger">Descartar</Button>
                    </Toast>
                    </ToastContainer>
                )}
                </div>

            </div>
        </div >
    );
}

export default DailyMenu;