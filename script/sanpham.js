// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, onValue, child, get, query, orderByChild, equalTo} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(config);
const database = getDatabase(app);

const params = new URLSearchParams(window.location.search)
const sanphamID =Object.fromEntries(params.entries()).id
var id = parseInt(sanphamID);

//? bind document
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
var sanpham;
var productRef = query(ref(database, 'NguyenLieu'), orderByChild('productID') , equalTo(id) );
console.log(sanphamID)
onValue(productRef, (snapshot)=> {
    console.log(productRef)
    var sanpham = Object.values( snapshot.val() )[0];
    
    $('.sanpham-info').innerHTML = `
            <div class="row">
            <div class="col l-6 m-6 c-12">
                <img src="${sanpham.productImg}" alt="">
            </div>
            <div class="col l-6 m-6 c-12 sanpham-des">
                <p id="sanpham-name">${sanpham.productName}</p>
                <p id="sanpham-type">${sanpham.productType}</p>
                <p id="sanpham-price">${sanpham.productPrice}</p>
                <p>${sanpham.productDetail}</p>
                <form action="" method="post" class="sanpham-form">
                    <div class="btn-decrease btn-amount decreasable">-</div>
                    <div id="sanpham-amount">1</div>
                    <div class="btn-increase btn-amount">+</div>
                </form>
                <button class="btn">Đặt hàng</button>
            </div>
        </div>
    `
})
