jQuery(function($) {
   var checkSubmited = false;
   $('form').on('submit', function(e) {
     if (checkSubmited == false) {
       $(this)
         .find('button[type="submit"]')
         .prepend(
           `
                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
              `
         )
         .attr('disabled', true);
       checkSubmited = true;
     }
   });
   jQuery('#login-form').yiiActiveForm([], []);
 });