

const exercise1 = document.querySelector('#exercisename_1 img')

async function exercise1addEventListener() {
    exercise1.addEventListener('click', async (event) => {
        console.log('clickedNav = ', clickedHambueger);
        if (clickedHambueger) {return}
        event.preventDefault()
        await Swal.fire({
            title: 'Push Up',
            html:
                `<video width="320" height="240" controls src="./assets/exercises/videos/push-up-1.mp4"></video>`,
            showCloseButton: true,

            confirmButtonText: 'Just Do!',
        })
    })
}


const exercise2 = document.querySelector('#exercisename_2 img')

async function exercise2addEventListener() {
    exercise2.addEventListener('click', async (event) => {
        console.log('clickedNav = ', clickedHambueger);
        if (clickedHambueger) {return}
        event.preventDefault()
        await Swal.fire({
            title: 'Plank',
            html:
                `<video width="320" height="240" controls src="./assets/exercises/videos/plank.mp4"></video>`,
            showCloseButton: true,
            showCloseButton: true,
            confirmButtonText: 'Just Do!',
        })
    })
}

function init() {
    exercise1addEventListener()
    exercise2addEventListener()
}



init()