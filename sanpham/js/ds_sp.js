// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, onValue, child, query, orderByChild, equalTo} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";

let requestURL = '../../data/firebase-config.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

const params = new URLSearchParams(window.location.search)
var type =Object.fromEntries(params.entries()).type
console.log(type)
var tiltleDes
console.log(type)

switch (type) {
    case "NguyenLieu" : {
        type = "Nguyên liệu"
        tiltleDes =" Đây là NguyenLie"
        break;
    }
    case "DungCu" : {
        type = "Dụng cụ"
        tiltleDes =" Đây là NguyenLie"
        break;
    }
    case "Combo" : {
        type = "Combo"
        tiltleDes =" Đây là NguyenLie"
        break;
    }
    case undefined: {
        type = "Sản phẩm"
        tiltleDes =" Đây là Sản Phẩm"
        break;
    }
}
console.log(type)
request.onload = function() {
    const data = request.response;
    const app = initializeApp(data)
    const database = getDatabase(app);

    //? bind document
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    $('#titleName').innerHTML = type;
    $('#titleDescription').innerHTML = tiltleDes;
    var myRef;
    if (type === "Sản phẩm") {
        var myRef = ref(database, 'NguyenLieu');
    } else {
        var myRef = query(ref(database, 'NguyenLieu') , orderByChild('productType'), equalTo(type));
    }
 
    onValue(myRef, (snapshot) => {
        
        const productList =[]
        let i=0;
        
        //láy dữ liệu về từ firebase
        try {
            snapshot.forEach(function(child){
                productList.push(child.val())
                i++;
                if (i>7) throw 'break';  //forEach không hỗ trợ break nên dùng throw exception để break
        })
        }
        catch{
            //
        }
        
        // đựa dữ liệu vào thẻ html
        let htmls = productList.map(product => {
            return `
            <div class="col l-3 m-6 c-12 mg-t mg-r mg-l mg-b">
                <a href="./san-pham.html?id=${product.productID}" class="product-container">
                    <div class="product-img">
                        <img src="${product.productImg}" alt="">
                    </div>
                    <div class="product-name">
                        <p>${product.productName}</p>
                    </div>
                    <div class="product-price">
                            <p>${product.productPrice}đ</p>
                    </div>
                </a>
            </div>`
        })
        $('.product').innerHTML = htmls.join('');
    });
}
   
