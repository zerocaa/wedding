/* eslint-disable */
import '@babel/polyfill';
import { showAlert } from './alert';
import { displayMap } from './mapbox';
import { login, logout, signup } from './login';
import { updateSettings } from './updateSetting';
import { eventUser } from './eventUpdate';
import { createwedding } from './createwedding';
//dom element
const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const createweddingForm = document.querySelector('.form-create-wedding');
const eventForm = 
//delegation
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
if (logOutBtn) logOutBtn.addEventListener('click', logout, false);

if (userDataForm) {
  userDataForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-settings').textContent = 'Updating...'
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    form.append('address', document.getElementById('address').value);
    form.append('phone', document.getElementById('phone').value);
    form.append('nation', document.getElementById('nation').value);
    await updateSettings(form, 'data');
    // const photo = document.getElementById('photo').files[0];
    // const name = document.getElementById('name').value;
    // const email = document.getElementById('email').value;
    // const address = document.getElementById('address').value;
    // const phone = document.getElementById('phone').value;
    // const nation = document.getElementById('nation').value;
    // await updateSettings(photo,name, email, address, phone, nation);
    document.querySelector('.btn--save-settings').textContent = 'Save settings'
    location.reload(true)
  });
}
if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm')
.value;
    if (passwordCurrent === password) {
      showAlert('error', 'Password is not same');
      return;
    }
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
    document.querySelector('.btn--save-password').textContent = 'Save Password';
    userPasswordForm.reset();
  });
}
//bookBtn response dataset

//signup
if (signupForm) {
  signupForm.addEventListener('submit', async e => {
    e.preventDefault();
    const name1 = document.getElementById('name1').value;
    const email1 = document.getElementById('email1').value;
    const password1 = document.getElementById('password1').value;
    const password2 = document.getElementById('password2').value;
    await signup(name1, email1, password1, password2);
    console.log(name1, email1, password1, password2);
  });
}

