import { showAlert } from './alert';
import axios from 'axios';

export const createContact = async (name, email, content, wedding) => {
         try {
           const res = await axios({
             method: 'POST',
             url: 'http://localhost:3000/api/v1/contact',
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
