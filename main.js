const masPopulares = document.querySelector(".masPopulares");
const subTotal = document.querySelector(".subto");
const btnAddCart = document.querySelector(".btns-add-cart");
const recomendaciones = document.querySelector(".recomendaciones");//caja que contiene las recomendaciones
const titleProducts = document.querySelector(".title-products");
const populares = document.querySelector(".populares");
// Carrito
const cartContainer = document.querySelector(".cartContainer")
const cartMenu = document.querySelector(".cartBase");
const btnAdd = document.querySelector(".btns-add"); // creo que esta mal
const cartOpen = document.querySelector(".cartIcon");
const cartX = document.querySelector(".cerrarCarrito");
const subtotal = document.getElementById("subtotal");
const productosShopContainer = document.getElementById("cartMenu"); //aca se remderizan los productos en el carrito
const precioTotal = document.getElementById("precioTotal"); 
//categorias
const categorias = document.querySelector(".categorias");
// LocalStorage

let carts = JSON.parse(localStorage.getItem("carts")) || [];

const saveLocalStorage = (cartList) => {
  localStorage.setItem("carts", JSON.stringify(cartList));
};


// render titulo de categoria

const renderTitulo = (producto = undefined) => {
  if (!producto){
    titleProducts.innerHTML = `<h4 class="tiluloCategoria">POPULARES</h4> `
    return;
  }
  producto = producto.toUpperCase();
  titleProducts.innerHTML = `<h4 class="tiluloCategoria">${producto}</h4> `
  
}

//renderiza producto



const renderProduct = (productsP) =>{

  const {name, img, description, price,id} = productsP;
  
  return `
  <div class="cards-p">
    <img class="img" src="${img}" alt="">
   
    <h3 class="title-pizza">${name}</h3>
    <h4 class="sub-title-pizza">c/${description}</h4>
    <div class="div-price-btn">
      <span class="price">$${price}</span>
      <button class="btns-add" data-id=${id}>Agregar</button>
    </div>
  </div>`


//renderiza productos
}

const renderProducts = () => {
  populares.innerHTML= productos.map(renderProduct).join('');

}

// filtrar populares

const renderFilteredPopulares = () => {
  const productList = productos.filter(
    (product) => product.popular)
    
  populares.innerHTML = productList.map(renderProduct).join("");
}

// Filtrado de categorias

const renderFilteredProducts = (category) => {
  const productList = productos.filter(
    (product) => product.category === category
  );

  populares.innerHTML = productList.map(renderProduct).join("");
};


const DecidirRenderProducts = ( category = undefined) => {
  if (!category) {
    renderTitulo();
    renderFilteredPopulares();
    // renderProducts();
    return;
  }
  renderTitulo(category)
  renderFilteredProducts(category);
};



// Funcion para aplicar el filtro por categorias
const applyFilter = (e) => {

  if (!e.target.dataset.category) {
    populares.innerHTML = "";
    
    DecidirRenderProducts();
  } else {
    DecidirRenderProducts( e.target.dataset.category);
   
  }
};


///////////////////// logica para abrir y cerrar el carrito
const openCart = () => {
  cartContainer.classList.remove("hidden");
}

const closeCart = () => {
  cartContainer.classList.add("hidden");

};
///////////////////////////////////// logica para mostrar los pruductos del carrito 


//logica para renderizar 
const renderCartCarrito = (objeto)=>{
  const {img ,name , description,price,id ,cantidad} = objeto;
  return `
  <div class="cart-item">
    <img src=${img} alt="Nft del carrito" />
    <div class="item-info">
      <h3 class="item-title">${name}</h3>
      <p class="item-bid">${description}</p>
      <span class="item-price">${price}</span>
    </div>
    <div class="item-handler">
      <span class="quantity-handler down" data-id=${id}>-</span>
      <span class="item-quantity">${cantidad}</span> 
      <span class="quantity-handler up" data-id=${id}>+</span>
    </div>
</div>`
}

const renderCart = () => {
  if (!carts.length) {
    productosShopContainer.innerHTML = `<p class="empty-msg">No hay productos en el carrito</p>`;
    return;
  }
  productosShopContainer.innerHTML = carts.map(renderCartCarrito).join("");


}

const calcularPrecioTotal = () => {
  return carts.reduce((acc, cur) => acc + Number(cur.precio) * cur.cantidad, 0);
};

const mostrarTotal = () => {
  precioTotal.innerHTML = `$ {getCartTotal().toFixed(2)}`;
};

//Recorremos el carrito y cuando encuentra el producto el cual agregamos, sumamos una unidad.
const addUnitToProduct = (product) => {
  carts = carts.map((cartProduct) => {
    return cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct;
  });
};

// agregamos producto en el carrito y le agregamos nuevo atrivuto
const createCartProduct = (product) => {
  carts = [...carts, { ...product, quantity: 1 }];
};

const checkCartState = () => {
  saveLocalStorage(carts);
  renderCart(carts);
  mostrarTotal(carts);

};

const isExistingCartProduct = (id) => {
  return carts.find((item) => item.id === id);
};

// const buscarProductoPorID = (id) =>{

//   return carts.find((item) => item.id === id);
// }

const addProduct = (e) => {
  if (!e.target.classList.contains("btn-add")) return;

  const idi = e.target.dataset.id;

  const producto = isExistingCartProduct(idi);
  
  if (isExistingCartProduct(id)) {
    // Añadir una unidad
    addUnitToProduct(producto);
    //Mostrar el modal de que se agrego una unidad
    //showSuccessModal("Se agregó una unidad del producto al carrito");
  } else {
    //Crear el producto
    createCartProduct(producto);
    //Mostrar el modal de que se agrego el producto
    //showSuccessModal("El producto se ha agregado al carrito");
  }
  checkCartState();
};



/////////////////////////////////////////////////////////////////
const init = () => {
  DecidirRenderProducts();
  categorias.addEventListener("click", applyFilter);
  // cartOpen.addEventListener("click", openCart);
  cartOpen.addEventListener("click", openCart);
  cartX.addEventListener("click",closeCart);

  recomendaciones.addEventListener("click", addProduct);

}

init()
