/**
 * Created by pc on 4/7/18.
 */
import axios from '../services/apiMiddleware';
// import ClientSession from './client-session.js';

import { API_BASE_URL } from '../constants/apiConstants'
import AuthService from './authService.js';


export default class LModel {

  static API_BASE_URL = API_BASE_URL;


  static create(pluralName, data, filter = null) {
    // console.log('> form data', data)
    let url = pluralName;
    if (filter) url += '?' + filter;

    return new Promise(function (resolve, reject) {
        axios.post(url, data)
          .then(response => resolve(response))
          .catch(error => reject(error));
      });
  }

  static createRelated(parentName, childName, id, data) {
    let url = parentName + '/' + id + '/' + childName;

    return new Promise(function (resolve, reject) {
        axios.post(url, data)
          .then(response => resolve(response))
          .catch(error => reject(error));

      });
  }

  static find(pluralName, id, filter) {

    let url = pluralName;

    if (id) url += '/' + id;
    if (filter) url += '?' + filter;


    return new Promise(function (resolve, reject) {

        axios.get(url)
          .then(response => resolve(response))
          .catch(error => reject(error));

      });
  }

  static findRelated(parentName, childName, id, filter) {
    let url = parentName + '/'
    if (id) url += id + '/';
    url += childName;
    //
    // if(id) url += '/' + id;
    if (filter) url += '?' + filter;

    return new Promise(function (resolve, reject) {
        axios.get(url)
          .then(response => resolve(response))
          .catch(error => reject(error));

      });
  }

  static update(pluralName, id, data) {

    let url = pluralName + '/' + id;

    return new Promise(function (resolve, reject) {

        axios({
          method: 'patch',
          url: url,
          data: data
        }).then(response => resolve(response))
          .catch(error => reject(error));

      });
  }

  static updateRelated(parentName, childName, parentId, childId, data) {

    let url = parentName + '/' + parentId + '/' + childName;
    if (childId) url = url + '/' + childId;

    return new Promise(function (resolve, reject) {

        axios({
          method: 'put',
          url: url,
          data: data
        }).then(response => resolve(response))
          .catch(error => reject(error));

      });

  }

  static destroy(pluralName, id) {

    let url = pluralName + '/' + id;

    return new Promise(function (resolve, reject) {
        axios({
          method: 'delete',
          url: url
        }).then(response => resolve(response))
          .catch(error => reject(error));

      });
  }

  static destroyRelated(parentName, childName, id, filter) {
    let url = parentName + '/' + id + '/' + childName;

    if (filter) url += '?' + filter;

    return new Promise(function (resolve, reject) {
        axios({
          method: 'delete',
          url: url
        }).then(response => resolve(response))
          .catch(error => reject(error));

      });
  }

  static destroyRelatedById(parentName, childName, parentId, childId) {
    let url = `${API_BASE_URL}${parentName}/${parentId}/${childName}/${childId}`;

    return new Promise(function (resolve, reject) {

        axios({
          method: 'delete',
          url: url
        }).then(response => resolve(response))
          .catch(error => reject(error));

      });
  }

  static destroyAll(pluralName, whereJSON) {

    let url = pluralName;

    // let config = {
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // };

    let formData = new FormData();
    formData.append('where', JSON.stringify(whereJSON));

    return new Promise(function (resolve, reject) {

        axios({
          method: 'delete',
          url: url,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: 'where=' + JSON.stringify(whereJSON)
        }).then(response => resolve(response))
          .catch(error => reject(error));

      });
  }

  static upload(container, files, progressCallback) {
    let url = 'Containers/' + container + '/upload';

    let config = {
      onUploadProgress: progressCallback,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    let data = new FormData();
    for (let i in files)
      data.append('data', files[i]);
    // console.log('> upload url', url)
    return new Promise(function (resolve, reject) {
      const isLoggedIn = AuthService.is_logged_in()
      let authData = AuthService.get_token()
      if (isLoggedIn && authData != null) {
        url += '?&access_token=' + authData.id;
      }

        axios.post(url, data, config)
          .then(response => resolve(response))
          .catch(error => reject(error));

      });
  }

  static deleteFile(container, file) {
    let url = 'Containers/' + container + '/files/' + file;

    return new Promise(function (resolve, reject) {

        axios({
          method: 'delete',
          url: url
        }).then(response => resolve(response))
          .catch(error => reject(error));

    });
  }

  static deleteFiles(container, files) {
    let url = 'Containers/deleteFiles';
    let options = { container, files };

    return new Promise(function (resolve, reject) {

        axios.post(url, options)
          .then(response => resolve(response))
          .catch(error => reject(error));

    });
  }

  static replace(pluralName, data) {

    let url = pluralName;

    return new Promise(function (resolve, reject) {
        axios.put(url, data)
          .then(response => resolve(response))
          .catch(error => reject(error));
    });
  }

  static buildErrorMessage(response) {
    let messageText = '';
    if (response.error && (response.error.statusCode === 422) && response.error.details) {
      let messages = response.error.details.messages;
      Object.keys(messages).forEach(function (key) {
        messageText += `${key.charAt(0).toUpperCase()}${key.slice(1)} : ${messages[key]}`;
      });
      return messageText;
    } else {
      messageText = 'Oops! Something went wrong';
    }

  }

}
