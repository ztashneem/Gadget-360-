//DOM SELECTION-ALL PRODUCTS
const searchBtn = document.getElementById('search');
const searchInput = document.getElementById('search-input');
const detailsBtn = document.getElementById('details');
const loadMoreBtn = document.getElementById('load-more');
const displayResultSelector = document.getElementById('display-result-selector');
const productDetailsSelector = document.getElementById('product-details-selector');
const searchResultText = document.querySelector('.search-result-text');
const spinner = document.getElementById('spinner');
let loadMoreProducts = [];

//Loading button Initial value 
loadMoreBtnDisplay('none');
//Loading snipper Initial value 
loading('none');

//Button displaying 
function loadMoreBtnDisplay (style){
    loadMoreBtn.style.display = style;
}
function loading (value) {
    spinner.style.display = value;
}
//Search Product Function
const searchProduct = () =>{
    
    //Spinner Show On loading data 
    loading('block');
    //Search input value on collecting
    let searchInputData = searchInput.value.toLowerCase();
    searchInput.value = "";
    displayResultSelector.innerHTML = "";
    productDetailsSelector.innerHTML = "";
    if(searchInputData ===""){
        searchResult('Please Fill The Search Field Properly!')

        //load more on Null data search 
        loadMoreBtnDisplay('none')
        //Loading spinner  hide on search empty
        loading('none');

    }else{
//Fetching Search Result 
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchInputData}`)
        .then(res =>res.json())
        .then(result => displaySearchResult(result,searchInputData))
        
        //If Search Data not found then error messages,
        .catch(err=>{
            //load more button none on  getting errors on search
            loadMoreBtnDisplay('none')
            //If found any error then spinner hide
            loading('none');

            searchResult("something may be wrong! please try later!")
        })
    }
}
//Search Result on showing data info
const searchResult = (text,searchInputData="")=>{
        searchResultText.innerHTML = `
        <span id="search-result-text"> ${text} <span class="search-text">${searchInputData}</span></span>
        `
}
//loading- slug;
const loadProductDetails = (slug) =>{

    productDetailsSelector.innerHTML = "";
    fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
    .then(res => res.json())
    .then(result =>displayProductDetails(result))
    .catch(err => searchResult("something may be wrong! please try later!"))
}

//Details display product on button
const displayProductDetails = (result) =>{
//Loading
    loading('block');
const phone = result.data;
    productDetailsSelector.innerHTML = `
    <div class="col-lg-4">
                    <div class="product-details-image">
                        <img src="${phone.image}" alt="">
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="product-details-content">
                        <h1>Product Details : </h1>
                        <div class="details-box">
                            <ul>
                                <li><span>Name</span> : ${phone.name}</li>
                                <li><span>releaseDate</span> : ${phone.releaseDate ? phone.releaseDate : "no releaseDate found" }</li>
                                <li><span>brand</span> : ${phone.brand}</li>
                                <h3 class="details-title">Main Feature:</h3>
                                <li><span>storage</span> : ${phone.mainFeatures.storage}</li>
                                <li><span>displaySize</span> : ${phone.mainFeatures.displaySize}</li>
                                <li><span>memory</span> : ${phone.mainFeatures.chipSet}</li>
                                <li><span>chipSet</span> : ${phone.mainFeatures.memory}</li>
                                <li><span>sensors</span> : ${phone.mainFeatures.sensors.join(" | ")}</li>
                                <h3 class="details-title">Other:</h3>
                                <li><span>WLAN</span> : ${phone.others.WLAN}</li>
                                <li><span>Bluetooth</span> : ${phone.others.Bluetooth}</li>
                                <li><span>GPS</span> : ${phone.others.GPS}</li>
                                <li><span>NFC</span> : ${phone.others.NFC}</li>
                                <li><span>Radio</span> : ${phone.others.Radio}</li>
                                <li><span>USB</span> :  ${phone.others.USB}</li>
                            </ul>
                        </div>
                    </div>
                </div>
    `
// if want to hide loading
    loading('none');

}
//Details display product on button
const displaySearchResult = (result,searchInputData) =>{
    let phonesResults = result.data;
//Execution for data found 
    if(phonesResults.length>0){
searchResult("You Search For : ",searchInputData);
if(phonesResults.length>20){
//More products 
            loadMoreProducts = [...phonesResults.splice(20)];
            loadMoreBtnDisplay('inline-block')
            let allPhones = "";
            //loop use
            for(let i=0; i<phonesResults.length; i++){
                allPhones = `${allPhones}
                <div class="col-lg-3 col-md-6 col-12">
                    <div class="single-product">
                        <div class="product-img">
                            <span>${phonesResults[i].brand}</span>
                            <img src="${phonesResults[i].image}" alt="">
                        </div>
                        <h2>${phonesResults[i].phone_name}</h2>
                        <button onclick="loadProductDetails('${phonesResults[i].slug}')" id="details" class="btn btn-danger">Details</button>
                    </div>
                </div>
                `;
            }
            displayResultSelector.innerHTML = allPhones;

            loading('none');
        }else{
            loadMoreProducts = [];
            loadMoreBtnDisplay('none')

            let allPhones = "";
            //loop on- less than 20 items 
            for(let i=0; i<phonesResults.length; i++){
                
                allPhones = `${allPhones}
                <div class="col-lg-3 col-md-6 col-12">
                    <div class="single-product">
                        <div class="product-img">
                            <span>${phonesResults[i].brand}</span>
                            <img src="${phonesResults[i].image}" alt="">
                        </div>
                        <h2>${phonesResults[i].phone_name}</h2>
                        <button onclick="loadProductDetails('${phonesResults[i].slug}')" id="details" class="btn btn-danger">Details</button>
                    </div>
                </div>
                `;
            }
            displayResultSelector.innerHTML = allPhones;
            // Loading Spinner for none 
            loading('none');
        }
        }else{
        //Text show with no data found!
        searchResult('No Product Found For Your Search : ',searchInputData);
        // If there's no product found,hide the load more button!
        loadMoreBtnDisplay('none')
        //Search result not found then spinner hide
        loading('none');   
    }
    
}
const loadMoreProductsShow = ()=>{

    //Product slice 20 for showing next 20 loading product only!
    loadMoreProductSplice = loadMoreProducts.splice(0,20);

    if(loadMoreProductSplice.length>0){
        
        let allLoadMoreProducts = "";
        //looping load more product items
        for(let i=0; i<loadMoreProductSplice.length; i++){
            allLoadMoreProducts = `${allLoadMoreProducts}
            <div class="col-lg-3 col-md-6 col-12">
                <div class="single-product">
                    <div class="product-img">
                        <span>${loadMoreProductSplice[i].brand}</span>
                        <img src="${loadMoreProductSplice[i].image}" alt="">
                    </div>
                    <h2>${loadMoreProductSplice[i].phone_name}</h2>
                    <button onclick="loadProductDetails('${loadMoreProductSplice[i].slug}')" id="details" class="btn btn-danger">Details</button>
                </div>
            </div>
            `;
        }
    //Adding with last 20 products!
        displayResultSelector.innerHTML = `${displayResultSelector.innerHTML} ${allLoadMoreProducts}`;

        //If the products load fully,load more button hide!
        if(loadMoreProducts.length===0){
            loadMoreBtnDisplay('none');
        }    
    }

}
searchBtn.addEventListener('click',searchProduct);
loadMoreBtn.addEventListener('click',loadMoreProductsShow)


