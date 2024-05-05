import axios from 'axios';
import { toast } from 'bulma-toast'
import AuthService from './authService';
// const URL = 'http://185.136.165.131';
// const URL = 'http://35.230.142.171/';
// export const URL = 'http://165.227.163.68:3000/api/'
// export const URL = 'http://192.168.1.3:8000/api/'
// export const URL = 'http://192.168.43.5:8000/api/'
export const URL = 'https://api.bluespaceportal.com/api/'
// export const URL = 'http://138.68.60.234:8000/api/'


// export const URL = 'http://192.168.0.108:3000/api/'
// export const URL = 'http://10.6.155.132:3000/api/'
// export const URL = 'http://10.4.117.21:8000/api' // aau 4kilo staff 

const AxiosInstance = axios.create({
  baseURL: URL,
  proxy: false,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

AxiosInstance.interceptors.request.use(
  async (config) => {
    config.baseURL = URL
    try {
      config.url = `${config.url}${config.url.split('?').length === 2 ? '&' : '?'}access_token=${AuthService.is_logged_in() ? AuthService.get_token().id : ''}`
    } catch (error) {
      console.log('error getting token', error)
    }

    //   console.log(config.url, 'urll....................')
    // config.url = `${config.url}?access_token${await AsyncStorage.getItem('token')}`
    return config
  },
  request => {
    // console.log('Requsting ..... ')
    // console.log(request)
    return request;
  },
  error => Promise.reject(error)
);

AxiosInstance.interceptors.response.use(
  response => {
    // console.log(response, '.........................')
    // if(response.data.errorCode !== undefined && response.data.errorCode !== null && response.data.errorCode !== '') {
    //   Alert.alert(response.data.detail);
    //   console.log('Error case intercepted')
    //   console.log(response);
    //   return  Promise.reject(response.data)
    // }
    return response.data
  },
  (error) => {
    //   console.log(error, 'error>>>>>>>>>>>>..')
    if (!error.response) {
      toast({
        message: "Network Error!",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true
      });
      // console.log('Network Error >>>>>>', error)
      // return dispatch({ type: 'NETWORK_FAILURE' });
    } else if (error.response.status === 500) {
      toast({
        message: "Server Error!",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true
      });
    } else if (error.response.status === 404) {
      // Alert.alert('Endpoint doesn\'t exist!');
      console.log('404')
    } else if (error.response.status === 401) {
      toast({
        message: "Not Authorized!",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true
      });
    } else if (error.response.status === 400) {
      toast({
        message: "Error, Try Again!",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true
      });
    } else if (error.response.status === 422) {
      toast({
        message: "Some inputs are invalid! Try Again",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true
      });
    } else {
      // if(error.response.data.hint.message !== undefined){
      //   Alert.alert(JSON.stringify(error.response.data.hint.message));
      // }else {
      //   Alert.alert(JSON.stringify(error.response.data.hint));
      // }
    }

    // handle the errors due to the status code here
    return Promise.reject(error.response);
  },
);

export default AxiosInstance;