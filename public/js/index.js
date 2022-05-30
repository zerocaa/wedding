/* eslint-disable */
import '@babel/polyfill';
import { showAlert } from './alert';
import { displayMap } from './mapbox';
import { login, logout, signup } from './login';
import { updateSettings } from './updateSetting';
import { eventUser, createEvent, deleteEvent } from './eventUpdate';
import { storyUser, createStory, deleteStory } from './storyUpdate';
import { createwedding } from './createwedding';
//dom element
const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const createweddingForm = document.querySelector('.form-create-wedding');
const eventForm = document.querySelectorAll('.form-event-user');
// const createEventForm = document.getElementById('add-more-event');
const storyForm = document.querySelectorAll('.form-story-user');
const createEventForm = document.getElementById('add-more-event');
const createStoryForm = document.getElementById('add-more-story');

if (storyForm) {
  storyForm.forEach(form => {
    form.addEventListener('submit',async e => {
      e.preventDefault();
      for (let i = 1; i <= storyForm.length; i++) {
        const id = document.getElementById('id' + i).value;
        if (id == i) {
          const story = document.getElementById('storyId' + i).value;
          const title = document.getElementById('title' + i).value;
          const time = document.getElementById('time' + i).value;
          const content = document.getElementById('content' + i).value;
          await storyUser(story,title,time,content);
        }
      }
      })
    })
}

  
document.addEventListener('DOMContentLoaded', function() {
  var storyId;
  var deleteBtn = $('.btn-delete-story');
  deleteBtn.click(function(e) {
    e.preventDefault();
    var storyId = $(this).data('id');
    deleteStory(storyId);
  });
});

if (createStoryForm) {
  createStoryForm.addEventListener('click', async e => {
    e.target.textContent = 'Processing...';
    const { story } = e.target.dataset;
    console.log(story);
    await createStory(story);
  });
}

  
document.addEventListener('DOMContentLoaded', function() {
  var eventId;
  var deleteBtn = $('.btn-delete-event');
  deleteBtn.click(function(e) {
    e.preventDefault();
    var eventId = $(this).data('id');
    deleteEvent(eventId);
  });
});

if (createEventForm) {
  createEventForm.addEventListener('click', async e => {
    e.target.textContent = 'Processing...';
    const { event } = e.target.dataset;
    console.log(event)
    await createEvent(event);
  });
}

// if (createEventForm)
//   createEventForm.addEventListener('click', async e => {
//     // e.preventDefault();
//     e.target.textContent = 'Processing...';
//     const { weddingId } = e.target.dataset;
//     console.log(weddingId)
//   }
// );


if (eventForm)
  eventForm.forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      // const nodeList = document.querySelectorAll('.btn--save');
      // nodeList.forEach(node => node.textContent = 'Processing...');
      for (let i = 1; i <= eventForm.length; i++) {
        const id = document.getElementById('id' + i).value;
        if (id == i) {
          const event = document.getElementById('eventId' + i).value;
          const name = document.getElementById('name' + i).value;
          const date = document.getElementById('date' + i).value;
          const time = document.getElementById('time' + i).value;
          const address = document.getElementById('address' + i).value;
          const map = document.getElementById('map' + i).value;
          await eventUser(event, name, date, time, address, map);
        }
      }
    });
  });

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
    const passwordConfirm = document.getElementById('password-confirm').value;
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

