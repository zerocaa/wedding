/* eslint-disable */

// hide alert element
export const hideAlert = () => {
    const alert = document.querySelector('.alert');
    if (alert) {
        alert.remove();
    }
};

// create showAlert function have type "success" and "error"
export const showAlert = (type, message) => {
    hideAlert();
    if (type = "success") {
        const markup = `<div style='backgroundcolor:green' class="alert alert--${type}">${message}</div>`;
        document
          .querySelector('body')
          .insertAdjacentHTML('afterbegin', markup);
        window.setTimeout(hideAlert, 10000);
    }
    else {
        const markup = `<div class="alert alert--${type}">${message}</div>`;
        document
          .querySelector('body')
          .insertAdjacentHTML('afterbegin', markup);
        window.setTimeout(hideAlert, 10000);
    }
        
    
}