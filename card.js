const btnCart = document.querySelector('.cart-block');
const mycart = document.querySelector('.mycart');
const btnclose = document.querySelector('.close');

btnCart.addEventListener('click', () => {
    mycart.classList.add('mycart-open');
});

btnclose.addEventListener('click', () => {
    mycart.classList.remove('mycart-open');
});

document.addEventListener('DOMContentLoaded', loadfood);

function loadfood() {
    loadcontent();
}


function loadcontent() {

    //remove cart items
    let btnremove = document.querySelectorAll('.remove1');
    btnremove.forEach((btn) => {
        btn.addEventListener('click', removeitem);

    });

    //Product Item Change Event
  let qtyElements=document.querySelectorAll('.cart-qty');
  qtyElements.forEach((input)=>{
    input.addEventListener('change',changeQty);
  });

    //add cart btns 
    let cartbtns = document.querySelectorAll('.cart');
    cartbtns.forEach((btn) => {
        btn.addEventListener('click', addcart);

    });

    updateTotal();



}


//Remove Item
function removeitem(){
    if(confirm('Are Your Sure to Remove')){
      let title=this.parentElement.querySelector('.title').innerHTML;
      itemList=itemList.filter(el=>el.title!=title);
      this.parentElement.remove();
      loadcontent();
    }
  }

//Change Quantity
function changeQty(){
    if(isNaN(this.value) || this.value<1){
      this.value=1;
    }
    loadcontent();
  }
  
  let itemList=[];

//add cart btns

function addcart() {
    let food = this.parentElement;
    let title = food.querySelector('.title').innerHTML;


    let price = food.querySelector('.pri').innerHTML;

    let imgsrc = food.querySelector('.imgfood').src;
    //console.log(title,price,imgsrc);

    
 let newProduct={title,price,imgsrc}

 //Check Product already Exist in Cart
 if(itemList.find((el)=>el.title==newProduct.title)){
  alert("Product Already added");
 
  return;
 }else{
  itemList.push(newProduct);
 }


     let newProductElement=createCartproduct(title,price,imgsrc);
     let element=document.createElement('div');
     element.innerHTML=newProductElement;
     let cartbasket=document.querySelector('.cart-content');
     cartbasket.append(element);


     loadcontent();

}


function createCartproduct(title, price, imgsrc) {

    return `
    <div class="item1">
        <img class="cart-img" src="${imgsrc}"/>
        <div class="cat-details">
            <div class="cart-title">
                <p class="title">${title}</p>
            </div>

            <div class="price-box d-flex justify-content-between">
                <div class="cart-price">${price}</div>
                <div class="cart-amt">${price}</div>
            </div>

            <input type="number" value="1" class="cart-quantity cart-qty" />

         </div>
                  <i class="ms-4 remove remove1 remove1 text-danger fa-solid fa-trash"></i>
        
    </div>
    `;
}


function updateTotal()
{
  const cartItems=document.querySelectorAll('.item1');
  const totalValue=document.querySelector('.total-price');

  let total=0;

  cartItems.forEach(product=>{
    let priceElement=product.querySelector('.cart-price');
    let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
    let qty=product.querySelector('.cart-quantity').value;
    total+=(price*qty);
    product.querySelector('.cart-amt').innerText="Rs."+(price*qty);

  });

  totalValue.innerHTML='Rs.'+total;


  // Add Product Count in Cart Icon

  const cartcount=document.querySelector('.cart-count');
  let count=itemList.length;
  cartcount.innerHTML=count;

  if(count==0){
    cartcount.style.display='none';
  }else{
    cartcount.style.display='block';
  }

}
