//VARIABLES
let products = [];
const cartBtn = document.querySelector('.cart li a');
const closeCart = document.querySelector('.btn-close');
const removeItems = document.getElementsByClassName("remove-to-cart");
const buyBtn = document.getElementById("end-transaction");
const keepBuyingyBtn = document.getElementById("btn-keep-buying");
const checkoutForm = document.getElementById("checkout-form");
const checkboxesType = document.querySelectorAll('input[name=type]');

//CLASES
class Product {
    constructor(id, name, price, type, description, imageURL, stock, discount) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.type = type;
        this.description = description;
        this.imageURL = imageURL;
        this.stock = stock;
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

//FUNCION PARA CARGAR LOS PRODUCTOS EN EL ARRAY DE PRODUCTOS USANDO LA CLASE PRODUCT COMO MODELO DE PRODUCTO POR AJAX $GET
async function getProductsJson() {
    await $.get("./data/products.json", function (response, state) {
        if (state === "success") {
            let productsResponse = response;
            for (const item of productsResponse) {
                let newProduct = new Product(item.id, item.name, item.price, item.type, item.description, item.imageURL, item.stock, item.discount);
                products.push(newProduct);
            }  
        }
    });
    //console.log(products);
}


if (!localStorage.getItem("edad")) {
    let edad = prompt("Por favor ingrese su edad");
    restrictionAge(edad);
    localStorage.setItem("edad", edad);
}

document.querySelector('.overlay').style.display = 'none';


cart('.cart-panel-content');


//AGREGAR PRODUCTOS AL CARRITO CUANDO SE HACE CLICK EN EL BOTÓN AGREGAR DE CADA PRODUCTO
const addProductsCart = () => {

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


//BOTON COMPRAR
buyBtn.addEventListener('click', () => {
    $('.catalog-offers, .intro, #cart-panel, header .cart ul').fadeOut('fast');
    $('#checkout').fadeIn();
});

//BOTON SEGUIR COMPRANDO
keepBuyingyBtn.addEventListener('click', () => {
    $('.catalog-offers, .intro, #cart-panel, header .cart ul').fadeIn('fast');
    $('#checkout').fadeOut();
});

async function call_getProductsJson() {
    await getProductsJson();
    
    //LLAMO A LAS FUNCIONES QUE ARMAR LOS CATALOGOS TANTO DE LA HOME (OFERTAS DEL DIA) COMO DE LA SECCIÓN NUESTROS VINOS
    await buildCatalog(products);
    await buildCatalogOnSale(products);

    await addProductsCart();
    //console.log(products);
}

call_getProductsJson();
//console.log(products);


checkoutForm.addEventListener('submit', formValidation);



checkboxesType.forEach((element) => {
    element.addEventListener('click', () => {
        if (element.checked) {
            //console.log(element.value);
            filterType(element.value);
        } else {
            $('.product').css('display','flex');
        }
    })
});


/*const wine_01 = new Product(1, "Estancia Mendoza", 340, "Malbec", "Notas de cata: color rojo intenso con reflejos violáceos. Aromas y sabores a frutos rojos, ciruelas y frambuesas.", "images/estancia-mendoza-malbec.png", 1000, 0);
const wine_02 = new Product(2, "FC Barcelona Malbec Reserva", 620, "Malbec", "Reserva 2020", "images/fc-barcelona-malbec-reserva.png", 1000, 0);
const wine_03 = new Product(3, "Novecento", 258, "Malbec", "Bodega Dante Robino", "images/novecento-malbec.png", 1000, 15);
const wine_04 = new Product(4, "Estancia Mendoza Sauvignon Blanc", 525, "Sauvignon Blanc", "Notas de Cata: De color amarillo pálido, con tonos verdosos. En el aroma se perciben pomelo y durazno, muy intenso y refrescante. Es un vino suave, de acidez equilibrada y buena concentración. ", "images/estancia-mendoza-sauvignon-blanc.png", 1000, 30);
const wine_05 = new Product(5, "Callia M Malbec", 239, "Malbec", "Callia San Juan", "images/callia-malbec.png", 1000, 10);
const wine_06 = new Product(6, "Fond De Cave", 495, "Malbec", "Bodega Trapiche", "images/fond-de-cave-malbec.png", 1000, 15);


//CARGO LOS OBJETOS PRODUCTO EN EL ARRAY PRODUCTS
products.push(wine_01, wine_02, wine_03, wine_04, wine_05, wine_06);*/