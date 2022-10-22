const masPopulares = document.querySelector(".masPopulares");
const subTotal = document.querySelector(".subto");
const btnAddCart = document.querySelector(".btns-add-cart");
const recomendaciones = document.querySelector(".recomendaciones");
const titleProducts = document.querySelector(".title-products");
const populares = document.querySelector(".populares");
// Carrito
const cartMenu = document.querySelector(".cartBase");
const btnAdd = document.querySelector(".btns-add");
//categorias
const categorias = document.querySelector(".categorias");
// LocalStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (cartList) => {
  localStorage.setItem("cart", JSON.stringify(cartList));
};


// reder titulo de categoria

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

  const {name, img, description, price} = productsP;
  
  return `
  <div class="cards-p">
    <img class="img" src="${img}" alt="">
   
    <h3 class="title-pizza">${name}</h3>
    <h4 class="sub-title-pizza">c/${description}</h4>
    <div class="div-price-btn">
      <span class="price">$${price}</span>
      <button class="btns-add">Agregar</button>
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


const init = () => {
  DecidirRenderProducts();
  categorias.addEventListener("click", applyFilter);
}

init()






