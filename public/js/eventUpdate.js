import { showAlert } from './alert';
import axios from 'axios';

export const eventUser = async (eventId, name, date, time, address, map) => {
  // const test = await axios(`http://localhost:3000/api/v1/events/${eventId}`);
  // console.log(test);
  //   if (test.data.status === 'success') {
  //     showAlert('success', 'Update success');
  //     window.setTimeout(() => {
  //       location.assign(`/api/v1/events/${eventId}`);
  //     }, 1500);
  //   }
  try {
    const res = await axios({
      method: 'PUT',
      url: `http://localhost:3000/api/v1/events/${eventId}`,
      data: {
        name,
        date,
        time,
        address,
        map
      }
    });
    if (res.data.status === 'success') {
      location.reload(true);
      showAlert('success', 'Update success');
    }
  } catch (err) {
    console.log(err.response);
    showAlert('error', 'Error, please try again');
  }
}
 

export const createEvent = async wedding => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/events',
      data: {
        wedding
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Create success');
      location.reload(true);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const deleteEvent = async courseId => {
  try {
      const res = await axios({
        method: 'DELETE',
             url: `http://localhost:3000/api/v1/events/${courseId}`
      });
    console.log(res);
           if (res) {
             showAlert('success', 'Delete success');
             location.reload(true);
           }
         } catch (err) {
           showAlert('error', 'Error, please try again');
         }
       };