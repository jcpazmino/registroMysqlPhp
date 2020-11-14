

function validaInformacion(){
    if($("#correo").val()!="" && $("#clave").val()!=""){
        resValidacion=validaEmail($("#correo").val());
        if(resValidacion) fncValidaUsuario();
        else{
            $("#mensajes").html("<b>El correo no cumple con el formato requerido</b>");
            $("#correo").focus();
        }
    }
    else{
        $("#mensajes").html("<b>Debes digitar la información</b>");
        if($("#correo").val()=="") $("#correo").focus();
        else $("#clave").focus();
    }
}
function fncValidaUsuario(){
    var datos=$("#frmIngreso").serialize();
    $.ajax({
        url:"administrador/controller/login.php",
        data:datos,
        type:"post",
        beforeSend:function(){
            $("#mensaje").html("<progress></progress>");
        }
    }).done(function(respuestaphp){
       if(respuestaphp==0){
            $("#mensajes").html("Usuario no registrado o error en los datos");
        }else{
            if(respuestaphp=='administrador') location="administrador/";
            else location="web/";
        }
    });
}

function validaEmail(valorCampo) {
    var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;

    if (regex.test(valorCampo.trim())) return true;
    else return false;
};
