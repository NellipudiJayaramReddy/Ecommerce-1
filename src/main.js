//  GANEsandeep*2107
let shop =document.getElementById("shop");



let basket =JSON.parse(localStorage.getItem("data"))||[];






let genshop=()=>{
    return( shop.innerHTML= shopItemsData.map((x)=>{
        
        // destructure
        let {id,name,price,desc,img}=x;
        let searchit=basket.find((x)=>x.id ===id)||[]

        
        return   `
    <div class="item">
    
    <img  class="img" src=${img} alt="">
    
    <div class="details flex">
    <h2>${name} </h2>
    <p>${desc}</p>
    </div>
    <div class="price-quant flex">
    <h2>$ ${price}</h2>
    <div class="btns flex">
        <i onclick="decrement(${id})" class="bi bi-dash"></i>
        <div id=${id} class="quantity">${searchit.item===undefined?0:searchit.item}</div>
        <i onclick="increment(${id})" class="bi bi-plus"></i>
     </div>
    </div>
</div>`; } ).join(""));
    

};

genshop();

let increment =(id) =>{
    let selectit=id
    // console.log(selectit.id)

    let searchit=basket.find((x)=> x.id === selectit.id);

    if (searchit === undefined) {
        basket.push({
            id:selectit.id,
            item:1
        });
    }else{
        searchit.item +=1;
    }

 
 
    update( selectit.id);
    localStorage.setItem("data",JSON.stringify(basket));


};

let decrement =(id) =>{
       let selectit=id
    // console.log(selectit.id)
    let searchit=basket.find((x)=> x.id === selectit.id);

    if (searchit.item === 0) return ;
    else{
        searchit.item -=1;
    }

 

 
    update( selectit.id);

    basket= basket.filter((x)=>x.item !==0)
    localStorage.setItem("data",JSON.stringify(basket));


  
};


let update =(id) =>{
    let searchit=basket.find((x)=> x.id === id);
    // console.log(searchit.item);
    document.getElementById(id).innerHTML =searchit.item;


calculation();


};


let calculation =()=>{
    let carticon =document.getElementById("cart-amount");
    carticon.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
     
};
calculation();

