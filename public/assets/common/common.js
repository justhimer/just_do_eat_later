const menu = document.querySelector("#hamburger")
const loginStatus = getStatus


async function main() {
    //init important variables
    /* #region session */
    let elem,
        toggleBtn,
        elemH,
        elemW,
        open = false,
        scale,
        offsetX,
        offsetY;
    /* #endregion */

    //inject menu into html & re-init variables to document.queryselector
    /* #region session */
    await menuLoader()
    await refresh()

    /* #endregion */

    //core math logic for animation
    /* #region session */
    const calculateValues = (() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const offsetValue = Number(getComputedStyle(elem).getPropertyValue('--offset-value'));

        //  Offsets to center the circle
        offsetX = (w / 2) - (elemW / 2) - offsetValue;
        offsetY = (h / 2) - (elemH / 2) - offsetValue;

        // Good old pythagoras
        const radius = Math.sqrt((h ** 2) + (w ** 2));
        scale = radius / (elemW / 2) / 2 + .1; // Add '.1' to compensate for Safari sub pixel blur issue
        return scale;
    })
    /* #endregion */

    //logic controlling animation
    /* #region session */
    const openMenu = () => {
        elem.style.setProperty("--translate-x", `${offsetX}px`);
        elem.style.setProperty("--translate-y", `-${offsetY}px`);
        elem.style.setProperty("--scale", scale);
        elem.style.setProperty("background-color", "#3B3836");
    }
    const closeMenu = () => {
        elem.style.setProperty("--scale", 1);
        elem.style.setProperty("--translate-x", 0);
        elem.style.setProperty("--translate-y", 0);
        setTimeout(() => { elem.style["background-color"] = null; }, 300)

    }
    const animateMenu = () => {
        open ? openMenu() : closeMenu();
    };

    const toggleMenu = () => {
        open = !open;
        animateMenu();
        toggleBtn.classList.toggle('shown');

    }

    const resizeHandler = () => {
        window.requestAnimationFrame(() => {
            calculateValues();
            animateMenu();
        });
    }
    /* #endregion */

    calculateValues(); // don't move

    //control click and resize events
    /* #region session */
    window.addEventListener("resize", resizeHandler, false);
    menu.addEventListener('click', (event) => {
        if (event.target == document.querySelector('#toggle-btn')) {
            toggleMenu()
            document.querySelector('.nav_ul').classList.toggle('shown')
        }
    })

    document.querySelectorAll(".icon_container").forEach(element => {
        element.addEventListener("mouseover", async (event) => {
            if (!event.target.classList.contains('pulse')) {
                await event.target.classList.add('pulse')
                setTimeout(async () => {
                    await event.target.classList.remove('pulse')
                }, 749)
            }
        })
    });

    /* #endregion */


    async function refresh() { // don't move outside onload, re-init variables
        elem = document.querySelector('#nav-bg'),
            toggleBtn = document.querySelector('#toggle-btn'),
            elemH = elem.getBoundingClientRect().height,
            elemW = elem.getBoundingClientRect().width;
    }

}

main()

async function getStatus() {
    const res = await fetch('/users/loginStatus')
    if (res.ok) {
        console.log("logged in")
        return true
    } else {
        return false
    }
}

async function menuLoader() {
    const status = await loginStatus()
    console.log(status)
    menu.innerHTML = `
    <div id="nav-bg" class="btn"></div>
    <div id="toggle-btn" class="btn">
        <span></span>
        <span></span>
        <span></span>
    </div>
    `
    if (status) {
        menu.innerHTML += `
        <div class="wrapper">
                <nav class="nav_container">
                    <ul class="nav_ul">
                        <li><a class="nav link" href="/">Home</a></li>
                        <li><a class="nav link" href="/exercise.html">Just Do</a></li>
                        <li><a class="nav link" href="/food-celection.html">Eat Later</a></li>
                    </ul>
                    <div class="other_container">
                        <a href="/profile.html"><div class="icon_container circle">
                            <span class="material-symbols-outlined">account_circle</span>
                            <p>Profile</p>
                        </div></a>
                        <a href="/users/logout"><div class="icon_container circle">
                            <span class="material-symbols-outlined">logout</span>
                            <p>Logout</p>
                        </div></a>
                        <a href="*"><div class="icon_container circle">
                            <span class="material-symbols-outlined">shopping_cart</span>
                            <p>Cart</p>
                        </div></a>
                    </div>
                </nav>
            </div>
        `
    } else {
        menu.innerHTML += `
        <div class="wrapper">
                <nav class="nav_container">
                    <ul class="nav_ul">
                        <li><a class="nav link" href="/">Home</a></li>
                        <li><a class="nav link" href="/exercise.html">Just Do</a></li>
                        <li><a class="nav link" href="/food-celection.html">Eat Later</a></li>
                    </ul>
                    <div class="other_container">
                        <a href="/login.html"><div class="icon_container circle">
                            <span class="material-symbols-outlined">account_circle</span>
                            <p>Login/Signup</p>
                        </div></a>
                    </div>
                </nav>
            </div>
        `
    }
}



