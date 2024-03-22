# Segunda Entrega Proyecto Final Ecommerce


## Ejecución del Proyecto

1. Clona el repositorio desde GitHub.

2. Instala las dependencias del proyecto ejecutando `npm install`.

3. Inicia la aplicación con el comando `npm run start`.

4. Accede a la aplicación en tu navegador web utilizando la dirección `http://localhost:8080`.

## Dependencias de desarrollo

- `nodemon`: Herramienta que ayuda a desarrollar aplicaciones basadas en Node.js al reiniciar automáticamente la aplicación cuando se detectan cambios en los archivos del proyecto. Se instala como una dependencia de desarrollo (--save-dev).

## Autor

[Mariano Alvez]

## Licencia

Este proyecto está bajo la [Licencia MIT](LICENSE).

## Para Probar los Endpoints con Postman

## Productos

- `Busco Productos`
GET localhost:8080/api/products/<br>

- `Busco Producto por ID`
GET localhost:8080/api/products/:pid<br>

- `Creo un Producto`
POST localhost:8080/api/products/<br>
    BODY {<br>
        "title": "Product 2",<br>
        "description": "Description of product 2",<br>
        "code": "P002",<br>
        "price": 300.99,<br>
        "status": false,<br>
        "stock": 45,<br>
        "category": "Category A",<br>
        "thumbnails": [<br>
            "image3.jpg",<br>
            "image4.jpg"<br>
        ]<br>
    }<br>

- `Actualizo un Producto`
PUT localhost:8080/api/products/:pid<br>
    BODY {<br>
        "title": "Product 2",<br>
        "description": "Description of product 2",<br>
        "code": "P002",<br>
        "price": 100,<br>
        "status": false,<br>
        "stock": 10,<br>
        "category": "Category A",<br>
        "thumbnails": [<br>
            "image3.jpg",<br>
            "image4.jpg"<br>
        ]<br>
    }<br>

- `Borro un Producto`
DELETE localhost:8080/api/products/:pid<br>

## Carrito

- `Busco Carrito por ID`
GET localhost:8080/api/cart/:cid<br>

- `Creo un Carrito`
POST localhost:8080/api/cart/<br>

- `Agrego un Producto al Carrito`
POST localhost:8080/api/cart/:cid/products/:pid<br>
    BODY {<br>
	"quantity": 1
    }
    
