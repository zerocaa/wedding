import { showAlert } from './alert';
import axios from 'axios';

const baseUrl = "https://wedding-production-09d7.up.railway.app"

export const updateStory = async (storyId, title, time, content) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${baseUrl}/api/v1/storyloves/${storyId}`,
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

export const storyUser = async (
         storyId,
        data
       ) => {
         try {
           const res = await axios({
             method: 'PUT',
             url: `${baseUrl}/api/v1/storyloves/${storyId}`,
             data
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
      url: `${baseUrl}/api/v1/storyloves`,
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
             url: `${baseUrl}/api/v1/storyloves/${storyId}`
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
