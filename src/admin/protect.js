/* ---Dependencies--- */
import Axios from 'axios';
import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
/* ---envs--- */
const NODE_ENV = process.env.NODE_ENV;
const LOCAL_URL = process.env.REACT_APP_LOCAL_URL;

const Protect = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuthentication = async () => {

            const baseURL = NODE_ENV === 'production' ? '' : LOCAL_URL;

            await Axios.post(`${baseURL}/adm/auth`, JSON.stringify({}),
                {
                    withCredentials: true,
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:60350/adm/auth',
                        'Content-Type': 'application/json',
                    },
                }
            )
                .then((response) => {
                    setIsAuthenticated(response.data);
                })
                .catch((error) => {
                    console.error('Error checking authentication:', error.message);
                    setIsAuthenticated(false);
                });
        };

        checkAuthentication();
    }, []);

    if (isAuthenticated === null) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/adm_signin" />;
};

export default Protect;