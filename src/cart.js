let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let carticon = document.getElementById("cart-amount");
  carticon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();

let label = document.getElementById("label");

let shopping_cart = document.getElementById("shopping_cart");

// label.innerHTML = `

// `;

{
  /* <i class="fa-sharp fa-solid fa-xmark"></i> */
}

let gencartitems = () => {
  if (basket.length !== 0) {
    return (shopping_cart.innerHTML = basket
      .map((x) => {
        // console.log(x);
        let { id, item } = x;
        let searchit = shopItemsData.find((y) => y.id === id) || [];
        return `
           

            
            </div>


                <div class="cart_item ">
                         <img width="130" src="${searchit.img}" alt="">
                        <div class"details" >
                         <div class="title-price-x ">  


                         <div class="title-price " >
                             <p> ${searchit.name}</p>        
                              <p class="price">$ ${searchit.price}</p>  
                              
                        </div>
              
                             <i onclick="removeItem (${id})" class="bi bi-x"></i>


                        </div>

                           <div class="btns flex  " id="last-btn">
                           <i onclick="decrement(${id})" class="bi bi-dash"></i>
                           <div id=${id} class="quantity">${item}</div>
                           <i onclick="increment(${id})" class="bi bi-plus"></i>
                        </div>
                           <h3>$ ${searchit.price * item}</h3>
                       </div>
                </div>
                        


</div> `;
      })
      .join(""));
  } else {
    shopping_cart.innerHTML = ``;

    label.innerHTML = `
         <h2>Cart is empty</h2>
         <a href="index.html">
         <button class="homebutton"> Back to home</button>
         </a>
 
        `;
  }
};

gencartitems();

let increment = (id) => {
  let selectit = id;
  // console.log(selectit.id)

  let searchit = basket.find((x) => x.id === selectit.id);

  if (searchit === undefined) {
    basket.push({
      id: selectit.id,
      item: 1,
    });
  } else {
    searchit.item += 1;
  }

  gencartitems();
  update(selectit.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  console.log(id);
  let selectit = id;
  // console.log(selectit.id)
  let searchit = basket.find((x) => x.id === selectit.id);

  if (searchit.item === 0) return;
  else {
    searchit.item -= 1;
  }

  update(selectit.id);

  basket = basket.filter((x) => x.item !== 0);
  gencartitems();

  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let searchit = basket.find((x) => x.id === id);
  // console.log(searchit.item);
  document.getElementById(id).innerHTML = searchit.item;

  calculation();
  totalamount();
};

let removeItem = (id) => {
  let selectedItem = id;
  console.log(selectedItem.id);

  basket = basket.filter((x) => x.id !== selectedItem.id);

  //    gencartitems();

  localStorage.setItem("data", JSON.stringify(basket));

  gencartitems();
  totalamount();
  calculation();
};

let Clearcut = () => {
  basket = [];
  gencartitems();
  localStorage.setItem("data", JSON.stringify(basket));
  calculation();
};

let totalamount = () => {
  if (basket.length != 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x;
        let searchit = shopItemsData.find((y) => y.id === id) || [];
        return item * searchit.price;
      })
      .reduce((x, y) => x + y, 0);
    label.innerHTML = `
    <h2>Total Bill:$ ${amount}</h2>
    <button class="Checkout">Checkout</button>
    <button onclick="Clearcut()" class="Removeall">Clear cart</button>
    
    `;
  } else return;
};
totalamount();
