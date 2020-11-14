<?php
class Usuarios  extends Conectar{ 
	private $consulta;
    
    public $id;
    public $correo;
    public $clave;
    public $nombre;
    public $celular;
    public $fechaCreacion;
	public $estado;
	
	public function __CONSTRUCT(){
		$this->pdo = Conectar::ConectarBD();    
	} 

	public function ValidarUsuario($correo, $clave){
		$this->consulta="SELECT id, correo, nombre, celular
							FROM usuarios
							WHERE correo = ?
							and clave = md5(?)
							and estado = 'activo'";
		$stm = $this->pdo ->prepare($this->consulta);			          
		$stm->execute(array($correo, $clave));
		return $stm->fetch(PDO::FETCH_OBJ);
	}   

	public function Registrar(Usuarios $data){ 
		try{
			$this->consulta="INSERT INTO usuarios (nombre, correo, clave)
					values (?, ?, ?)";
			$stm = $this->pdo ->prepare($this->consulta);			          
			$stm->execute(array($data->nombre, $data->correo, $data->clave, ));
			return $data->nombre;
		} catch (Exception $e){
			die($e->getMessage());
		}
	}//fin del método

}//fin de la clase