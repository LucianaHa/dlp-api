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

### Libro


| Campo                             | Tipo           |
----------------------------------- |:---------------------:|
| id                      | INT      |
|titulo                   | VARCHAR   |
| autores                 | VARCHAR[]       |
| tags                      | VARCHAR[]        |
| borrado                   | boolean(f)    |
| donante                 | VARCHAR        |
| fecha_donacion               | TIMESTAMP         |
| prestado                   | boolean(f)    |


### Prestamo



| Campo                             | Tipo           |
----------------------------------- |:---------------------:|
| id                      | INT      |
| id_libro                   | INT   |
| usuario                     | VARCHAR       |
| borrado                   | boolean(f)    |
| fecha_prestamo                 | TIMESTAMP    |
| fecha_limite                   | TIMESTAMP   |
| fecha_devuelto                 | TIMESTAMP    |
### libro.js
 
```json
{  
    "libros":
      {
        "id": int,
        "titulo": String, 
        "autores": String,
        "tags": [String],
        "borrado": boolean,
        "donante": String,
        "fecha_donacion" : timestamp,
        "prestado" : boolean
      }
}
```
### Especificación de endpoints

Ejemplo endpoint para pedir un libro o todos los libros:

|**Servicio**| [url-servidor]/libros |
|----------------------------------- | --- |
|**Parámetros**|id-libro: identificador del libro a obtener, si es nulo o vacío devuelve todos los libros|
|**Respuesta**|     {<br>&nbsp;  "id": 1234,<br>&nbsp;&nbsp; "titulo": "El ingenioso hidalgo Don Quijote de la Mancha", <br>&nbsp;&nbsp;  "autores": "Miguel de Cervantes",<br>&nbsp;&nbsp;  "tags": "aventura,sátira,parodia,ficcion humoristica",<br>&nbsp;&nbsp;  "borrado": false,<br>&nbsp;&nbsp;  "donante": "Maria Eliana de la Maza",<br>&nbsp;&nbsp;  "fecha_donacion" : "2024-09-12 19:10:00",<br>&nbsp;&nbsp;  "prestado" : false<br>  }|










