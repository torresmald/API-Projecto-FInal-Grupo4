# API COLEGIO



 **Proyecto de Base de Datos de Colegio*     

Práctica/Proyecto de Back-end que consiste en la creación de una base de datos de una api de Colegio, realizada con Node.js y MongoAtlas.

## HECHO CON

<p align="center"> 
      <a href="https://git-scm.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> 
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> 
    <a href="https://www.mongodb.com/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> 
    <a href="https://nodejs.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> 
</p>


## INSTALACION
1. DESCARGA DEL REPOSITORIO
```
git clone https://github.com/torresmald/api-BoardGames.git
```

2. INSTALACION DE DEPENDENCIAS UTLIZADAS. 

  ```
  npm install
  ```


### DEPENDENCIAS UTILIZADAS

- BCRYPT--> Para la encriptación/desencriptacion de las password de Users.
- CLOUDINARY--> Host de imágenes utilizado para subir las imagenes de cines/películas desde el servidor.
- CONNECT-MONGO--> Necesario para poder guardar en la BBDD las sesiones de los usuarios.
- CORS--> Evitamos problemas de origen cruzado al utilizar Postman para lanzar las peticiones.
- DOTENV--> Dependencia que nos permite utilizar las variables de entorno y securizar la aplicación.
- EXPRESS--> Framework utilizado como entorno de desarrollo.
- EXPRESS SESION--> Permite la gestión de sesiones de usuario.
- MONGOOSE--> Para la conexión con la BBDD de MongoDB.
- MULTER--> Nos permite la subida de archivos por parte del usuario al servidor.
- PASSPORT--> Librería de autenticación utilizada.
- PASSPORT-LOCAL--> Nos permite crear una estrategia de autenticacion para registro/login.

#### DEPENDENCIAS DE DESARROLLO:

- NODEMON--> Utilizada durante el desarrollo de la aplicación para comprobar chequear los cambios en el código y recargar el Servidor.

## OBJETIVOS DEL PROYECTO

- Se han creado 2 colecciones (users, games)

1- Dentro de la carpeta `**models**` se pueden encontrar los "Schemas" con los atributos que quiero guardar en mi base de datos, de cada una de las colecciones; además de indicar, qué atributos son requeridos, únicos, etc.
En cada una de las colecciones además se ha creado el modelo, que sigue el Schema y que es el que se utiliza cada vez que se añade un elemento (ya que es el que está exportado).

2- Dentro de la carpeta `**public**` donde se subirán los archivos estáticos del proyecto, para su posterior borrado automático.

3- Dentro de la carpeta `**routes**`, se encuentran la distintas colecciones con sus endpoints, aquí es dónde se realiza el CRUD (Create/Post, Read/Get/ Update/Put, Delete/Delete):
`**Users**`  --> realizada para el registro, login y logout del usuario

`**Games**` --> se han creado varios endpoints:


## ENDPOINTS DISPONIBLES:
##### ALGUNOS ENDPOINTS GET TIENEN CAMPOS FILTRADOS QUE NO SE MOSTRARÁN EN LA PETICIÓN

###### <sub>IMAGENES EN FORMATO ÚNICAMENTE PNG, JPG, JPEG, GIF</sub>
###### <sub>Las cookies tienen un tiempo de expiracion de 2 horas.</sub>

1.  GAMES
    ```jsx
    1. GET
    - gamesRouter.get('/' --> OBTENER LISTADO DE TODS LOS GAMES
    - gamesRouter.get('/paged' --> LISTADO DE GAMES PAGINADOS EN BLOQUES DE 3 GAMES. 
    - gamesRouter.get('/title/:title' --> GAMES POR TITULO INDICADO.
    2. POST
    - gamesRouter.post('/to-cloud' --> AÑADIR UN GAME. POSIBILIDAD DE AÑADIR UNA IMAGEN.
    3. PUT
    - gamesRouter.put('/:id' --> EDITAR UN GAME POR SU ID. 
    4. DELETE
    - gamesRouter.delete('/:id' --> ELIMINAR UN GAME POR SU ID
    ```

2.  USUARIOS
    ```jsx
    1. GET
    - userRouter.get('/' --> OBTENER LISTADO DE TODOS LOS USUARIOS ORDENADOS POR EDAD.
    2. POST
    - userRouter.post('/register' --> POSIBILIDAD DE REGISTRARSE. SE REQUIERE UN EMAIL, PASSWORD, EDAD
    - userRouter.post('/login' --> POSIBILIDAD DE LOGUEARSE UNA VEZ REGISTRADO. 
    - userRouter.post('/logout' --> POSIBILIDAD DE DESLOGUEARSE. 


4- Carpeta `**tmp**`--> creada para el despliege de la API con Vercel

5- Dentro de la carpeta `**utils**`, tenemos:
- authentication --> con passport para la gestión de usuarios.
- db --> con el archivo connect.js - es el encargado de conectar la base de datos a mongoose/MongoDB.
- errors --> creado el archivo create-error.js para unificar todo el control de errores por un mismo sitio.
- middlewares --> creados los middlewares de athentication, cloudinary y multer (éste último, lo que hace es preparar el archivo pra poder subirlo).
- seeds --> en la cual se encuentra, tanto el archivo .json de los games (dentro de db) como la seed de games - archivo que inicializa la base de datos.

6- `**vercel.json**` --> archivo con la configuración necesaria para el depliege de la Api.

## RECURSOS

- https://www.mongodb.com/atlas/database
- https://vercel.com/
- https://cloudinary.com/
- https://www.postman.com/


## CONTACTO

- Project Repo: https://github.com/torresmald
- Email: jonathan.torresmald@gmail.com



DIVIERTETE USANDOLA......!!

![Image Movies](https://media3.giphy.com/media/R6ZNan8ZHchva/giphy.gif)

