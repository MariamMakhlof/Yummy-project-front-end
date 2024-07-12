let row = document.getElementById('myRow');
let box = document.getElementById('searchBox');
let btn;

$(document).ready(() => {
    searchByName("").then(() => {
        $('.loading-screen').fadeOut(500);
        $('body').css('overflow', 'visible');
        $('.inner-loading').fadeOut(500);
    })
})

function closeNav() {
    let leftSize = $('.side-nav .nav-tab').outerWidth();
    $('.side-nav').animate({ left: -leftSize }, 500);
    $('.openBar').removeClass('fa-x');
    $('.openBar').addClass('fa-align-justify');
    $('.nav-links li').animate({ top: 300 }, 500);
}

function openNav() {
    $('.side-nav').animate({ left: 0 }, 500);
    $('.openBar').removeClass('fa-align-justify');
    $('.openBar').addClass('fa-x');

    for (let i = 0; i < 5; i++) {
        $('.nav-links li').eq(i).animate({ top: 0 }, (i + 5) * 100);
    }
}
closeNav();
$('.side-nav i.openBar').click(() => {
    if ($('.side-nav').css('left') == '0px') {
        closeNav();
    }
    else {
        openNav();
    }
})


function displayMeals(arr) {
    let cartona = '';
    for (let i = 0; i < arr.length; i++) {
        cartona += `<div class="col-lg-3 col-md-4 col-sm-6 py-4">
        <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img src="${arr[i].strMealThumb}" class="w-100">
            <div class="mealLayer d-flex align-items-center px-2 position-absolute">
                <h3>${arr[i].strMeal}</h3>
            </div>
        </div>
    </div>`
    }
    row.innerHTML = cartona;
}

async function categoriesMeal() {
    row.innerHTML = '';
    $('.inner-loading').fadeIn(300);
    box.innerHTML = '';
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    response = await response.json();
    // console.log(response.categories);
    displayCategories(response.categories);
    // $('.inner-loading').fadeIn(300);
    $('.inner-loading').fadeOut(300);
}

function displayCategories(arr) {
    let cartona = '';
    for (let i = 0; i < arr.length; i++) {
        cartona += `<div class="col-lg-3 col-md-4 col-sm-6 py-4">
        <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img src="${arr[i].strCategoryThumb}" class="w-100">
            <div class="mealLayer text-center px-2 position-absolute">
                <h3>${arr[i].strCategory}</h3>
                <p>${arr[i].strCategoryDescription.split(" ").slice(0, 15).join(" ")}</p>
            </div>
        </div>
    </div>`
    }
    row.innerHTML = cartona;
}

async function areaMeal() {
    row.innerHTML = '';
    $('.inner-loading').fadeIn(300);
    box.innerHTML = '';
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    response = await response.json();
    // console.log(response.meals);
    displayArea(response.meals);
    $('.inner-loading').fadeOut(300);
}

function displayArea(arr) {
    let cartona = '';
    for (let i = 0; i < arr.length; i++) {
        cartona += `<div class="col-lg-3 col-md-4 col-sm-6 py-4">
        <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 mx-auto text-center cursor-pointer">
            <i class="fa-solid fa-city text-danger fa-5x"></i>
                <h3 class="text-white">${arr[i].strArea}</h3>
        </div>
    </div>`
    }
    row.innerHTML = cartona;
}

async function ingrediantMeal() {
    row.innerHTML = '';
    $('.inner-loading').fadeIn(300);
    box.innerHTML = '';
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    response = await response.json();
    // console.log(response.meals);
    displayIng(response.meals.slice(0, 20));
    $('.inner-loading').fadeOut(300);
}

function displayIng(arr) {
    let cartona = '';
    for (let i = 0; i < arr.length; i++) {
        cartona += `<div class="col-lg-3 col-md-4 col-sm-6 py-4">
        <div onclick="getIngMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
        <i class="fa-solid fa-bowl-food fa-3x text-success"></i>
                <h3 class="text-white">${arr[i].strIngredient}</h3>
                <p>${arr[i].strDescription.split(" ").slice(0, 30).join(" ")}</p>
        </div>
    </div>`
    }
    row.innerHTML = cartona;
}

async function getCategoryMeals(category) {
    row.innerHTML = '';
    $('.inner-loading').fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    response = await response.json();
    console.log(response);
    displayMeals(response.meals.slice(0, 20));
    $('.inner-loading').fadeOut(300);
}


async function getAreaMeals(area) {
    row.innerHTML = '';
    $('.inner-loading').fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    response = await response.json();
    console.log(response);
    displayMeals(response.meals.slice(0, 20));
    $('.inner-loading').fadeOut(300);
}

async function getIngMeals(ing) {
    row.innerHTML = '';
    $('.inner-loading').fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`);
    response = await response.json();
    // console.log(response.meals);
    displayMeals(response.meals);
    $('.inner-loading').fadeOut(300);
}

async function getMealDetails(id) {
    row.innerHTML = '';
    $('.inner-loading').fadeIn(300);
    box.innerHTML = '';
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    response = await response.json();
    displayMealData(response.meals[0]);
    $('.inner-loading').fadeOut(300);
}

function displayMealData(meal) {
    closeNav();
    box.innerHTML = '';
    let ingrediant = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingrediant += `<li class="alert alert-info m-2 p-2">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
            // ingrediant.push(meal[`strIngredient${i}`])
        }
    }
    // console.log(ingrediant);

    let tags = meal.strTags?.split(',');
    if (!tags) tags = []

    let tagStr = '';
    for (let i = 0; i < tags.length; i++) {
        tagStr += ` <li class="alert alert-info m-2 p-2">${tags[i]}</li>`
    }
    let cartona = ` <div class="col-md-4">
    <img src="${meal.strMealThumb}" class="w-100 rounded-2">
    <h3 class="text-center mt-2"> ${meal.strMeal}</h3>
</div>
<div class="col-md-8">
    <h3>Instructions</h3>
    <p>${meal.strInstructions}</p>
    <h5><span class="fw-bold">Area:</span> ${meal.strArea}</h5>
    <h5><span class="fw-bold">Category:</span>  ${meal.strCategory}</h5>
    <h5>Recipes :</h5>
    <ul class="list-unstyled d-flex flex-wrap g-3">
    ${ingrediant}
    </ul>
    <h5 class="my-3">Tags :</h5>
    <ul class="list-unstyled d-flex flex-wrap g-3">
    ${tagStr}
    </ul>
    <div>
        <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>
</div>`;

    row.innerHTML = cartona;
}

function showSearchInput() {
    box.innerHTML = `
    <div class="container w-75">
        <div class="row py-4">
            <div class="col-md-6">
                <input onkeyup="searchByName(this.value)" placeholder="Search By Name" type="text" class="form-control text-center bg-transparent">
            </div>
            <div class="col-md-6">
                <input onkeyup="searchByLetter(this.value)" maxlength="1" placeholder="Search By First Letter" type="text" class="form-control text-center bg-transparent">
            </div>
            </div>
        </div>`

    row.innerHTML = ''
}

async function searchByName(mealName) {
    row.innerHTML = '';
    $('.inner-loading').fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    response = await response.json();
    response.meals ? displayMeals(response.meals) : displayMeals([]);
    $('.inner-loading').fadeOut(300);
}

async function searchByLetter(mealLetter) {
    row.innerHTML = '';
    $('.inner-loading').fadeIn(300);
    mealLetter == '' ? 'a' : '';
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${mealLetter}`);
    response = await response.json();
    response.meals ? displayMeals(response.meals) : displayMeals([]);
    $('.inner-loading').fadeOut(300);
}

function displayContact() {
    row.innerHTML = ` <div class="contact min-vh-100 d-flex align-items-center justify-content-center text-center">
    <div class="container w-75">
        <div class="row g-4">
            <h2 class="text-center">Contact Us</h2>
            <div class="col-md-6">
                <input id="nameIp" onkeyup="inputValidation()" type="text" class=" form-control  bg-transparent my-4 text-center" placeholder="Enter Your Name">
                <div class="alert alert-danger w-100 mt-2 d-none" id="nameAlert">
                    Special characters and numbers are not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailIp" onkeyup="inputValidation()" type="email" class="form-control bg-transparent my-4 text-center" placeholder="Enter Your Email">
                <div class="alert alert-danger w-100 mt-2 d-none" id="emailAlert">
                    Email not valid *example@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneIp" onkeyup="inputValidation()" type="text" class="form-control bg-transparent my-4 text-center" placeholder="Enter Your Phone">
                <div class="alert alert-danger w-100 mt-2 d-none" id="phoneAlert">
                    Phone is not valid
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageIp" onkeyup="inputValidation()" type="number" class="form-control bg-transparent my-4 text-center" placeholder="Enter Your Age">
                <div class="alert alert-danger w-100 mt-2 d-none" id="ageAlert">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input id="passwordIp" onkeyup="inputValidation()" type="password" class="form-control bg-transparent my-4 text-center" placeholder="Password">
                <div class="alert alert-danger w-100 mt-2 d-none" id="passwordAlert">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input id="repasswordIp" onkeyup="inputValidation()" type="password" class="form-control bg-transparent my-4 text-center" placeholder="Repassword">
                <div class="alert alert-danger w-100 mt-2 d-none" id="repasswordAlert">
                    Enter valid Repassword
                </div>
            </div>
        </div>
        <button disabled id="submitBtn" class="btn btn-outline-danger">Submit</button>
    </div>
</div>`
    btn = document.getElementById('submitBtn');
    document.getElementById('nameIp').addEventListener('focus', () => {
        nameTouched = true;
    })
    document.getElementById('emailIp').addEventListener('focus', () => {
        emailTouched = true;
    })
    document.getElementById('phoneIp').addEventListener('focus', () => {
        phoneTouched = true;
    })
    document.getElementById('ageIp').addEventListener('focus', () => {
        ageTouched = true;
    })
    document.getElementById('passwordIp').addEventListener('focus', () => {
        passwordTouched = true;
    })
    document.getElementById('repasswordIp').addEventListener('focus', () => {
        repasswordTouched = true;
    })
}

let nameTouched = false;
let emailTouched = false;
let ageTouched = false;
let phoneTouched = false;
let passwordTouched = false;
let repasswordTouched = false;

function inputValidation() {
    if (nameTouched) {
        if (nameValidation()) {
            document.getElementById('nameAlert').classList.replace('d-block', 'd-none');
            // document.getElementById('nameAlert').addEventListener('onkeyup',()=>{
            //     document.getElementById('nameAlert').classList.addClass('is-valid');
            // })

        }
        else {
            // document.getElementById('nameAlert').classList.addClass('is-invalid');
            document.getElementById('nameAlert').classList.replace('d-none', 'd-block');
        }
    }

    if (emailTouched) {
        if (emailValidation()) {
            document.getElementById('emailAlert').classList.replace('d-block', 'd-none')
        }
        else {
            document.getElementById('emailAlert').classList.replace('d-none', 'd-block')
        }
    }

    if (phoneTouched) {
        if (phoneValidation()) {
            document.getElementById('phoneAlert').classList.replace('d-block', 'd-none')
        }
        else {
            document.getElementById('phoneAlert').classList.replace('d-none', 'd-block')
        }
    }

    if (ageTouched) {
        if (ageValidation()) {
            document.getElementById('ageAlert').classList.replace('d-block', 'd-none')
        }
        else {
            document.getElementById('ageAlert').classList.replace('d-none', 'd-block')
        }
    }

    if (passwordTouched) {
        if (passwordValidation()) {
            document.getElementById('passwordAlert').classList.replace('d-block', 'd-none')
        }
        else {
            document.getElementById('passwordAlert').classList.replace('d-none', 'd-block')
        }
    }

    if (repasswordTouched) {
        if (rePasswordValidation()) {
            document.getElementById('repasswordAlert').classList.replace('d-block', 'd-none')
        }
        else {
            document.getElementById('repasswordAlert').classList.replace('d-none', 'd-block')
        }
    }

    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        rePasswordValidation()) {
        btn.removeAttribute('disabled')
    }
    else {
        btn.setAttribute('disabled', true)
    }
}

function nameValidation() {
    return /^[a-zA-Z ]+$/.test(document.getElementById('nameIp').value)
}

function emailValidation() {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        .test(document.getElementById('emailIp').value)
}

function phoneValidation() {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById('phoneIp').value)
}

function ageValidation() {
    return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById('ageIp').value)
}

function passwordValidation() {
    return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById('passwordIp').value)
}

function rePasswordValidation() {
    return document.getElementById('repasswordIp').value == document.getElementById('passwordIp').value
}