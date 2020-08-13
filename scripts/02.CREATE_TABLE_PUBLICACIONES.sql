CREATE TABLE publicaciones(
    id int primary key AUTO_INCREMENT,
    titulo varchar (150) not null,
	contenido varchar (280) not null,
    fecha_creacion datetime not null,
    id_usuario int not null
)