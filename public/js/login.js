/* eslint-disable */
import { showAlert } from './alert';
import axios from 'axios';
import { base } from 'mongoose/lib/query';

export const login = async (email,password) => {
    console.log(email,password);
    try{
        const res = await axios({
          method: 'POST',
          url: 'http://localhost:3000/api/v1/users/login',
          data: {
            email,
            password
          }
        });
        if (res.data.status === 'success') {
            showAlert('success', 'Logged in successfully!');
            window.setTimeout(() => {
              location.assign('/');
            }, 1500);
        }
    }
    catch(err) {
        showAlert('error', err.response.data.message);
     }
  };
  // exports func logout
export const logout = async () => {
    try{
        const res = await axios({
          method: 'GET',
          url: 'http://localhost:3000/api/v1/users/logout'
        });
      if ((res.data.status = 'success')) {
        showAlert('success', 'logout success');
      
        window.setTimeout(() => {
          location.assign('/');
        }, 1500);
      }
       } 
    catch(err) {
        showAlert('error', 'login failed, please try again');
     }
}
//const signup
export const signup = async (name,email,password,passwordConfirm) => {
    try{
        const res = await axios({
          method: 'POST',
          url: 'http://localhost:3000/api/v1/users/signup',
          data: {
            name,
            email,
            password,
            passwordConfirm
          }
        });
        if (res.data.status === 'success') {
            showAlert('success', 'Signup success');
            window.setTimeout(() => {
              location.assign('/');
            }, 1500);
        } else {
            showAlert('error', res.data.message);
        }
    }
    catch(err) {
        showAlert('error', err.response.data.message);
     }
}

export const forgotPassword = async (email) => {
    try{
        const res = await axios({
          method: 'POST',
          url: 'http://localhost:3000/api/v1/users/forgotPassword',
          data: {
            email
          }
        });
        if (res.data.status === 'success') {
            showAlert('success', 'Email Sent!!Please check your Email!');
            window.setTimeout(() => {
              location.assign('/');
            }, 1500);
        } else {
            showAlert('error', res.data.message);
        }
    }
    catch(err) {
        showAlert('error', err.response.data.message);
     }
}

export const resetPassword = async (password, passwordConfirm, token) => {
    try{
        const res = await axios({
          method: 'PATCH',
          url: '${baseUrl}/api/v1/users/resetPassword/${token}',
          data: {
            password,
            passwordConfirm,
          }
        });
        if (res.data.status === 'success') {
            showAlert('success', 'Password Changed Successfully!');
            window.setTimeout(() => {
              location.assign('/');
            }, 1500);
        } else {
            showAlert('error', res.data.message);
        }
    }
    catch(err) {
        showAlert('error', err.response.data.message);
     }
}