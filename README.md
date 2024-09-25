# dlp-api

### Integrantes
- Jonatan Agüero
- Mayra Carrillo
- Luciana Habert
- Alen Rupailaf
- Cristóbal Veas

### Descripción
> El módulo API es una aplicación de back-end conectada a una base de datos de libros y préstamos que provee una serie de endpoints que cubren todas las necesidades de datos de los distintos módulos del sistema, incluyendo las operaciones CRUD para libros, donaciones y préstamos.

### Tareas

| Actividad                                                         | Responsable           | Estado (-, en proceso, terminada) |
| ----------------------------------------------------------------- |:---------------------:|:---------------------------------:|
| Crear repositorio en GitHub del módulo API.                       | Luciana Habert        | Terminada                         |
| Introducir tecnologías para construcción de API y bases de datos. | Benjamín Cifuentes    | Terminada                         |
| Crear proyecto API usando Next.js.                                | Cristóbal Veas        | Terminada                         |
| Implementar métodos de prueba en la API.                          | Por definir           | En proceso                        |
| Implementación de tablas de base de datos temporal.               | Por definir           | En proceso                        |

### Libros


| Campo                             | Tipo           |
----------------------------------- |:---------------------:|
| id                      | int      |
|titulo                   | String   |
| autores                 | String       |
| tags                      | String        |
| borrado                   | boolean(f)    |
| donante                 | String        |
| fecha_donacion               | date         |
| prestado                   | boolean(f)    |


### prestamo



| Campo                             | Tipo           |
----------------------------------- |:---------------------:|
| id                      | int      |
| id_libro                   | int   |
| usuario                   s  | String       |
| fecha_prestamo                 | date    |
| fecha_limite                   | date   |
| fecha_devuelto                 | date    |







