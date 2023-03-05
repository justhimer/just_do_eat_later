const foodlist = document.querySelector("#food-list");
let foodElems = document.querySelectorAll(".card");
let foods;

// async function foodElemsaddEventListener() {
//     foodElems.addEventListener('click', async (event) => {
//         await Swal.fire({
//             title: 'Meatballs-with-Spanakopita-Rice(Regular)',
//             imageUrl: '/Meatballs-with-Spanakopita-Rice_1120x.jpeg',
//             imageWidth: 300,
//             imageHeight: 300,
//             imageAlt: 'Meatballs-with-Spanakopita-Rice',
//             showCloseButton: true,
//             confirmButtonText: 'Large',
//             showDenyButton: true,
//             denyButtonText: `Add to cart`,
//             denyButtonColor: '#3085d6',
//         }).then((result) => {
//             console.log({ result })
//             if (result.isConfirmed) {
//                 console.log({ result })

//                 Swal.fire({
//                     title: 'Large',
//                     showCloseButton: true,
//                     confirmButtonText: 'Add to cart',
//                 })
//             }
//         })
//     })

// }



// let foods = [

//     {
//         name: 'ASIAN CHICKEN STIR FRY & HOKKIEN NOODLES',
//         meta: {
//             allergens: ['Gluten, Wheat, Sesame,Soy'],
//             description: "A delectable classic with Asian Chicken Stir Fry & Hokkien Noodles!",
//             image: "AsianChickenStirFryWorkoutMeals_1120x.jpg",
//             ingredients: ['Water, Higher Welfare Chicken (18%), Hokkien Noodl…rn Starch, White Sesame Seeds, Salt, Black Pepper'],
//             name: "ASIAN CHICKEN STIR FRY & HOKKIEN NOODLES",
//             preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
//             type: "ASIAN CHICKEN STIR FRY & HOKKIEN NOODLES",
//             type_id: 22
//         },
//         portion: {
//             regular: {
//                 name: 'regular',
//                 calories: 240,
//                 food_id: 22
//             }
//         }

//     }
// ]


// let dummyFood = {
//     title: 'BEEF-MEX-LOADED(Regular)',
//     description: 'Protein:32.44g,Energy:1692.98KJ,Calories:406.75cal,Fat Total:15.04g,Saturated Fat:6.85g,Carbohydrate:35.58g,Sugar:8.15g,Sodium:210.45mg,Fiber:4.95g',
//     imgURL: '/BEEF-MEX-LOADED-_-SWEET-POTATO_1120x.jpeg'
// }

// async function foodboad2addEventListener() {
//     foodboad2.addEventListener('click', async (event) => {
//         event.preventDefault()
//         await Swal.fire({
//             title: dummyFood.title,
//             text: dummyFood.description,
//             imageUrl: dummyFood.imgURL,
//             imageWidth: 300,
//             imageHeight: 300,
//             imageAlt: dummyFood.title,
//             showCloseButton: true,
//             confirmButtonText: 'Large',
//             showDenyButton: true,
//             denyButtonText: `Add to cart`,
//             denyButtonColor: '#3085d6',
//         }).then(async (result) => {
//             // isDenied = 'add to cart'
//             // isConfirmed = 'large'
//             const { isConfirmed, isDenied } = result
//             if (isDenied) {
//                 let res = await fetch('/cart', {
//                     method: 'POST',
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify(dummyFood)
//                 })
//                 if (res.ok) {
//                     // let data = await res.json()
//                     // console.log('data = ', data)
//                     console.log('ok');
//                 }
//                 if (!res.ok) {
//                     alert('not success')
//                 }
//             }
//             if (isConfirmed) {
//                 Swal.fire({
//                     title: 'Large',
//                     text: 'Protein:49.4g,Energy:2369.78KJ,Calories:570cal,Fat Total:22.71g,Saturated Fat:10.07g,Carbohydrate:42.03g,Sugar:9.94g,Sodium:264.7mg,Fiber:5.7g,',
//                     showCloseButton: true,
//                     confirmButtonText: 'Add to cart',
//                 })
//             }
//         })
//     })

// }




////////////////////////////////

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

function activateClickOnFood() {

    console.log(foodElems);
    for (let foodElem of foodElems) {
        foodElem.addEventListener("click", showFoodDetails);
    }

    async function showFoodDetails(event) {
        const id = parseInt(event.currentTarget.id.split("-")[1]);
        console.log('id = ', id);
        console.log("test");
        const name = foods[id].name;
        console.log(name);
        if (!foods[id].portion.Large) {
            await Swal.fire({
                title: `${name}`,
                imageUrl: `/food_uploads/${foods[id].meta.image}`,
                imageWidth: 300,
                imageHeight: 300,
                showCloseButton: true,
                showDenyButton: true,
                showConfirmButton: false,
                denyButtonText: `Add to cart`,
                denyButtonColor: '#3085d6',
            })
        } else {
            await Swal.fire({
                title: `${name}`,
                imageUrl: `/food_uploads/${foods[id].meta.image}`,
                imageWidth: 300,
                imageHeight: 300,
                showCloseButton: true,
                confirmButtonText: 'Large',
                showDenyButton: true,
                denyButtonText: `Add to cart`,
                denyButtonColor: '#3085d6',
            }).then((result) => {
                console.log({ result })
                if (result.isConfirmed) {
                    console.log({ result })

                    Swal.fire({
                        title: 'Large',
                        showCloseButton: true,
                        confirmButtonText: 'Add to cart',
                    })
                }
            })
        }

    }
}

function init() {
    // query selectors
    loadFood();

    async function loadFood() {
        const res = await fetch("/shop/allFood");
        const result = await res.json();
        foods = result.data;
        console.log("foods: ", foods)
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
                <div class="value">${foods[i].portion}</div>
                <div class="type">Calories</div>
                </div>
                <div class="stat left-border">
                <div class="type">per</div>
                <div class="value">serving</div>
                </div>
            </div>
        </div>
        `;
                foodlist.innerHTML += htmlString;
            }
            // prepare html
            foodElems = document.querySelectorAll(".card");




        }

    }

}
init();