//FUNCION QUE CONSULTA POR LA EDAD DE LA PERSONA PARA DEJARLA INGRESAR AL SITIO EN CASO QUE SEA MAYOR DE EDAD
const restrictionAge = (age) => {
    if (parseInt(age) >= 18) {
        alert("¡Bienvenido!");
    } else if (age == null) {
        window.location.href = "https://kids.nationalgeographic.com/";
    } else {
        alert("Usted es menor de edad y no puede operar en esta página");
        window.location.href = "https://kids.nationalgeographic.com/";
    }
}

//FUNCIÓN QUE CARGA TODO EL CATALOGO DE VINOS DE LA SECCIÓN NUESTROS VINOS
const buildCatalog = (arr) => {
    let html ='';
    arr.forEach(product => {
            html += `<div class="product" data-id="${product.id}">`;
            if (product.discount > 0) {
                html += `<span class="discount">${product.discount}% OFF</span>` //ALT + 96
            }
            html +=`<figure>
                         <img src="${product.imageURL}" width="100" alt="${product.name}">
                    </figure>
                    <h4>${product.name}</h4>
                    <span class="price">$${product.price}</span>
                    <button class="add-to-cart" id="${product.id}">Agregar al carrito</button>
                    </div>`;
        }
    );
    $('#products-container').html(html);
}

//FUNCIÓN QUE CARGA LOS PRODUCTOS EN OFERTA DE LA HOME
const buildCatalogOnSale = (arr) => {
    let html ='';
    let counter = 0;
    arr.forEach(product => {
            if (product.discount > 0) {
                counter ++
                html += `<div class="product" data-id="${product.id}">
                            <span class="discount">${product.discount}% OFF</span>
                            <figure>
                                <img src="${product.imageURL}" width="100" alt="${product.name}">
                            </figure>
                            <h4>${product.name}</h4>
                            <span class="price">$${product.price}</span>
                            <button class="add-to-cart" id="${product.id}">Agregar al carrito</button>
                        </div>`;
            }
        }
    );

    if (counter == 0) {
        html += "<p>En este momento no tenemos productos en oferta</p>";
    }
    $('#products-container-onsale').html(html);
}

//FUNCIÓN PARA BUSCAR UN PRODUCTO YA AGREGADO EN EL CARRITO
const searchProduct = (productId) => {
  
    if ( !localStorage.getItem("productsCart") ){
      return false;
    }
  
    let almacenados = JSON.parse(localStorage.getItem("productsCart"));
    let encontrado = false;
    let i = 0;
    while (!encontrado && i != almacenados.length ){

      if (almacenados[i].id == productId) {
        encontrado = almacenados[i];
      }
  
      i++;
  
    }
  
    return encontrado;
  
  }


  //FUNCION PARA AGREGAR UN PRODUCTO COMPRADO AL CARRITO
  const saveCartProduct = (newProduct) => {
  
    let item = localStorage.getItem("productsCart");
    if (item) { //Pregunto si existe "productsCart" en localStorage
  
      let almacenados = JSON.parse(localStorage.getItem("productsCart"));
      //console.log(newProduct);
      almacenados.push(newProduct);

      let almacenados_string = JSON.stringify(almacenados);
      localStorage.setItem("productsCart", almacenados_string);
  
    } else { //Si no existe lo creo y agrego el producto nuevo
  
      let almacenados = new Array();
      almacenados.push(newProduct);
      let almacenados_string = JSON.stringify(almacenados);
      localStorage.setItem("productsCart", almacenados_string);
    }

  }


//FUNCION PARA GENERAR EL HTML DE TODOS LOS PRODUCTOS DEL CARRITO
const cart = (htmlContainer) => {

    let item = localStorage.getItem("productsCart");
    if (item) { //Pregunto si existe "productsCart" en localStorage
        let almacenados = JSON.parse(localStorage.getItem("productsCart"));
        let html = '';

        for (let i=0; i < almacenados.length; i++) {
            html +=`<div class="product" data-id="${almacenados[i].id}">
                        <figure>
                            <img src="${almacenados[i].imageURL}" width="100" alt="${almacenados[i].name}">
                        </figure>
                        <h4>${almacenados[i].name}</h4>
                        <span class="price">$${almacenados[i].price}</span>
                        <div class="my-3"><input class="quantity" type="number" id="cart-quantity-${almacenados[i].id}" name="quantity" min="1" max="99" value="${almacenados[i].saleAmount}" onchange="changeQuantity(${almacenados[i].id})"></div>
                        <button type="button" onclick="deleteItemCart(${almacenados[i].id})" class="remove-to-cart"><i class="material-icons">delete</i></button>
                    </div>`;
        }

        $(htmlContainer).html(html);
        cartTotal();
        document.querySelector('.cart-items').textContent = totalItems();

    }
}

//FUNCIÓN QUE CALCULA EL VALOR TOTAL DE LA COMPRA
const cartTotal = () => {
    let almacenados = JSON.parse(localStorage.getItem("productsCart"));
    let cartTotalAmount = document.querySelector(".total-amount span");
    let cartTotal = 0;
    
    for (const product of almacenados) {
        cartTotal += parseInt(product.price) * parseInt(product.saleAmount);
    }

    cartTotalAmount.textContent = cartTotal;

}


//FUNCIÓN PARA BORRAR ELEMENTOS DEL CARRITO
const deleteItemCart = (id) => {

    const confirmDelete = confirm("¿Seguro que desea borrar el producto?");

    if (confirmDelete) {

        const productId = id;
        let almacenados = JSON.parse(localStorage.getItem("productsCart"));
    
        let products = document.querySelectorAll("#cart-panel .product");
        products.forEach((element) => {
            if (element.getAttribute('data-id') == id) {
                $(element).fadeOut('slow', () =>{
                    $(element).remove();
                });
            }
        });
    
        const removeIndex = almacenados.findIndex((element) => { // Busco la posición del elemento modificado en el array de productos del carrito
            return element.id == id;
        });
    
        almacenados.splice( removeIndex, 1 );
        let almacenados_string = JSON.stringify(almacenados);
        localStorage.setItem("productsCart", almacenados_string);
        totalItems();
        cartTotal();
        document.querySelector('.cart-items').textContent = totalItems();

    }

}

//FUNCIÓN PARA MOSTRAR EL TOTAL CUANDO SE CAMBIA LA CANTIDAD DE PRODUCTOS ELEGIDA
const changeQuantity = (id) => {
    let almacenados = JSON.parse(localStorage.getItem("productsCart"));
    let quantity = document.getElementById("cart-quantity-" + id).value;

    let productEnc = almacenados.filter((element) => {
        return element.id == id;
    });

    const index = almacenados.findIndex((element) => { // Busco la posición del elemento modificado en el array de productos del carrito
        return element.id == id;
    });

    productEnc[0].saleAmount = parseInt(quantity);

    almacenados[index] = productEnc[0];
    almacenados_string = JSON.stringify(almacenados);
    localStorage.setItem("productsCart", almacenados_string);

    cartTotal();
    document.querySelector('.cart-items').textContent = totalItems();

}


//FUNCIÓN QUE MUESTRA EL TOTAL DE PRODUCTOS AGREGADOS AL CARRITO EN EL GLOBO ROJO DEL CART
const totalItems = () => {
    let almacenados = JSON.parse(localStorage.getItem("productsCart"));
    let totalItems = 0;

    $('#end-transaction').hide();

    for (const product of almacenados) {
        totalItems += parseInt(product.saleAmount);
        if (totalItems > 0) {
            $('#end-transaction').show();
        } else {
            $('#end-transaction').hide();
        }
    }

    return totalItems;
}

//FUNCIÓN PARA VALIDAR FORMULARIO DE COMPRA
const formValidation = (e) => {
    e.preventDefault();
    let errors = 0;
    
    document.querySelectorAll('#checkout-form input').forEach((element) => {
        element.classList.remove('error');
    });

    $('.error-msg').hide();
    const name = document.getElementById('name');
    const surname = document.getElementById('surname');
    const email = document.getElementById('email');
    const street = document.getElementById('street');
    const number = document.getElementById('number');
    const floor = document.getElementById('floor');
    const city = document.getElementById('city');
    const postalCode = document.getElementById('postal-code');
    const province = document.getElementById('province');
    const cardType = document.getElementById('card-type');
    const cardNumber = document.getElementById('credit-card-number');
    const cardName = document.getElementById('credit-card-name');
    const expirationDate = document.getElementById('expiration-date');
    const securityCode = document.getElementById('security-code');
    let date_regex = /^(0[1-9]|1[012])\/\d{2}$/;

    if (name.value == "") {
      name.classList.add('error');
      $('#name').next().show().html('Nombre incorrecto');
      errors =+ 1;
    }

    if (surname.value == "") {
      surname.classList.add('error');
      $('#surname').next().show().html('Apellido incorrecto');
      errors =+ 1;
    }

    if (email.value == "") {
      email.classList.add('error');
      $('#email').next().show().html('E-mail incorrecto');
      errors =+ 1;
    }

    if (city.value == "") {
      city.classList.add('error');
      $('#city').next().show().html('Ciudad incorrecta');
      errors =+ 1;
    }

    if (street.value == "") {
      street.classList.add('error');
      errors =+ 1;
    }

    if (postalCode.value == "") {
        $('#postal-code').next().show().html('Código postal incorrecto');
        postalCode.classList.add('error');
        errors =+ 1;
    }

    if (floor.value != "" && isNaN(floor.value)) {
      floor.classList.add('error');
      $('#floor').next().show().html('Piso incorrecto');
      errors =+ 1;
    }

    if (number.value == "" || isNaN(number.value)) {
      number.classList.add('error');
      $('#number').next().show().html('Número incorrecto');
      errors =+ 1;
    }

    if (province.value == "0") {
      province.classList.add('error');
      $('#province').next().show().html('Debe seleccionar una provincia');
      errors =+ 1;
    }

    if (cardType.value == "0") {
        cardType.classList.add('error');
        $('#card-type').next().show().html('Debe seleccionar forma de pago');
        errors =+ 1;
    }

    if (cardName.value == "") {
        cardType.classList.add('error');
        $('#credit-card-name').next().css('display', 'inline-block').html('Debe completar su nombre tal como figura en la tarjeta');
        errors =+ 1;
    }

    if (cardNumber.value == "" || isNaN(cardNumber.value)) {
        cardNumber.classList.add('error');
        $('#credit-card-number').next().show().html('Número de tarjeta inválido');
        errors =+ 1;
    }

    if (expirationDate.value == "" || !date_regex.test(expirationDate.value)) {
        expirationDate.classList.add('error');
        $('#expiration-date').next().show().html('Fecha de expiración inválida');
        errors =+ 1;
    }

    if (securityCode.value == "" || isNaN(securityCode.value)) {
        expirationDate.classList.add('error');
        $('#security-code').next().show().html('Código de seguridad inválido');
        errors =+ 1;
    }

    if (errors > 0) {
        return false;
    } else {
        $("#success-message").fadeIn();
        setTimeout(() => {
            $('.catalog-offers, .intro, #cart-panel, header .cart ul').fadeIn('fast');
            $('#checkout, #success-message').fadeOut();
            localStorage.removeItem('productsCart');
            document.querySelector('.cart-items').textContent = "0";
            $('.cart-panel-content').empty();
            $('#cart-panel').removeClass('active');
        }, 2000);
        return true;
    }
    
  }

//FUNCIÓN PARA FILTRAR PRODUCTOS
const filterType = (wineType) => {
$.get("./data/products.json", function (response, state) {
    if (state === "success") {
        let productsResponse = response;
        $('.product').hide();
        for (const item of productsResponse) {
            if (item.type == wineType) {
                //console.log(wineType);
                //console.log(item.id);
                $('.product[data-id=' + item.id + ']').css('display', 'flex');
            }
        }  
    }
});
}
  