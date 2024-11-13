# dlp-api

### Integrantes
- Jonatan Agüero
- Mayra Carrillo
- Luciana Habert
- Alen Rupailaf
- Cristóbal Veas

### Descripción
> El módulo API es una aplicación de back-end conectada a una base de datos de libros y préstamos que provee una serie de endpoints que cubren todas las necesidades de datos de los distintos módulos del sistema, incluyendo las operaciones CRUD para libros, donaciones y préstamos.

### Observaciones

#### Sprint 1
- Los usuarios deben ser manejados mediante su correo, no con su nombre para extender las posibilidades a futuro de implementar un sistema de autenticación.
- Autores deben ser representados como un VARCHAR normal, no como arreglo, debido a que el tenerlos como arreglo dificulta su manipulación y no se necesita por el momento.

#### Sprint 2
- Añadir campos para almacenar ISBN de cada libro y caratula, la cual será codificada en base64 utilizando alguna librería común a lo largo de
los distintos módulos del proyecto.
- Implementar endpoints básicos (obtener y colocar datos) para cada una de las tablas.
- Añadir campo "accion" a tabla de registros.

### Tareas

| Actividad                                                         | Responsable           | Estado (-, en proceso, terminada) |
| ----------------------------------------------------------------- |:---------------------:|:---------------------------------:|
| Crear repositorio en GitHub del módulo API.                       | Luciana Habert        | Terminada                         |
| Introducir tecnologías para construcción de API y bases de datos. | Cristóbal Veas        | Terminada                         |
| Crear proyecto API usando Next.js.                                | Cristóbal Veas        | Terminada                         |
| Implementar ejemplos de retorno de los endpoints.                 | Jonatan Agüero        | Terminada                         |
| Creación de query para creación de tablas en base de datos.       | Alen Rupailaf         | Terminada                         |
| Creación de base de datos en Vercel.                              | Luciana Habert        | Terminada                         |
| Implementar métodos de prueba en la API.                          | Cristóbal Veas        | Terminada                         |
| Creación de tablas en base de datos.                              | Cristóbal Veas        | Terminada                         |
| Añadir datos de prueba a tablas de la base de datos.              | Mayra Carrillo        | Terminada                         |
| Implementación de endpoint GET "libros"                           | Cristóbal Veas        | Terminada                         |
| Añadir especificación de endpoint GET "libros"                    | Jonatan Agüero        | Terminada                         |
| Implementación de endpoint GET "prestamos"                        | Cristóbal Veas        | Terminada                         |
| Añadir especificación de endpoint POST "donar"                    | Mayra Carrillo        | Terminada                         |
| Implementación de endpoint POST "donar"                           | Alen Rupailaf         | Terminada                         |
| Añadir especificación tabla "registro"                            | Mayra Carrillo        | Terminada                         |
| Implementación endpoint GET "registros"                           | Luciana Habert        | Terminada                         |
| Añadir especificación endpoint POST "registros"                   | Cristóbal Veas        | Terminada                         |
| Implementación endpoint POST "registros"                          | Alen Rupailaf         | Terminada                         |
| Añadir especificación endpoint POST "prestamoDevolucion"          | Cristóbal Veas        | -                                 |
| Implementación endpoint POST "prestamoDevolucion"                 | Cristóbal Veas        | En proceso                        |
| Añadir especificación endpoint GET "librosMasSolicitados"         | Alen Rupailaf         | -                                 |
| Implementación endpoint GET "librosMasSolicitados"                | Alen Rupailaf         | -                                 |
| Añadir especificación endpoint GET "librosPendientes"             | Mayra Carrillo        | -                                 |
| Implementación endpoint GET "librosPendientes"                    | Mayra Carrillo        | -                                 |
| Añadir especificación endpoint GET "resumenAnual"                 | -                     | -                                 |
| Implementación endpoint GET "resumenAnual"                        | -                     | -                                 |
| Añadir especificación endpoint GET "estadisticas"                 | Jonatan Agüero        | En proceso                        |
| Implementación endpoint GET "estadisticas"                        | Jonatan Agüero        | En proceso                        |

### Especificación de tablas de base de datos

#### Libro

| Campo                             | Tipo                  |
----------------------------------- |:---------------------:|
| id                                | INT                   |
| titulo                            | VARCHAR               |
| autores                           | VARCHAR               |
| caratula                          | VARCHAR               |
| isbn                              | VARCHAR               | 
| tags                              | VARCHAR[]             |
| donante                           | VARCHAR               |
| fecha_donacion                    | TIMESTAMP             |
| prestado                          | BOOL(f)               |
| borrado                           | BOOL(f)               |

#### Prestamo

| Campo                             | Tipo                  |
----------------------------------- |:---------------------:|
| id                                | INT                   |
| id_libro                          | INT                   |
| usuario                           | VARCHAR               |
| fecha_prestamo                    | TIMESTAMP             |
| fecha_limite                      | TIMESTAMP             |
| fecha_devuelto                    | TIMESTAMP             |
| borrado                           | BOOL(f)               |

#### Registro

| Campo                             | Tipo                  |
----------------------------------- |:---------------------:|
| id                                | INT                   |
| usuario                           | VARCHAR               |
| fecha                             | TIMESTAMP             |
| accion                            | VARCHAR               |
| metadatos                         | VARCHAR               |

### Especificación de endpoints (GET)

|**Servicio**| \<url-servidor\>/libros?id=[id] |
|----------------------------------- | --- |
|**Parámetros**| id: identificador del libro a obtener, si no se especifica devuelve todos los libros |
|**Ejemplo respuesta**| {<br>&nbsp;&nbsp;"libros": [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": 5,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"titulo": "Moby Dick",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"autores": "Herman Melville",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"caratula": "...",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"isbn": "9788491054290,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"tags": [<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"aventura",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"épica",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"clásico"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"donante": "mayra.carrillo@alumnos.uach.cl",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"fecha_donacion": "2021-07-07T16:20:00.000Z",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"prestado": false,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"borrado": false<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>}|

|**Servicio**| \<url-servidor\>/prestamos?id_libro=[id_libro] |
|----------------------------------- | --- |
|**Parámetros**| id_libro: identificador del libro del cual se quiere saber su historial de préstamos, si no se especifica devuelve todos los préstamos realizados |
|**Ejemplo respuesta**| {<br>&nbsp;&nbsp;"prestamos": [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": 6,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id_libro": 4,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"usuario": "cristobal.veas@alumnos.uach.cl",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"fecha_prestamo": "2022-08-05T17:20:00.000Z",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"fecha_limite": "2022-08-19T17:20:00.000Z",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"fecha_devuelto": "2022-08-18T15:30:00.000Z",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"borrado": false<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>}

|**Servicio**| \<url-servidor\>/registros?id=[id] |
|----------------------------------- | --- |
|**Parámetros**| id: identificador del registro a obtener, si no se especifica devuelve todos los registros |
|**Ejemplo respuesta**| {<br>&nbsp;&nbsp;"registros": [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": 1,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"usuario": "admin",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"fecha": "2022-08-18T15:30:00.000Z",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"accion": "MODIFICAR_LIBRO",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"metadatos": "CAMBIAR_TITULO: { 'titulo_anterior': 'Moby Dcki'; 'titulo_nuevo': 'Moby Dick' }"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>}

### Especificación de endpoints (POST)
|**Servicio**| \<url-servidor\>/donar| 
|----------------------------------- | --- |
|**Body** | {<br>&nbsp;&nbsp;"titulo": "Moby Dick",<br>&nbsp;&nbsp;"autores": "Herman Melville",<br>&nbsp;&nbsp;"caratula": "...",<br>&nbsp;&nbsp;"isbn": "9788491054290",<br>&nbsp;&nbsp;"tags": [<br>&nbsp;&nbsp;&nbsp;&nbsp;"aventura",<br>&nbsp;&nbsp;&nbsp;&nbsp;"épica",<br>&nbsp;&nbsp;&nbsp;&nbsp;"clásico"<br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;"donante": "mayra.carrillo@alumnos.uach.cl"<br>} |
|**Ejemplo respuesta**|{<br>&nbsp;&nbsp;"id": 5<br>} |

|**Servicio**| \<url-servidor\>/registros| 
|----------------------------------- | --- |
|**Body** | {<br>&nbsp;&nbsp;"usuario": "mayra.carrillo@alumnos.uach.cl",<br>&nbsp;&nbsp;"accion": "MODIFICAR_LIBRO",<br>&nbsp;&nbsp;"metadatos": "CAMBIAR_TITULO: { 'titulo_anterior': 'Moby Dcki'; 'titulo_nuevo': 'Moby Dick' }"<br>}|
|**Ejemplo respuesta**|{<br>&nbsp;&nbsp;"id": 1<br>} |
