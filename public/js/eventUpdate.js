import { showAlert } from './alert';
import axios from 'axios';

const baseUrl = "https://wedding-production-09d7.up.railway.app"

export const eventUser = async (eventId,data) => {
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
      url: `${baseUrl}/api/v1/events/${eventId}`,
      // url: `https://wedding-production-09d7.up.railway.app/api/v1/events/${eventId}`,
      data
    });
    if (res.data.status === 'success') {
      // location.reload(true);
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
      url: `${baseUrl}/api/v1/events`,
      // url: 'https://wedding-production-09d7.up.railway.app/api/v1/events',
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
        url: `${baseUrl}/api/v1/events/${courseId}`
        // url: `https://wedding-production-09d7.up.railway.app/api/v1/events/${courseId}`
      });
           if (res) {
             showAlert('success', 'Delete success');
            //  location.reload(true);
           }
         } catch (err) {
           showAlert('error', 'Error, please try again');
         }
       };