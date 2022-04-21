function message(title, message) {
	$("#messageModal .messageTitle").html(title);
	$("#messageModal .messageBody").html(message);
	$('#messageModal').modal('show');
}
function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}
function setFormErrors(formElement, errors) {
	$.each(errors, function( key, value ) {
		formElement.find('#' + key).parent().addClass('has-error').find('.help-block').html(value[0]);
	});
}

function unsetFormErrors(formElement) {
	formElement.find('.has-error').removeClass('has-error');
	formElement.find('.help-block').pug('');
	formElement.find('.form-message').hide();
}

$(document).ready(function(){
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl,{trigger:'hover'})
    });

	$(document).on("change", ".date-custom input[type='date']", function() {
		this.setAttribute("data-date",moment(this.value, "YYYY-MM-DD").format( this.getAttribute("data-date-format")));
	}).trigger("change");

	$(document).on("click", ".btn-resend-verify-email", function(){
		$(this).addClass("pe-none");
		$(".loading").show();
		$("form#resend-verify-email-form").submit();
	});
	if(document.getElementById("typed1")){
		var typed1 = new Typed('#typed1', $('#typed1').data('typed'));	
	}
});