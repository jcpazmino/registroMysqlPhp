<?php
 require_once '../model/conexion.php';
 require_once '../model/usuarios.php';
 $usuarios = new Usuarios;

$operacion = "xxx";
extract($_POST);
if(isset($operacionR)) $operacion = $operacionR;

switch ($operacion) {
	case 'ValidarUsuario':
		$resultado=$usuarios->ValidarUsuario($email, $password);
 		if($resultado){
			session_start();
			$_SESSION["usuarioid"] 		= $resultado->id;
			$_SESSION["usuarionombre"] 	= $resultado->nombre;
			$_SESSION["usuariocorreo"] 	= $resultado->correo;
			$_SESSION["usuariocelular"] = $resultado->celular;
			echo $resultado->nombre;;
		}
	break;
	case 'registrarUsuario':
		$usuarioR = new Usuarios;
		$usuarioR->correo = $emailR;
		$usuarioR->nombre = $nombre;
		$usuarioR->clave = md5($passwordR);
		echo $resultado=$usuarios->Registrar($usuarioR);
	break;

	default:
		echo "Error de operación";
	break;
}	

?>