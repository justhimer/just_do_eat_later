const foodboad1 = document.querySelector('#foodname_1')
const foodboad2 = document.querySelector('#foodname_2')


// async function foodboad1addEventListener() {
//     foodboad1.addEventListener('click', async (event) => {
//         event.preventDefault()
//         await Swal.fire({
//             title: 'Meatballs-with-Spanakopita-Rice(Regular)',
//             text: 'Protein:41.62g,Energy:2238.4KJ,Calories:536.3cal,Fat Total:17.47g,Saturated Fat:5.79g,Carbohydrate:48.88g,Sugar:2.74g,Sodium:256.2mg,Fiber:2.7g',
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
//                     text: 'Protein:59.71g,Energy:2983.2KJ,Calories:714.6cal,Fat Total:23.66g,Saturated Fat:8.19g,Carbohydrate:60.04g,Sugar:2.99g,Sodium:343.68mg,Fiber:3.24g',
//                     showCloseButton: true,
//                     confirmButtonText: 'Add to cart',
//                 })
//             }
//         })
//     })

// }

async function main() {
    let res = await fetch('shop/allFood')
    let data = await res.json()
    console.log(data)
}
main()


let foods = [

    {
        name: 'ASIAN CHICKEN STIR FRY & HOKKIEN NOODLES',
        meta: {
            allergens: ['Gluten, Wheat, Sesame,Soy'],
            description: "A delectable classic with Asian Chicken Stir Fry & Hokkien Noodles!",
            image: "AsianChickenStirFryWorkoutMeals_1120x.jpg",
            ingredients: ['Water, Higher Welfare Chicken (18%), Hokkien Noodl…rn Starch, White Sesame Seeds, Salt, Black Pepper'],
            name: "ASIAN CHICKEN STIR FRY & HOKKIEN NOODLES",
            preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
            type: "ASIAN CHICKEN STIR FRY & HOKKIEN NOODLES",
            type_id: 22
        },
        portion: {
            regular: {
                name: 'regular',
                calories: 240,
                food_id: 22
            }
        }

    }
]


let dummyFood = {
    title: 'BEEF-MEX-LOADED(Regular)',
    description: 'Protein:32.44g,Energy:1692.98KJ,Calories:406.75cal,Fat Total:15.04g,Saturated Fat:6.85g,Carbohydrate:35.58g,Sugar:8.15g,Sodium:210.45mg,Fiber:4.95g',
    imgURL: '/BEEF-MEX-LOADED-_-SWEET-POTATO_1120x.jpeg'
}

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


function init() {
    // foodboad1addEventListener()
    // foodboad2addEventListener()
}

init()

////////////////////////////////

async function getFoodDetails(id) {
    const res = await fetch(`/food/${id}`);
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
    const foodElems = document.querySelectorAll(".card");

    for (let foodElem of foodElems) {
        foodElem.addEventListener("click", showFoodDetails);
    }

    async function showFoodDetails(event) {
        event.preventDefault()
        const id = event.currentTarget.id.split("-")[1];
        const food = await getFoodDetails(id);
        const fooodName = food.name.toUpperCase();
        const query = food.name.split(" ").join("_");
        await Swal.fire({
            title: `${fooodName}`,
            text: 'Protein:41.62g,Energy:2238.4KJ,Calories:536.3cal,Fat Total:17.47g,Saturated Fat:5.79g,Carbohydrate:48.88g,Sugar:2.74g,Sodium:256.2mg,Fiber:2.7g',
            imageUrl: '/Meatballs-with-Spanakopita-Rice_1120x.jpeg',
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: 'Meatballs-with-Spanakopita-Rice',
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
                    text: 'Protein:59.71g,Energy:2983.2KJ,Calories:714.6cal,Fat Total:23.66g,Saturated Fat:8.19g,Carbohydrate:60.04g,Sugar:2.99g,Sodium:343.68mg,Fiber:3.24g',
                    showCloseButton: true,
                    confirmButtonText: 'Add to cart',
                })
            }
        })


    }
}