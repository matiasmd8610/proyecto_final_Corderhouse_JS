//VARIABLES
let products = [];
const cartBtn = document.querySelector('.cart li a');
const closeCart = document.querySelector('.btn-close');
const removeItems = document.getElementsByClassName("remove-to-cart");


//CLASES
class Product {
    constructor(id, name, price, type, stock, description, imageURL, discount) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.type = type;
        this.stock = stock;
        this.description = description;
        this.imageURL = imageURL;
        this.discount = discount;
    }
    
    setNewStock(amount) {
        this.stock = this.stock - amount;
        return this.stock;
    }
}

class UserVisitor {
    constructor(age, name) {
        this.age = age;
        this.name = name;
    }
}

class UserRegistered {
    constructor(name, surname, email, pass) {
        this.name= name;
        this.surname = surname;
        this.email = email;
        this.pass = pass;
    }
}




const wine_01 = new Product(1, "Estancia Mendoza", 340, "Malbec", 800, "Notas de cata: color rojo intenso con reflejos violáceos. Aromas y sabores a frutos rojos, ciruelas y frambuesas.", "images/estancia-mendoza-malbec.png", 0);
const wine_02 = new Product(2, "FC Barcelona Malbec Reserva", 620, "Malbec", 1000, "Reserva 2020", "images/fc-barcelona-malbec-reserva.png", 0);
const wine_03 = new Product(3, "Novecento", 258, "Malbec", 1500, "Bodega Dante Robino", "images/novecento-malbec.png", 15);
const wine_04 = new Product(4, "Estancia Mendoza Sauvignon Blanc", 525, "Sauvignon Blanc", 500, "Notas de Cata: De color amarillo pálido, con tonos verdosos. En el aroma se perciben pomelo y durazno, muy intenso y refrescante. Es un vino suave, de acidez equilibrada y buena concentración. ", "images/estancia-mendoza-sauvignon-blanc.png", 30);
const wine_05 = new Product(5, "Callia M Malbec", 239, "Malbec", 600, "Callia San Juan", "images/callia-malbec.png", 10);
const wine_06 = new Product(6, "Fond De Cave", 495, "Malbec", 2500, "Bodega Trapiche", "images/fond-de-cave-malbec.png", 15);


//CARGO LOS OBJETOS PRODUCTO EN EL ARRAY PRODUCTS
products.push(wine_01, wine_02, wine_03, wine_04, wine_05, wine_06);



if (!sessionStorage.getItem("edad")) {
    let edad = prompt("Por favor ingrese su edad");
    restrictionAge(edad);
    sessionStorage.setItem("edad", edad);
}

document.querySelector('.overlay').style.display = 'none';

//LLAMO A LAS FUNCIONES QUE ARMAR LOS CATALOGOS TANTO DE LA HOME (OFERTAS DEL DIA) COMO DE LA SECCIÓN NUESTROS VINOS
buildCatalog(products);
buildCatalogOnSale(products);
cart('.cart-panel-content');


//AGREGAR PRODUCTOS AL CARRITO CUANDO SE HACE CLICK EN EL BOTÓN AGREGAR DE CADA PRODUCTO
const buttonsAddCart = document.getElementsByClassName('add-to-cart');

for (const button of buttonsAddCart) {

    button.addEventListener('click', () => {

        const id = button.getAttribute('id');

        let productosEnc = products.filter((element) => {
            return element.id == id;
        });

        let product = searchProduct(productosEnc[0].id);
        let newProduct = productosEnc[0];
        newProduct.saleAmount = 1;
  
        if (product != false) {
            alert("El producto ya existe en el carrito ");
        } else {
            alert("¡Producto agregado exitosamente!");
            saveCartProduct(newProduct);
            cart('.cart-panel-content'); //LLamo a la función cart para volver a generar el html del carrito con el nuevo producto agregado
        }
        
    });
}



//ABRIR Y CERRAR CARRITO
cartBtn.addEventListener('click', ()=> {
    const cartPanel = document.getElementById("cart-panel");
    cartBtn.classList.toggle('active');
    cartPanel.classList.toggle('active');
});


closeCart.addEventListener('click', () => {
    cartBtn.click(); 
});


//ANIMACIÓN DEL LOGO
$('h1').animate({
    left: '0'
}, 'slow');





