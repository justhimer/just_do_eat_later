const foodboad1 = document.querySelector('#foodname_1')

async function foodboad1addEventListener() {
    foodboad1.addEventListener('click', async (event) => {
        event.preventDefault()
        await Swal.fire({
            title: 'Meatballs-with-Spanakopita-Rice(Regular)',
            text: 'Protein:41.62g,Energy:2238.4KJ,Calories:536.3cal,Fat Total:17.47g,Saturated Fat:5.79g,Carbohydrate:48.88g,Sugar:2.74g,Sodium:256.2mg,Fiber:2.7g',
            imageUrl: '../Upload/food_uploads/Meatballs-with-Spanakopita-Rice_1120x.webp',
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: 'Meatballs-with-Spanakopita-Rice',
            showCloseButton: true,
            confirmButtonText: 'Large',
            showDenyButton: true,
            denyButtonText: `Add to cart`,
            denyButtonColor: '#3085d6',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Large',
                    text: 'Protein:59.71g,Energy:2983.2KJ,Calories:714.6cal,Fat Total:23.66g,Saturated Fat:8.19g,Carbohydrate:60.04g,Sugar:2.99g,Sodium:343.68mg,Fiber:3.24g',
                    showCloseButton: true,
                    confirmButtonText: 'Add to cart',
                })
            }
        })
    })

}



const foodboad2 = document.querySelector('#foodname_2')

async function foodboad2addEventListener() {
    foodboad2.addEventListener('click', async (event) => {
        event.preventDefault()
        await Swal.fire({
            title: 'BEEF-MEX-LOADED(Regular)',
            text: 'Protein:32.44g,Energy:1692.98KJ,Calories:406.75cal,Fat Total:15.04g,Saturated Fat:6.85g,Carbohydrate:35.58g,Sugar:8.15g,Sodium:210.45mg,Fiber:4.95g',
            imageUrl: '../Upload/food_uploads/BEEF-MEX-LOADED-_-SWEET-POTATO_1120x.webp',
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: 'BEEF-MEX-LOADED',
            showCloseButton: true,
            confirmButtonText: 'Large',
            showDenyButton: true,
            denyButtonText: `Add to cart`,
            denyButtonColor: '#3085d6',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Large',
                    text: 'Protein:49.4g,Energy:2369.78KJ,Calories:570cal,Fat Total:22.71g,Saturated Fat:10.07g,Carbohydrate:42.03g,Sugar:9.94g,Sodium:264.7mg,Fiber:5.7g,',
                    showCloseButton: true,
                    confirmButtonText: 'Add to cart',
                })
            }
        })
    })

}




function init() {
    foodboad1addEventListener()
    foodboad2addEventListener()
}

init()