const masPopulares = document.querySelector(".masPopulares");
const subTotal = document.querySelector(".subto")
const btnAddCart = document.querySelector(".btns-add-cart")
const recomendaciones = document.querySelector(".recomendaciones")


// Carrito
const cartMenu = document.querySelector(".cartBase");
const btnAdd = document.querySelector(".btns-add")


// LocalStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (cartList) => {
  localStorage.setItem("cart", JSON.stringify(cartList));
};

// Filtrado de categorias

const renderProducts = (productsP) =>{

  const {name, img, description, price} = productsP;

  `
  <div class="cards-p">
  <div class="img">${img}</div>
  <h3 class="title-pizza">${name}</h3>
  <h4 class="sub-title-pizza">c/${description}</h4>
  <div class="div-price-btn">
      <span class="price">$${price}</span>
      <button class="btns-add">Agregar</button>
  </div>`


}

const filterProducts = (e) =>{
  if(!e.target.classList.contains("cards-c")) return;


}







const init = () => {
masPopulares.addEventListener("click", renderProducts("Simple"))
}
init()






