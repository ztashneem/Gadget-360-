//SELECT ALL ELEMENT BY DOM
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

