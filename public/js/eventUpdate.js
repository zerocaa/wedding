import { showAlert } from './alert';
import axios from 'axios';

export const eventUser = async (data,eventId) =>{
    try {
         const event = await axios({
           method: 'PATCH',
           url: `http://localhost:3000/api/v1/event/${eventId}`,
           data
         });
         if (res.data.status === 'success') {
           showAlert(
             'success',
             `${type.toLowerCase()} update success`
           );
           location.reload(true);
         }
         showAlert(
           'DATA UPDATE SUCCESS',
           `${type.toLowerCase()} update success`
         );
    }
    catch (err) {
    console.log(err.response);
    showAlert('error', 'login failed, please try again');
    }
}