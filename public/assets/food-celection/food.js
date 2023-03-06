
const foodlist = document.querySelector("#food-list");
let foodElems = document.querySelectorAll(".card");
let foods;

async function getStatus() {
    const res = await fetch("/users/loginStatus");
    if (res.ok) {
        return true;
    } else {
        return false;
    }
}

async function getFoodDetails(id) {
    const res = await fetch(`/shop/allFood`);
    const result = await res.json();
    return result.data;
}

function activateTilt() {
    VanillaTilt.init(document.querySelectorAll(".card"), {
        glare: true,
        reverse: true,
        "max-glare": 0.5,
    });
}

function init() {
    // query selectors
    loadFood();

    const cornerElem = document.querySelector(".corner-box");
    cornerElem.addEventListener("click", showCalories);

    async function loadFood() {
        const res = await fetch("/shop/allFood");
        const result = await res.json();
        foods = result.data;
        // refresh exercise-list
        showfoodPreview(foods);


        activateTilt();
        activateClickOnFood();

        function showfoodPreview(foods) {
            // clear the list 
            foodlist.innerHTML = "";

            if (foods.length == 0) {
                foodlist.innerHTML = `<div class="not-found"> - No Results - </div>`;
                return
            }
            for (let i = 0; i < foods.length; i++) {
                let htmlString = `
        <div class="card" id="food-${i}">
            <div class="card-image card1"
            style="
                background: url('/food_uploads/${foods[i].meta.image}');
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;">
            </div>
            <div class="card-text card1">
                <h2>${foods[i].name}</h2>
                <p>${foods[i].meta.description}</p>
            </div>
            <div class="card-stats card1">
                <div class="stat right-border">
                <div class="value">Allergens</div>
                <div class="type">${foods[i].meta.allergens}</div>
                </div>
                <div class="stat left-border">
                    <div class="type">Click</div>
                    <div class="value">HERE</div>
                </div>
            </div>
        </div>
        `;
                foodlist.innerHTML += htmlString;
            }
            // prepare html
            foodElems = document.querySelectorAll(".card");




        }

        function activateClickOnFood() {

            console.log(foodElems);
            for (let foodElem of foodElems) {
                foodElem.addEventListener("click", showFoodDetails);
            }

            function addfood() {
                const addfoodBtn = document.querySelector('.addtocart')

                addfoodBtn.addEventListener('click', async (event) => {
                    const id = parseInt(event.currentTarget.id.split('-')[1]);
                    console.log('id = ', id);
                    console.log('test')

                    let res = await fetch('/shop/addFood', {
                        method: "post",
                        body: JSON.stringify({
                            food_details_id: id,
                            quantity: 1
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    let result = await res.json()
                    if (res.ok) {
                        window.location.href = "/"
                    } else {
                        alert(result.message)
                    }

                    function addToCart() {


                        let cart = JSON.parse(localStorage.getItem('cart')) || [];
                        let existingfood = cart.find(item => item.id === foods[id]);
                        if (existingfood) {
                            existingfood.quantity += 1;
                        } else {

                            cart.push({
                                id: foods[id],
                                name: foods[id].meta.name,
                                calories: foods[id].portion.calories,
                                quantity: 1,
                            });
                        }

                        localStorage.setItem('cart', JSON.stringify(cart));
                        alert("商品已添加到購物車！");

                    }
                    addToCart();
                })
            }



            async function showFoodDetails(event) {
                const id = parseInt(event.currentTarget.id.split("-")[1]);
                const name = foods[id].name;
                if (!foods[id].portion.Large) {
                    await Swal.fire({
                        title: `<h3 style="color: #ffaa33; font-family: 'Encode Sans Condensed', sans-serif;">${name}</h3>`,
                        html: `<image width="300" height="300" src="/food_uploads/${foods[id].meta.image}"></image>
                        <button  class="addtocart" id="addtocart-${id}" value="addtocart">Add to cart</button>
                        `,
                        background: "#3b3836",
                        confirmButtonColor: "#ffaa33",
                    }).then(addfood())
                } else {
                    await Swal.fire({
                        title: `<h3 style="color: #ffaa33; font-family: 'Encode Sans Condensed', sans-serif;">${name}</h3>`,
                        html: `<image width="300" height="300" src="/food_uploads/${foods[id].meta.image}"></image>
                        <button class="addtocart" id="addtocart-${id}" value="addtocart">Add to cart</button>
                        `,


                        confirmButtonText: `<div style="color: #3b3836; font-family: sans-serif; font-weight: bold;">Large</div>`,
                        background: "#3b3836",
                        confirmButtonColor: "#ffaa33",
                    }).then((result) => {
                        console.log({ result })
                        if (result.isConfirmed) {
                            console.log({ result })

                            Swal.fire({
                                title: `<h3 style="color: #ffaa33; font-family: 'Encode Sans Condensed', sans-serif;">${name}</h3>`,
                                showCloseButton: true,
                                confirmButtonText: 'Add to cart',
                                confirmButtonColor: "#ffaa33",

                            }).then(addfood())
                        }
                    }).then(addfood())
                }
            }
        }

    }




    async function showCalories() {
        const isLoggedIn = await getStatus();
        if (isLoggedIn) {
            const res = await fetch("/users/calories");
            const result = await res.json();
            const calories = result.calories;
            Notiflix.Notify.info(`Remaining ${calories} calories`, {
                width: "18rem",
                fontSize: "1rem",
                clickToClose: true,
                info: {
                    background: "#615c59",
                    textColor: "#cfc1ac",
                    notiflixIconColor: "#cfc1ac",
                },
            });
        } else {
            Notiflix.Notify.warning("Please Login", {
                width: "15rem",
                fontSize: "1rem",
                clickToClose: true,
                warning: {
                    background: "#615c59",
                    textColor: "#cfc1ac",
                    notiflixIconColor: "#cfc1ac",
                },
            });
        }
    }

}
init();
///////////////////////////// 

