const menu = document.querySelector("#hamburger")
const loginStatus = getStatus

window.onload = async () => {
    
    let elem,
        toggleBtn,
        elemH,
        elemW;

    await menuLoader()
    await refresh()

    let open = false;
let scale, offsetX, offsetY;

const calculateValues = (() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const offsetValue = Number(getComputedStyle(elem).getPropertyValue('--offset-value'));

    //  Offsets to center the circle
    offsetX = (w / 2) - (elemW / 2) - offsetValue - 10;
    offsetY = (h / 2) - (elemH / 2) - offsetValue - 10;

    // Good old pythagoras
    const radius = Math.sqrt((h ** 2) + (w ** 2));
    scale = radius / (elemW / 2) / 2 + .1; // Add '.1' to compensate for Safari sub pixel blur issue
    return scale;
})


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
    calculateValues();


    window.addEventListener("resize", resizeHandler, false);

    menu.addEventListener('click',(event)=>{
        if (event.target == document.querySelector('#toggle-btn')){
            toggleMenu()
        }
    })

    async function refresh(){
        elem = document.querySelector('#nav-bg'),
        toggleBtn = document.querySelector('#toggle-btn'),
        elemH = elem.getBoundingClientRect().height,
        elemW = elem.getBoundingClientRect().width;
    }
}

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
                        <li><a class="nav link" href="#0">Projects</a></li>
                        <li><a class="nav link" href="#0">About</a></li>
                        <li><a class="nav link" href="#0">Contact</a></li>
                    </ul>
                    <div class="other_container">
                        <a href="*"><div class="icon_container">
                            <span class="material-symbols-outlined">account_circle</span>
                            <p>Profile</p>
                        </div></a>
                        <a href="/users/logout"><div class="icon_container">
                            <span class="material-symbols-outlined">logout</span>
                            <p>Logout</p>
                        </div></a>
                        <a href="*"><div class="icon_container">
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
                        <li><a class="nav link" href="#0">Projects</a></li>
                        <li><a class="nav link" href="#0">About</a></li>
                        <li><a class="nav link" href="#0">Contact</a></li>
                    </ul>
                    <div class="other_container">
                        <a href="/login.html"><div class="icon_container">
                            <span class="material-symbols-outlined">account_circle</span>
                            <p>Login/Signup</p>
                        </div></a>
                    </div>
                </nav>
            </div>
        `
    }
}