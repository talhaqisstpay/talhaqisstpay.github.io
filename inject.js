
var qisstpay_shop_currency = 'pkr'
var qisstpay_cart_currency = 'pkr'
var qisstpay_shop_money_format = 'pkr'
var qisstpay_shop_permanent_domain = 'qisstpay.com'
var qisstpay_theme_name = 'test'
var qisstpay_product = {
    "id": 6906608058550,
    "title": "Test Product Qisstpay",
    "handle": "test-product-qisstpay",
    "description": "Test Product",
    "published_at": "2021-07-29T11:37:17+05:00",
    "created_at": "2021-07-29T10:41:16+05:00",
    "vendor": "Test Umer",
    "type": "Test Product",
    "tags": [],
    "price": 160000,
    "price_min": 160000,
    "price_max": 160000,
    "available": true,
    "price_varies": false,
    "compare_at_price": null,
    "compare_at_price_min": 0,
    "compare_at_price_max": 0,
    "compare_at_price_varies": false,
    "variants": [
        {
            "id": 40239807365302,
            "title": "Default Title",
            "option1": "Default Title",
            "option2": null,
            "option3": null,
            "sku": "500",
            "requires_shipping": true,
            "taxable": true,
            "featured_image": null,
            "available": true,
            "name": "Test Product Qisstpay",
            "public_title": null,
            "options": [
                "Default Title"
            ],
            "price": 160000,
            "weight": 1000,
            "compare_at_price": null,
            "inventory_management": "shopify",
            "barcode": ""
        }
    ],
    "images": [
        "//cdn.shopify.com/s/files/1/0574/4964/4214/products/umarioioio.png?v=1627537278"
    ],
    "featured_image": "//cdn.shopify.com/s/files/1/0574/4964/4214/products/umarioioio.png?v=1627537278",
    "options": [
        "Title"
    ],
    "media": [
        {
            "alt": null,
            "id": 21707529486518,
            "position": 1,
            "preview_image": {
                "aspect_ratio": 1.778,
                "height": 1080,
                "width": 1920,
                "src": "https://cdn.shopify.com/s/files/1/0574/4964/4214/products/umarioioio.png?v=1627537278"
            },
            "aspect_ratio": 1.778,
            "height": 1080,
            "media_type": "image",
            "src": "https://cdn.shopify.com/s/files/1/0574/4964/4214/products/umarioioio.png?v=1627537278",
            "width": 1920
        }
    ],
    "content": "Test Product"
}
var qisstpay_current_variant = '9389823'
var qisstpay_cart_total_price = '500'
//var qisstpay_shipping_price = '788'
var qisstpay_cart = {
    "note": null,
    "attributes": {},
    "original_total_price": 200000,
    "total_price": 200000,
    "total_discount": 0,
    "total_weight": 0,
    "item_count": 1,
    "items": [
        {
            "id": 41027454533814,
            "properties": null,
            "quantity": 1,
            "variant_id": 41027454533814,
            "key": "41027454533814:c980b9ac37ddda3373dde3f80a0734a2",
            "title": "Qp - Small / Black",
            "price": 200000,
            "original_price": 200000,
            "discounted_price": 200000,
            "line_price": 200000,
            "original_line_price": 200000,
            "total_discount": 0,
            "discounts": [],
            "sku": "",
            "grams": 0,
            "vendor": "QisstPay BNPL",
            "taxable": true,
            "product_id": 6906692370614,
            "product_has_only_default_variant": false,
            "gift_card": false,
            "final_price": 200000,
            "final_line_price": 200000,
            "url": "/products/qp?variant=41027454533814",
            "featured_image": {
                "aspect_ratio": 1,
                "alt": "Qp",
                "height": 395,
                "url": "https://cdn.shopify.com/s/files/1/0574/4964/4214/products/IMG_0950.jpg?v=1627540489",
                "width": 395
            },
            "image": "https://cdn.shopify.com/s/files/1/0574/4964/4214/products/IMG_0950.jpg?v=1627540489",
            "handle": "qp",
            "requires_shipping": true,
            "product_type": "",
            "product_title": "Qp",
            "product_description": "QP Test Product",
            "variant_title": "Small / Black",
            "variant_options": [
                "Small",
                "Black"
            ],
            "options_with_values": [
                {
                    "name": "Size",
                    "value": "Small"
                },
                {
                    "name": "Color",
                    "value": "Black"
                }
            ],
            "line_level_discount_allocations": [],
            "line_level_total_discount": 0
        }
    ],
    "requires_shipping": true,
    "currency": "PKR",
    "items_subtotal_price": 200000,
    "cart_level_discount_applications": []
}
var qisstpay_js_snippet_version = '1.0.10';
var qisstpay_current_timestamp=Date.now();
  function qisstpay_open_checkout() {
    
    console.log("Add Call")
    fetch('/cart/clear.js', {
            method: 'POST',
            })
        .then(res => res.json())
         .then(res => {
                 console.log("Cart Clear Respone",res)
                const params = new URLSearchParams(window.location.search)
                
                var product_details = {
                    'id':params.has('variant') ? params.get('variant') : document.getElementById('product-selectors') ? document.getElementById('product-selectors').value :  qisstpay_current_variant.id ,
                    'form_type': 'product',
                    'utf8': '✓'
                };
                
                document.getElementsByName("quantity")[0] ? product_details.quantity = document.getElementsByName("quantity")[0].value : null
                var formBody = [];
                for (var property in product_details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(product_details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");
                console.log('1C Button Clicked', event);
                fetch('/cart/add.js', {
                method: 'POST',
                headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                body: formBody
                }).then(res => res.json())
                    .then(res => {
                      console.log("Responsse",res);
                      if(res){
                        (document.getElementById('qp8911_bootstrapModal')).remove();
                        let qisstpay_merchant_token_cart = btoa(location.hostname);
                        var qisstpay_products = [];
                        var totalPrice = res.final_price;
                        
                        let attrs = [];
          
                        if(res.options_with_values){
                          let val = res.options_with_values;

                          for(let j=0; j < val.length; j++){
                            let attr = {
                              [val[j].name]: val[j].value
                            };

                            attrs.push(attr);

                          }
                        }
                        
                        let src = res ? res.image : '';
                        src = src.indexOf('?') !== -1? src.substring(0, src.indexOf('?')): src;
//                         src = src.replace('https:', '');
//                         src = 'https::' + src;
                        
                        qisstpay_products = [
                          {
                            id: res.id,
                            price: res.final_price/100,
                            quantity: res.quantity,
                            src: src,
                            title: res.title,
                            variant_id: res.variant_id,
                            attribute: attrs
                          }
                        ];
                        
                        queryUrl = btoa(`products=`+JSON.stringify(qisstpay_products)+`&price=`+totalPrice+'&currency='+qisstpay_cart.currency+'&shipping_total='+0+'&tax='+0+'&url=https://sandbox.wordpress.qisstpay.com/wp-json/qisstpay/teez/');
                        url = `https://sandbox.tezcheckout.qisstpay.com/?identity-token=`+qisstpay_merchant_token+'&queryUrl='+queryUrl;

                        qisstpay_modal = `<div class="qp8911_modal custom_modal_by_me" id="qp8911_bootstrapModal" role="dialog">
                          <div class="qp8911_modal-dialog qp8911_modal-dialog-centered" role="document" >
                          <div class="qp8911_modal-content col-md-6 col-lg-4">
                          <!-- Modal Header -->
                          <!-- Modal Body -->
                          <div class="qp8911_modal-body teez" style="border-radius: 140px;">
                          <div class="qp-lds-roller" id="qp-lds-roller">
                          <lottie-player src="'.plugins_url( 'js/animation_qp_logo.json', __FILE__ ).'" background="transparent"  speed="1"  style="width: 300px; height: 300px;" loop autoplay></lottie-player>
                            </div>
                          <iframe id="qisttpayifram" class="qisttpayifram" width="100%" height="600"  src='`+url+`'  frameborder="0" allowpaymentrequest allowfullscreen style="background: #FFFFFF;border-radius: 22px;padding: 0px;" ></iframe>
                            </div>                      
                            </div>
                            </div>
                            </div>`;


                          qisstpay_modal = htmlToElement(qisstpay_modal);
                          document.getElementsByTagName('body')[0].appendChild(qisstpay_modal);
                        
                          document.getElementById('qp8911_bootstrapModal').style.display = 'block';
                          document.getElementsByTagName('body')[0].style.position = 'fixed';
                          document.getElementsByTagName('body')[0].style.width = '100%';
                        	
                          window.addEventListener('message', function(e) {
                              // Get the sent data
                              const data = e.data;

                              try {     
                                  if(data.qp_flag_teez == true){
                                      window.location.href= data.link;
                                      ///form Submit
                                  } else if(data.qp_flag_teez == false) {
                                      document.getElementById('qp8911_bootstrapModal').style.display = 'none';
                                      document.getElementsByTagName('body')[0].style.position = 'initial';
                                      document.getElementsByTagName('body')[0].style.width = 'initial';
                                  }
                              } catch(e){
                                  return;
                              }    
                          });
                      }
                    });
            });
         
  	
  }
  
  
  //Open one click checkout modal on cart page. Initiate self request
  function qisstpay_open_checkout_cart() {
    var cartObj;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/cart.js');
    xhr.send();
    xhr.onload = function() {
      cartObj = JSON.parse(xhr.response);
      
      if(cartObj){
        console.log(cartObj);
      (document.getElementById('qp8911_bootstrapModal_cart')).remove();
      
      let qisstpay_merchant_token_cart = btoa(location.hostname);
      var qisstpay_products = [];
      var totalPrice = cartObj.total_price;
      var items = cartObj.items;
      
      if(items) {
        for(let i=0; i < items.length; i++){
          let prod = items[i];
          let attrs = [];
          
          if(prod.options_with_values){
            let val = prod.options_with_values;
            
            for(let j=0; j < val.length; j++){
              let attr = {
                [val[j].name]: val[j].value
              };
              
              attrs.push(attr);
              
            }
          }
          
          let src = prod ? prod.image : '';
          src = src.indexOf('?') !== -1? src.substring(0, src.indexOf('?')): src;
//           src = src.replace('https:', '');
//           src = 'https::' + src;
          
          let tempProd = {
            id: prod.id,
            price: prod.price/100,
            quantity: prod.quantity,
            src: src,
            title: prod.title,
            variant_id: prod.variant_id,
            attribute: attrs
          }
          
          qisstpay_products.push(tempProd);
          
        }
      }
      
      queryUrl = btoa(`products=`+JSON.stringify(qisstpay_products)+`&price=`+totalPrice+'&currency='+qisstpay_cart.currency+'&shipping_total='+0+'&tax='+0+'&url=https://sandbox.wordpress.qisstpay.com/wp-json/qisstpay/teez/');
      url = `https://sandbox.tezcheckout.qisstpay.com/?identity-token=`+qisstpay_merchant_token+'&queryUrl='+queryUrl;

      qisstpay_modal = `<div class="qp8911_modal custom_modal_by_me" id="qp8911_bootstrapModal_cart" role="dialog">
        <div class="qp8911_modal-dialog qp8911_modal-dialog-centered" role="document" >
        <div class="qp8911_modal-content col-md-6 col-lg-4">
        <!-- Modal Header -->
        <!-- Modal Body -->
        <div class="qp8911_modal-body teez" style="border-radius: 140px;">
        <div class="qp-lds-roller" id="qp-lds-roller">
        <lottie-player src="'.plugins_url( 'js/animation_qp_logo.json', __FILE__ ).'" background="transparent"  speed="1"  style="width: 300px; height: 300px;" loop autoplay></lottie-player>
          </div>
        <iframe id="qisttpayifram" class="qisttpayifram" width="100%" height="600"  src='`+url+`'  frameborder="0" allowpaymentrequest allowfullscreen style="background: #FFFFFF;border-radius: 22px;padding: 0px;" ></iframe>
          </div>                      
          </div>
          </div>
          </div>`;


        qisstpay_modal = htmlToElement(qisstpay_modal);
        document.getElementsByTagName('body')[0].appendChild(qisstpay_modal);


        document.getElementById('qp8911_bootstrapModal_cart').style.display = 'block';
        document.getElementsByTagName('body')[0].style.position = 'fixed';
        document.getElementsByTagName('body')[0].style.width = '100%';
        window.addEventListener('message', function(e) {
          // Get the sent data
          const data = e.data;

          try {     
            if(data.qp_flag_teez == true){
              window.location.href= data.link;
              ///form Submit
            } else if(data.qp_flag_teez == false) {
              document.getElementById('qp8911_bootstrapModal_cart').style.display = 'none';
              document.getElementsByTagName('body')[0].style.position = 'initial';
              document.getElementsByTagName('body')[0].style.width = 'initial';
            }
          } catch(e){
            return;
          }    
        });
      }
      
    };
     
  }
  
  function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}


  
  
  	

 
  
 
  
  
  //This is the varaible that has One click button on product page assigned
  let qisstpay_one_click_button = `<a class="teez-button" href="javascript:void(0);" onclick="qisstpay_open_checkout()">
                    1Click button
                </a>`;
  
  //Converting that button to html
  let qisstpay_button = htmlToElement(qisstpay_one_click_button);
  
  
  //This is the varaible that has One click button on cart page assigned
//   let qisstpay_one_click_button_cart = `<a class="teez-button" href="javascript:void(0);" onclick="qisstpay_open_checkout_cart()">
//                     1Click button
//                 </a>`;
  
  //Converting that button to html
//   let qisstpay_button_cart = htmlToElement(qisstpay_one_click_button_cart);
  
  
  
  //document.getElementsByClassName('product-form__item--submit product-form__item--payment-button product-form__item--no-variants')[0].parentElement.prepend(qisstpay_button);    
  
  //This is to display one click button on product page
//   if(document.getElementsByClassName('product-form__controls-group product-form__controls-group--submit')[0]) //{
//   	document.getElementsByClassName('product-form__controls-group product-form__controls-group--submit')[0].parentElement.append(qisstpay_button);
//   //}
  
  
  //This is to display one click button on cart page
//   if(document.getElementsByClassName('cart__submit-controls')[0]){
// 	  document.getElementsByClassName('cart__submit-controls')[0].parentElement.append(qisstpay_button_cart);  
//   }
  

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
  
document.onreadystatechange = function(){

  if(!document.body.contains(document.getElementById("1c_product_button")))
  {
    add_button_product_page();
  }
  if(!document.body.contains(document.getElementById("1c_cart_button")))
  {
  	add_button_cart_page();
  }
}

  document.addEventListener("click", function (){
  add_button_cart_page();
  })
  

  
