  /////code
  
function change_text(status,type){
	console.log("Check")
    if(type=="product"){
      if(document.getElementById("1c_product_button"))
      {
        console.log("btnfound")
        var buttonElem = document.getElementById('1c_product_button');
        if(buttonElem.tagName.toLocaleLowerCase() == "input"){
        //type input

         if(status){
			buttonElem.classList.add('spinning');
            buttonElem.value="Loading...";
			buttonElem.disabled = true;
		 }
          else if(!status) {
		   buttonElem.classList.remove('spinning');
           buttonElem.disabled = false;
           buttonElem.innerHTML="1-Click Checkout";
         }
        }
        else{
          //type buttonn
           buttonElem.classList.add('spinning');
           buttonElem.innerHTML="Loading...";
           buttonElem.disabled = true;


		  if(status){
			buttonElem.classList.add('spinning');
           buttonElem.innerHTML="Loading...";
           buttonElem.disabled = true;
		 }
          else if(!status) {
		   buttonElem.classList.remove('spinning');
           buttonElem.disabled = false;
           buttonElem.innerHTML="1-Click Checkout";
         }
        }
      }
    }
  else if(type=="cart"){
	if(document.getElementById("1c_cart_button"))
      {
        console.log("btnfound")
        var buttonElem = document.getElementById('1c_cart_button');
        if(buttonElem.tagName.toLocaleLowerCase() == "input"){
        //type input
         
         if(status){
			buttonElem.classList.add('spinning');
            buttonElem.value="Loading...";
			buttonElem.disabled = true;
		 }
          else if(!status) {
		   buttonElem.classList.remove('spinning');
           buttonElem.disabled = false;
           buttonElem.innerHTML="1-Click Checkout";
         }
        
        }
        else{
          //type buttonn
           buttonElem.classList.add('spinning');
           buttonElem.innerHTML="Loading...";
           buttonElem.disabled = true;
        }
      }
  }
}
 function remove_payment_methods(){
    for(const elem of document.querySelectorAll('[data-testid="ShopifyPay-button"]')){
        elem.remove()
    }
    
    for(const elem of document.querySelectorAll('[data-testid="GooglePay-button"]')){
        elem.remove()
    } 
    
    for(const elem of document.querySelectorAll('[data-testid="FacebookPay-button"]')){
        elem.remove()
    }
} 
   async function getQisstPayMerchantToken(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
};


async function getQpCartInfo(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    }});
  return response.json(); // parses JSON response into native JavaScript objects}

}; 

function slack_hook(error){
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("payload", "{\"channel\": \"#shopify-errors\", \"username\": \"QP_Shopify\", \"text\": \"Error : " +error+"\\nURL : "+window.location.href+"\",\"icon_emoji\":\":ghost\"}");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://hooks.slack.com/services/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", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
  //Open one click checkout modal on product page
  function qisstpay_open_checkout() {
    change_text(true,"product");
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
                      if(res.status == "bad_request"){
                        console.log("Slack Webhook")
                        slack_hook(res.status);
                      }
                      if(res){
						change_text(false,"product");
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
                        url = `https://tezcheckout.qisstpay.com/?identity-token=`+qisstpay_merchant_token+'&queryUrl='+queryUrl;

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
      url = `https://tezcheckout.qisstpay.com/?identity-token=`+qisstpay_merchant_token+'&queryUrl='+queryUrl;

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

  var qisstpay_products= '';
  let qisstpay_merchant_token = btoa(location.hostname);
  let src = qisstpay_product ? qisstpay_product.featured_image : '';
	src = src.indexOf('?') !== -1? src.substring(0, src.indexOf('?')): src;
  	src = 'https::' + src;
  
  var attrOptions = qisstpay_product ? qisstpay_product.options: [];
  var attributes = [];
  var variant_id = '';
  var variants = qisstpay_current_variant;
  
  
  
  //If product variants are available
  if(attrOptions){
    
    //Get default values of attributes and assign to attributes variable
    for(let i=0; i < attrOptions.length; i++){
      let select = document.getElementById(`SingleOptionSelector-`+i);
      let value = '';
      
      if(select){
        value = select.options[select.selectedIndex].value;
      }
      
      let key = attrOptions[i];
      let attr = {
        [key]: value
      };     

      attributes.push(attr);

    }
  }
  
  if(qisstpay_product) {
    qisstpay_products = [
      {
        id: qisstpay_product.id,
        price: qisstpay_product.price/100,
        quantity: qisstpay_product.quantity,
        src: src,
        title: qisstpay_product.title,
        variant_id: qisstpay_current_variant.sku,
        attribute: attributes
      }
    ];
  }
  	

    let total_price = qisstpay_product ? qisstpay_product.price/100 : 0;
  	var queryUrl = btoa(`products=`+JSON.stringify(qisstpay_products)+`&price=`+total_price+'&currency='+qisstpay_cart.currency+'&shipping_total='+0+'&tax='+0+'&url=https://sandbox.wordpress.qisstpay.com/wp-json/qisstpay/teez/');
    //+'&price='+total_price+'&currency='+currency+'&url='+url+'/wp-json/qisstpay/teez/'+'&shipping_total='+total_shipping_price+'&tax='+total_tax
  	var url = `https://tezcheckout.qisstpay.com/?identity-token=`+qisstpay_merchant_token+'&queryUrl='+queryUrl;
  
    var cart_url = `https://tezcheckout.qisstpay.com/?identity-token=`+qisstpay_merchant_token+'&queryUrl='+queryUrl;
    
    var userSelection = document.getElementsByClassName('single-option-selector');

    //Event when user changes the attributes
    for(var i = 0; i < userSelection.length; i++) {
      (function(index) {
        userSelection[index].addEventListener("change", function() {
          
          console.log(qisstpay_product.current_variant);
          (document.getElementById('qp8911_bootstrapModal')).remove();
          let tempKey = attrOptions[index];
          let value = this.value;


          let tempAttr = {
            [tempKey]: value
          };

          attributes[index] = tempAttr;
          console.log(attributes);
          
          
          //revise the qisstpay products variable
          qisstpay_products = [
            {
              id: qisstpay_product.id,
              price: qisstpay_product.price/100,
              quantity: qisstpay_product.quantity,
              src: src,
              title: qisstpay_product.title,
              variant_id: qisstpay_current_variant.sku,
              attribute: attributes
            }
          ];
          
          queryUrl = btoa(`products=`+JSON.stringify(qisstpay_products)+`&price=`+total_price+'&currency='+qisstpay_cart.currency+'&shipping_total='+0+'&tax='+0+'&url=https://sandbox.wordpress.qisstpay.com/wp-json/qisstpay/teez/');
          url = `https://tezcheckout.qisstpay.com/?identity-token=`+qisstpay_merchant_token+'&queryUrl='+queryUrl;
        
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

          
        })
      })(i);
    }
  
    //Modal code for product page
	let qisstpay_modal = `<div class="qp8911_modal custom_modal_by_me" id="qp8911_bootstrapModal" role="dialog">
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
  
  //Modal code for cart page
  let qisstpay_modal_cart = `<div class="qp8911_modal custom_modal_by_me" id="qp8911_bootstrapModal_cart" role="dialog">
                        <div class="qp8911_modal-dialog qp8911_modal-dialog-centered" role="document" >
                            <div class="qp8911_modal-content col-md-6 col-lg-4">
                            <!-- Modal Header -->
                                <!-- Modal Body -->
                                <div class="qp8911_modal-body teez" style="border-radius: 140px;">
                                    <div class="qp-lds-roller" id="qp-lds-roller">
                                        <lottie-player src="'.plugins_url( 'js/animation_qp_logo.json', __FILE__ ).'" background="transparent"  speed="1"  style="width: 300px; height: 300px;" loop autoplay></lottie-player>
                                    </div>
                                    <iframe id="qisttpayifram" class="qisttpayifram" width="100%" height="600"  src='`+cart_url+`'  frameborder="0" allowpaymentrequest allowfullscreen style="background: #FFFFFF;border-radius: 22px;padding: 0px;" ></iframe>
                                </div>                      
                            </div>
                        </div>
                    </div>`;
  qisstpay_modal_cart = htmlToElement(qisstpay_modal_cart);
  
  
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
  
function remove_buyit(){
//Add one click button on product page  
var add_to_cart_terms = ['buyitnow','buyit','buynow']
for (const elem of document.querySelectorAll("button,input,a")){
    if(elem.tagName.toLocaleLowerCase() == "input"){
           if(add_to_cart_terms.includes(elem.value.toLowerCase().replace(/\s/g, ''))){
                  let qisstpay_one_click_button_product = `<input id="1c_product_button" type="button"  value="1Click Checkout" class="${elem.className} one-click-button" href="javascript:void(0);" onclick="qisstpay_open_checkout()" />`;
                  let qisstpay_button_product = htmlToElement(qisstpay_one_click_button_product);
					elem.style.display="none"
                  //elem.remove()
          }
      }
      else if(elem.tagName.toLocaleLowerCase() == "button") {
           if(add_to_cart_terms.includes(elem.textContent.toLowerCase().replace(/\s/g, ''))){
                let qisstpay_one_click_button_product = `<button type="button" id="1c_product_button" class="${elem.className} one-click-button" href="javascript:void(0);" onclick="qisstpay_open_checkout()">1Click Checkout</button>`;
                let qisstpay_button_product = htmlToElement(qisstpay_one_click_button_product);
            	 elem.style.display="none"
                // elem.remove()
                
          }
      }
      else if (elem.tagName.toLocaleLowerCase() == "a") {
           if(add_to_cart_terms.includes(elem.textContent.toLowerCase().replace(/\s/g, ''))){
                let qisstpay_one_click_button_product = `<a id="1c_product_button" class="${elem.className} one-click-button" href="javascript:void(0);" onclick="qisstpay_open_checkout()">1Click Checkout</a>`;
                let qisstpay_button_product = htmlToElement(qisstpay_one_click_button_product);
             elem.style.display="none"
               // elem.remove()
          }
      }
  }
}
function add_button_product_page(){
//Add one click button on product page  

//custom selector million standards 
for (const ele of document.querySelectorAll(".btn--add-to-cart")){

   
		    ele.style.margin = "10px"
                let qisstpay_one_click_button_product = `<button type="button" id="1c_product_button"  class="${ele.className.replace('add-to-cart','').replace('single_add_to_cart_button','')} one-click-button" href="javascript:void(0);" onclick="qisstpay_open_checkout()">1-Click Checkout</button>`;
                let qisstpay_button_product = htmlToElement(qisstpay_one_click_button_product);
                ele.parentNode.insertBefore(qisstpay_button_product, ele.nextSibling);
                
          
}
//custom selector million standards
var add_to_cart_terms = ['addtocart','addtobag','addtobasket']
for (const elem of document.querySelectorAll("button,input,a")){
    if(elem.tagName.toLocaleLowerCase() == "input"){
           if(add_to_cart_terms.includes(elem.value.toLowerCase().replace(/\s/g, ''))){
		   elem.style.margin = "10px"
                  let qisstpay_one_click_button_product = `<input id="1c_product_button" type="button"  value="1-Click Checkout" class="${elem.className.replace('add-to-cart','').replace('single_add_to_cart_button','')} one-click-button" href="javascript:void(0);" onclick="qisstpay_open_checkout()" />`;
                  let qisstpay_button_product = htmlToElement(qisstpay_one_click_button_product);
                  elem.parentNode.insertBefore(qisstpay_button_product, elem.nextSibling);
          }
      }
      else if(elem.tagName.toLocaleLowerCase() == "button") {
           if(add_to_cart_terms.includes(elem.textContent.toLowerCase().replace(/\s/g, ''))){
		    elem.style.margin = "10px"
                let qisstpay_one_click_button_product = `<button type="button" id="1c_product_button"  class="${elem.className.replace('add-to-cart','').replace('single_add_to_cart_button','')} one-click-button" href="javascript:void(0);" onclick="qisstpay_open_checkout()">1-Click Checkout</button>`;
                let qisstpay_button_product = htmlToElement(qisstpay_one_click_button_product);
                elem.parentNode.insertBefore(qisstpay_button_product, elem.nextSibling);
                
          }
      }
      else if (elem.tagName.toLocaleLowerCase() == "a") {
           if(add_to_cart_terms.includes(elem.textContent.toLowerCase().replace(/\s/g, ''))){
		    elem.style.margin = "10px"
                let qisstpay_one_click_button_product = `<a id="1c_product_button"  class="${elem.className.replace('add-to-cart','').replace('single_add_to_cart_button','')} one-click-button" href="javascript:void(0);" onclick="qisstpay_open_checkout()">1-Click Checkout</a>`;
                let qisstpay_button_product = htmlToElement(qisstpay_one_click_button_product);
                elem.parentNode.insertBefore(qisstpay_button_product, elem.nextSibling);
          }
      }
  }
}

function add_button_cart_page(){

//custom selector million standards 
for (const ele of document.querySelectorAll(".btn--checkout")){

   
		    ele.style.margin = "10px"
                let qisstpay_one_click_button_product = `<button type="button" id="1c_product_button"  class="${ele.className.replace('add-to-cart','').replace('single_add_to_cart_button','')} one-click-button" href="javascript:void(0);" onclick="qisstpay_open_checkout_cart()">1-Click Checkout</button>`;
                let qisstpay_button_product = htmlToElement(qisstpay_one_click_button_product);
                ele.parentNode.insertBefore(qisstpay_button_product, ele.nextSibling);
		ele.remove()
                
          
}
//custom selector million standards
var checkout_terms = ['proceedtocheckout','checkout','completeorder','proceedtocart','proceedtobasket'];
for (const elem of document.querySelectorAll("button,input,a")){
  
    if(elem.tagName.toLocaleLowerCase() == "input"){
           if(checkout_terms.includes(elem.value.toLowerCase().replace(/\s/g, ''))){
                  let qisstpay_one_click_button_cart = `<input type="button" id="1c_cart_button"  value="1-Click Checkout" class="${elem.className} one-click-button" href="javascript:void(0);" onclick="qisstpay_open_checkout_cart()" />`;
                  let qisstpay_button_cart = htmlToElement(qisstpay_one_click_button_cart);
                  
                  elem.parentNode.insertBefore(qisstpay_button_cart, elem.nextSibling);
                  
                  
                  elem.remove()
          }
      }
      else if(elem.tagName.toLocaleLowerCase() == "button") {
           if(checkout_terms.includes(elem.textContent.toLowerCase().replace(/\s/g, ''))){
                let qisstpay_one_click_button_cart = `<button type="button" id="1c_cart_button" class="${elem.className} one-click-button" href="javascript:void(0);" onclick="qisstpay_open_checkout_cart()">1-Click Checkout</button>`;
                let qisstpay_button_cart = htmlToElement(qisstpay_one_click_button_cart);
                
                elem.parentNode.insertBefore(qisstpay_button_cart, elem.nextSibling);
                  
                elem.remove()
          }
      }
      else if (elem.tagName.toLocaleLowerCase() == "a") {
           if(checkout_terms.includes(elem.textContent.toLowerCase().replace(/\s/g, ''))){
                let qisstpay_one_click_button_cart = `<a id="1c_cart_button" class="${elem.className} one-click-button" href="javascript:void(0);" onclick="qisstpay_open_checkout_cart()">1-Click Checkout</a>`;
                let qisstpay_button_cart = htmlToElement(qisstpay_one_click_button_cart);
                
                elem.parentNode.insertBefore(qisstpay_button_cart, elem.nextSibling);
                  
                elem.remove()
          }
      }
  }
}
  if(!document.body.contains(document.getElementById("1c_product_button")))
  {
    add_button_product_page();
  }
  if(!document.body.contains(document.getElementById("1c_cart_button")))
  {
  	add_button_cart_page();
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

//closing modal on clicking outside iframe
window.addEventListener('click', function(event){
	var QP_MODAL = document.getElementsByClassName('qp8911_modal-body teez');
    
	if (event.target != QP_MODAL && event.target.parentNode != QP_MODAL){
//         document.getElementById('qp8911_bootstrapModal').style.display = 'none';
//         document.getElementById('qp8911_bootstrapModal_cart').style.display = 'none';
    }
});
//closing modal on clicking outside iframe


var intervalId = window.setInterval(function(){
  add_button_cart_page()
  remove_buyit();
  remove_payment_methods();
}, 10);
  

  
  //Including modal in the body
  if(document.getElementsByTagName('body')[0]){
    document.getElementsByTagName('body')[0].appendChild(qisstpay_modal);
  }
  
  //Including modal in the body
  if(document.getElementsByTagName('body')[0]){
    document.getElementsByTagName('body')[0].appendChild(qisstpay_modal_cart);
  } 

  ///codee
 
