import { showAlert } from './alert';
import axios from 'axios';

 

export const createwedding = async (data) => {
   try {
     const res = await axios({
       method: 'POST',
       url: 'http://localhost:3000/api/v1/weddings',
       data
     });
     if (res.data.status === 'success') {
       showAlert('success', 'Create success');
       window.setTimeout(() => {
         location.assign('/');
       }, 1500);
     }
   } catch (err) {
     showAlert('error', err.response.data.message);
   }
};

export const deleteWedding = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://localhost:3000/api/v1/weddings/${id}`
    });
    if (res) {
      showAlert('success', 'Delete success');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
}
