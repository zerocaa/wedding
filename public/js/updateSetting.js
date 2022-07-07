/* eslint-disable */
import { showAlert } from './alert';
import axios from 'axios';

const baseUrl = "https://wedding-production-052d.up.railway.app";

//export const update DataUser
export const updateSettings = async (data, type) => {
  try {
    const url = type === "password" ? `${baseUrl}/api/v1/users/updateMyPassword`
    : `${baseUrl}/api/v1/users/updateMe`;
    const res = await axios({
      method: 'PATCH',
      url,
      data
    });
    if (res.data.status === 'success') {
      showAlert('success', `${type.toLowerCase()} update success`);
      location.reload(true) 
    } 
   showAlert('DATA UPDATE SUCCESS', `${type.toLowerCase()} update success`);
  } catch (err) {
    console.log(err.response);
    showAlert('error', 'login failed, please try again');
  }
};
