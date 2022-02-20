
  // Overrides:
 //var qisstpay_min = 1500;      //if a different amount is agreed b/w merchant and QisstPay      
 //var qisstpay_max = 50000;     //if a different amount is agreed b/w merchant and QisstPay
 var qisstpay_current_url = window.location.hostname;
 

  // var qisstpay_cbt_enabled = false;   
// var qisstpay_logo_theme = 'colour'; 
// var qisstpay_product_selector = '#product-price-selector';
// var qisstpay_cart_integration_enabled = true;
// var qisstpay_cart_static_selector = '#cart-subtotal-selector';

// Non-editable fields: 
 
var qisstpay_shop_currency = {{ shop.currency | json }};
var qisstpay_cart_currency = {{ cart.currency.iso_code | json }};
var qisstpay_shop_money_format = {{ shop.money_format | json }};
var qisstpay_shop_permanent_domain = {{ shop.permanent_domain | json }};
var qisstpay_theme_name = {{ theme.name | json }};
var qisstpay_product = {{ product | json }};
var qisstpay_current_variant = {{ product.selected_or_first_available_variant | json }};
var qisstpay_cart_total_price = {{ cart.total_price | json }};
//var qisstpay_shipping_price = {{ shipping_method.original_price | money }};
var qisstpay_cart = {{ cart | json }};
var qisstpay_js_snippet_version = '1.0.10';
var qisstpay_current_timestamp=Date.now();
  
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
  
  
  
  

  
  
  
  
var qisstpay_product_encoded = btoa(JSON.stringify(qisstpay_current_variant))

var qisstpay_script_url="https://d13b6tz4fn4nn5.cloudfront.net/web/js/qpw.js?store_url="+qisstpay_current_url+"&qisstpay_shop_currency="+qisstpay_shop_currency+"&qisstpay_cart_currency="+qisstpay_cart_currency+"&qisstpay_product="+qisstpay_product_encoded+"&time="+qisstpay_current_timestamp;function qisstpay_loadjscssfile(t,s){var e;"js"==s?((e=document.createElement("script")).setAttribute("type","text/javascript"),e.setAttribute("src",t)):"css"==s&&((e=document.createElement("link")).setAttribute("rel","stylesheet"),e.setAttribute("type","text/css"),e.setAttribute("href",t)),void 0!==e&&document.getElementsByTagName("head")[0].appendChild(e)}qisstpay_loadjscssfile(qisstpay_script_url,"js");
    
  
