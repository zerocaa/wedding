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
        const markup = `
        <div class="alert alert-${type} rounded-0 mb-0 mt-1">
            <div class="container-md">
				<div class="row">
					<div class="col-12">
						<p class="text-left mb-0">
                            <strong>
                                ${message}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </strong>
                        </p>
					</div>
				</div>
			</div>
        </div>`;
        document
          .querySelector('body')
          .insertAdjacentHTML('afterbegin', markup);
        window.setTimeout(hideAlert, 20000);
    }
    else {
        const markup = `<div class="alert alert-${type} rounded-0 mb-0 mt-1">
            <div class="container-md">
				<div class="row">
					<div class="col-12">
						<p class="text-left mb-0">
                            <strong>
                                ${message}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </strong>
                        </p>
					</div>
				</div>
			</div>
        </div>`;
        document
          .querySelector('body')
          .insertAdjacentHTML('afterbegin', markup);
        window.setTimeout(hideAlert, 20000);
    }
        
    
}