import * as session from 'browser-store';
import Cookies from 'universal-cookie';
import { AUTH_KEY } from '../constants/generalConstants';

class ClientSession {
    static authkey = AUTH_KEY;
    static loggedin = null;
    static cookies = new Cookies();

    static storeAuth = (value, func) => {
        session.put(ClientSession.authkey, value, (err) => func(err));
    };

    static getAuth = (reciverfunc) => {
        session.get(ClientSession.authkey, (err, value) => reciverfunc(err, value));
    };

    static removeAuth = (func) => {
        session.remove(ClientSession.authkey, (err) => {
            func(err);
        });
    };

    static isLoggedIn = (func) => {
        ClientSession.getAuth((err, value) => {
            if (err) {
                console.error(err);
                func(false);
            } else {
                if (value == null) {
                    // check if loggedin from third party
                    if (ClientSession.cookies.get('access_token')) {
                        ClientSession.storeAuth({
                            'userId': ClientSession.cookies.get('userId', (err) => {}),
                            'id': ClientSession.cookies.get('access_token', (err) => {})
                        }, (err) => {});
                        func(true)
                    } else {
                        ClientSession.removeAuth((err) => {});
                        func(false);
                    }
                } else if ((new Date(value.created)).getTime() + value.ttl >= (new Date().getTime())) {
                    func(true);
                } else {
                    ClientSession.removeAuth((err) => {});
                    func(false);
                }
            }
        });
    };

    static getToken = () => {

        if (ClientSession.isLoggedIn()) {

            ClientSession.getAuth((err, value) => {
                if (err) {
                    console.error(err);
                    return false;
                } else {
                    return value.id;
                }
            })
        }

    };

    static getAccessToken = (callback) => {

        ClientSession.isLoggedIn(function(isLoggedIn) {
            if (isLoggedIn) {
                ClientSession.getAuth((err, value) => {
                    if (err) {
                        console.error(err);
                        callback(false, err);
                    } else {
                        callback(true, value)
                    }
                })
            } else {
                callback(false, null);
            }
        });

    };
}

export default ClientSession;