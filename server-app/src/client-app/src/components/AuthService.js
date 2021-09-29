import axios from "axios";
import { AUTH_API_URL } from '../Constants';
import { API_URL } from '../Constants';

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
export const ID_SESSION_ATTRIBUTE_NAME = 'authenticatedid'

class AuthService {

    //executes data retrieval based on jpa // from database
    executeJwtAuthenticationService(username, password) {
        return axios.post(`${AUTH_API_URL}`, {
            username,
            password
        })

    }

    executeJwtUpdateService(username, password, id) {
        return axios.put(`${API_URL}/${id}`, {
            username,
            password
        })

    }
    executeJwtDeleteService(id) {
        return axios.delete(`${API_URL}/${id}`, {

        })

    }

    //confirms successful login with jpa 
    registerSuccessfulLoginForJwt(username, id, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        sessionStorage.setItem(ID_SESSION_ATTRIBUTE_NAME, id)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }
    //creates login token for JPA
    createJWTToken(token) {
        return 'Bearer ' + token
    }

    //handles logout
    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }
    //handles login in there is a session item in storage 
    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) {
            return false;
        }
        else {
            return true;
        }
    }
    //retrieves logged in username
    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) {
            return '';
        }
        else {
            return user;
        }
    }
    getLoggedInID() {
        let ID = sessionStorage.getItem(ID_SESSION_ATTRIBUTE_NAME)
        if (ID === null) {
            return '';
        }
        else {
            return ID;
        }
    }


    setupAxiosInterceptors(basicAuthHeader) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = basicAuthHeader
                }
                return config
            }
        )
    }
}

export default new AuthService()