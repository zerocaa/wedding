import { showAlert } from './alert';
import axios from 'axios';

const baseUrl = "https://wedding-production-052d.up.railway.app"

export const createBridesMaids = async wedding => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'https://wedding-production-052d.up.railway.app/api/v1/bridesmaids',
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

export const updateBridesMaids = async (bridesmaidId,data) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${baseUrl}/api/v1/bridesmaids/${bridesmaidId}`,
      data
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Update success');
      location.reload(true);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
}

export const deleteBridesMaids = async bridesmaidId => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${baseUrl}/api/v1/bridesmaids/${bridesmaidId}`
    });
    if (res) {
      showAlert('success', 'Delete success');
      location.reload(true);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
}