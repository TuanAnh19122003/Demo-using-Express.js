$(document).ready(function () {
    $('#togglePassword').on('click', function () {
        const passwordField = $('#password');
        const type = passwordField.attr('type') === 'password' ? 'text' : 'password';
        passwordField.attr('type', type);

        // Toggle icon
        $(this).find('i').toggleClass('fa-eye fa-eye-slash');
    });
});

$(document).ready(function() {
    $('#email').keyup(function(){
        const regx_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const email_input = $(this).val();
        if(regx_email.test(email_input)){
            $('#email-error').text('Valid Email').removeClass('text-danger').addClass('text-success')
        }else{
            $('#email-error').text('Invalid Email').removeClass('text-success').addClass('text-danger')
        }
    })
    $('#password').keyup(function(){
        const regx_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const pass_input = $(this).val();
        if(regx_password.test(pass_input)){
            $('#password-error').text('Valid Password').removeClass('text-danger').addClass('text-success')
        }else{
            $('#password-error').text('Invalid Password').removeClass('text-success').addClass('text-danger')
        }
    })
})