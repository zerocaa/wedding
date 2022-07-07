import { showAlert } from './alert';
import axios from 'axios';

// const baseUrl = 'https://wedding-production-052d.up.railway.app'
const baseUrl = "https://wedding-production-052d.up.railway.app"

export const createContact = async (name, email, content, wedding) => {
         try {
           const res = await axios({
             method: 'POST',
             url: `${baseUrl}/api/v1/contact`,
             data: {
               name,
               email,
               content,
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

export const deleteContact = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${baseUrl}/api/v1/contact/${id}`
    });
    if (res) {
      showAlert('success', 'Delete success');
      location.reload(true);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
}
