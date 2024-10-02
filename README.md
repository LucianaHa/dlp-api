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
| Introducir tecnologías para construcción de API y bases de datos. | Cristóbal Veas        | Terminada                         |
| Crear proyecto API usando Next.js.                                | Cristóbal Veas        | Terminada                         |
| Implementar ejemplos de retorno de los endpoints.                 | Jonatan Agüero        | En proceso                        |
| Creación de query para creación de tablas en base de datos.       | Alen Rupailaf         | Terminada                         |
| Implementación de base de datos en Vercel.                        | Luciana Habert        | Terminada                         |
| Implementar métodos de prueba en la API.                          | Cristóbal Veas        | En proceso                        |
| Añadir datos de prueba a tablas de la base de datos.              | Mayra Carrillo        | En proceso                        |
| Implementación de endpoints.                                      | Por definir           | -                                 |

### Especificación de tablas de base de datos

#### Libro

| Campo                             | Tipo           |
----------------------------------- |:---------------------:|
| id                      | INT      |
|titulo                   | VARCHAR   |
| autores                 | VARCHAR[]       |
| tags                      | VARCHAR[]        |
| donante                 | VARCHAR        |
| fecha_donacion               | TIMESTAMP         |
| prestado                   | BOOL(f)    |
| borrado                   | BOOL(f)    |

#### Prestamo

| Campo                             | Tipo           |
----------------------------------- |:---------------------:|
| id                      | INT      |
| id_libro                   | INT   |
| usuario                     | VARCHAR       |
| fecha_prestamo                 | TIMESTAMP    |
| fecha_limite                   | TIMESTAMP   |
| fecha_devuelto                 | TIMESTAMP    |
| borrado                   | BOOL(f)    |

### Especificación de endpoints

|**Servicio**| <url-servidor>/libros?id=[id] |
|----------------------------------- | --- |
|**Parámetros**| id: identificador del libro a obtener, si no se especifica devuelve todos los libros |
|**Ejemplo respuesta**| {<br>&nbsp;&nbsp;"libros": [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": 5,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"titulo": "Moby Dick",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"autores": [<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Herman Melville"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"tags": [<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"aventura",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"épica",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"clásico"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"donante": "Mayra Carrillo",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"fecha_donacion": "2021-07-07T16:20:00.000Z",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"prestado": false,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"borrado": false<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>}|
