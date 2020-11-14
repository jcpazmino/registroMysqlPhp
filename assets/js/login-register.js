/*
 *
 * login-register modal
 * Autor: Creative Tim
 * Web-autor: creative.tim
 * Web script: http://creative-tim.com
 * 
 */
function showRegisterForm(){
    $('.loginBox').fadeOut('fast',function(){
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast',function(){
            $('.register-footer').fadeIn('fast');
        });
        $('.modal-title').html('Registrarse');
    }); 
    $('.error').removeClass('alert alert-danger').html('');
       
}
function showLoginForm(){
    $('#loginModal .registerBox').fadeOut('fast',function(){
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast',function(){
            $('.login-footer').fadeIn('fast');    
        });
        
        $('.modal-title').html('Acceder');
    });       
     $('.error').removeClass('alert alert-danger').html(''); 
}

function openLoginModal(){
    showLoginForm();
    setTimeout(function(){
        $('#loginModal').modal('show');    
    }, 230);
    
}
function openRegisterModal(){
    showRegisterForm();
    setTimeout(function(){
        $('#loginModal').modal('show');    
    }, 230);
    
}

function loginAjax(){
    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value; 
    var exp_Correo =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/;
    var exp_Clave  = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (!exp_Correo.test(email)){
        shakeModal("La dirección de correo es incorrecta!!!");
        $("#email").focus();
    }else if (!exp_Clave.test(pass)){
        shakeModal("La clave debe tener entre 6 y 16 caracteres. Debe tener al menos un número y un carácter especial");
        $("#password").focus();
    }else{
        var datos=$("#frmIngreso").serialize();
        $.ajax({
            url:"controller/usuarios.php",
            data:datos,
            type:"post",
            beforeSend:function(){
                shakeModal("<progress></progress>");
            }
        }).done(function(respuestaphp){
           if(respuestaphp==0){
                shakeModal("Usuario no registrado o error en los datos");
            }else{
                shakeModal("Bienvenido, "+respuestaphp);
            }
        });     
    }
}
function registro(){
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("emailR").value;
    var pass = document.getElementById("passwordR").value;
    var passC = document.getElementById("password_confirmation").value;
    var exp_Correo =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/;
    var exp_Clave  = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if(nombre==''){    
        shakeModal("Debes digitar un Nombre");
        $("#nombre").focus();
    }else if (!exp_Correo.test(email)){
        shakeModal("La dirección de correo es incorrecta!!!");
        $("#emailR").focus();
    }else if (!exp_Clave.test(pass)){
        shakeModal("La clave debe tener entre 6 y 16 caracteres. Debe tener al menos un número y un carácter especial");
        $("#passwordR").focus();
    }else if (pass !== passC ){
        shakeModal("El password y la confirmación, deben coincidir");
        $("#password_confirmation").focus();
    }else{
        var datos=$("#frmRegistro").serialize();
        $.ajax({
            url:"controller/usuarios.php",
            data:datos,
            type:"post",
            beforeSend:function(){
                shakeModal("<progress></progress>");
            }
        }).done(function(respuestaphp){
           if(respuestaphp==0){
                shakeModal("Usuario no registrado o error en los datos");
            }else{
                shakeModal("Bienvenido, "+respuestaphp);
            }
        });     
    }
}
function shakeModal(mensaje){
    $('#loginModal .modal-dialog').addClass('shake');
             $('.error').addClass('alert alert-danger').html(mensaje);
             $('input[type="password"]').val('');
             setTimeout( function(){ 
                $('#loginModal .modal-dialog').removeClass('shake'); 
    }, 1000 ); 
}

   