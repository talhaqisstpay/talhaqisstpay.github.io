function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

function add_button_product_page(){
//Add one click button on product page  
var add_to_cart_terms = ['addtocart','addtobag','addtobasket']
for (const elem of document.querySelectorAll("button,input,a")){
    if(elem.tagName.toLocaleLowerCase() == "input"){
           if(add_to_cart_terms.includes(elem.value.toLowerCase().replace(/\s/g, ''))){
                  let qisstpay_one_click_button_product = `<input id="1c_product_button" type="button"  value="1Click Checkout" class="${elem.className} one-click-button" href="javascript:void(0);" onclick="qisstpay_open_checkout()" />`;
                  let qisstpay_button_product = htmlToElement(qisstpay_one_click_button_product);
                  elem.parentNode.insertBefore(qisstpay_button_product, elem.nextSibling);
          }
      }
      else if(elem.tagName.toLocaleLowerCase() == "button") {
           if(add_to_cart_terms.includes(elem.textContent.toLowerCase().replace(/\s/g, ''))){
                let qisstpay_one_click_button_product = `<button type="button" id="1c_product_button" class="${elem.className} one-click-button" href="javascript:void(0);" onclick="qisstpay_open_checkout()">1Click Checkout</button>`;
                let qisstpay_button_product = htmlToElement(qisstpay_one_click_button_product);
                elem.parentNode.insertBefore(qisstpay_button_product, elem.nextSibling);
                
          }
      }
      else if (elem.tagName.toLocaleLowerCase() == "a") {
           if(add_to_cart_terms.includes(elem.textContent.toLowerCase().replace(/\s/g, ''))){
                let qisstpay_one_click_button_product = `<a id="1c_product_button" class="${elem.className} one-click-button" href="javascript:void(0);" onclick="qisstpay_open_checkout()">1Click Checkout</a>`;
                let qisstpay_button_product = htmlToElement(qisstpay_one_click_button_product);
                elem.parentNode.insertBefore(qisstpay_button_product, elem.nextSibling);
          }
      }
  }
}

function add_button_cart_page(){
var checkout_terms = ['proceedtocheckout','checkout','completeorder','proceedtocart','proceedtobasket','buyitnow','buynow'];
for (const elem of document.querySelectorAll("button,input,a")){
  
    if(elem.tagName.toLocaleLowerCase() == "input"){
           if(checkout_terms.includes(elem.value.toLowerCase().replace(/\s/g, ''))){
                  let qisstpay_one_click_button_cart = `<input type="button" id="1c_cart_button"  value="1Click Checkout" class="${elem.className} one-click-button" href="javascript:void(0);" onclick="qisstpay_open_checkout_cart()" />`;
                  let qisstpay_button_cart = htmlToElement(qisstpay_one_click_button_cart);
                  if(!document.body.contains(document.getElementById("1c_product_button")))
                  {
                    elem.parentNode.insertBefore(qisstpay_button_cart, elem.nextSibling);
                  }
                  
                  elem.remove()
          }
      }
      else if(elem.tagName.toLocaleLowerCase() == "button") {
           if(checkout_terms.includes(elem.textContent.toLowerCase().replace(/\s/g, ''))){
                let qisstpay_one_click_button_cart = `<button type="button" id="1c_cart_button" class="${elem.className} one-click-button" href="javascript:void(0);" onclick="qisstpay_open_checkout_cart()">1Click Checkout</button>`;
                let qisstpay_button_cart = htmlToElement(qisstpay_one_click_button_cart);
                if(!document.body.contains(document.getElementById("1c_product_button")))
                  {
                    elem.parentNode.insertBefore(qisstpay_button_cart, elem.nextSibling);
                  }
                elem.remove()
          }
      }
      else if (elem.tagName.toLocaleLowerCase() == "a") {
           if(checkout_terms.includes(elem.textContent.toLowerCase().replace(/\s/g, ''))){
                let qisstpay_one_click_button_cart = `<a id="1c_cart_button" class="${elem.className} one-click-button" href="javascript:void(0);" onclick="qisstpay_open_checkout_cart()">1Click Checkout</a>`;
                let qisstpay_button_cart = htmlToElement(qisstpay_one_click_button_cart);
                if(!document.body.contains(document.getElementById("1c_product_button")))
                  {
                    elem.parentNode.insertBefore(qisstpay_button_cart, elem.nextSibling);
                  }
                elem.remove()
          }
      }
  }
}
add_button_product_page();
add_button_cart_page();
