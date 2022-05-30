import { showAlert } from './alert';
import axios from 'axios';

export const storyUser = async (storyId, title, time, content) => {
         try {
           const res = await axios({
             method: 'PUT',
             url: `http://localhost:3000/api/v1/storyloves/${storyId}`,
             data: {
               title,
               time,
               content
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
       };

export const createStory = async wedding => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/storyloves',
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

export const deleteStory = async storyId => {
         try {
           const res = await axios({
             method: 'DELETE',
             url: `http://localhost:3000/api/v1/storyloves/${storyId}`
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
