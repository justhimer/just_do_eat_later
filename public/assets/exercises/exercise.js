// import { Notify } from '../../../node_modules/notiflix/build/notiflix-notify-aio';
// import { Loading } from 'notiflix/build/notiflix-loading-aio';

async function getExDetails(id) {
  const res = await fetch(`/exercise/one/${id}`);
  const result = await res.json();
  return result.data;
}

async function getStatus() {
  const res = await fetch("/users/loginStatus");
  if (res.ok) {
    return true;
  } else {
    return false;
  }
}

function activateTilt() {
  VanillaTilt.init(document.querySelectorAll(".card"), {
    glare: true,
    reverse: true,
    "max-glare": 0.5,
  });
}

function pleaseLogin() {
  Swal.fire({
    title: `<h3 style="color: #ffaa33; font-family: 'Encode Sans Condensed', sans-serif;">Please Log In</h3>`,
    confirmButtonText: `<div style="color: #3b3836; font-family: sans-serif; font-weight: bold;">OK</div>`,
    confirmButtonColor: "#ffaa33",
    background: "#3b3836",
  });
}

function activateClickOnExs() {
  const exElems = document.querySelectorAll(".card");

  for (let exElem of exElems) {
    exElem.addEventListener("click", showVideo);
  }

  async function showVideo(event) {
    const id = event.currentTarget.id.split("-")[1];
    const ex = await getExDetails(id);
    const exName = ex.name.toUpperCase();
    const exID = ex.id;
    const video = ex.sample_video;
    const isLoggedIn = await getStatus();
    await Swal.fire({
      title: `<h3 style="color: #ffaa33; font-family: 'Encode Sans Condensed', sans-serif;">${exName}</h3>`,
      html: `<video width="468" height="320" src="/ex_uploads/videos/${video}" controls autoplay></video>`,
      showCloseButton: true,
      confirmButtonText: `<div style="color: #3b3836; font-family: sans-serif; font-weight: bold;">Just Do!</div>`,
      confirmButtonColor: "#ffaa33",
      background: "#3b3836",
    }).then((result) => {
      if (result.isConfirmed) {
        if (isLoggedIn) {
          window.location.href = `do.html?ex_id=${exID}`;
        } else {
          pleaseLogin();
        }
      }
    });
  }
}

function init() {
  // query selectors
  const exsList = document.querySelector("#exs-list");
  const cornerElem = document.querySelector(".corner-box");
  cornerElem.addEventListener("click", showCalories);

  function activateClickOnRadios() {
    const radioElems = document.querySelectorAll(".radio");
    for (let radioElem of radioElems) {
      radioElem.addEventListener("click", refreshCards);
    }
    async function refreshCards(event) {
      const radioID = event.currentTarget.id.replace("radio", "");
      if (radioID === "1") {
        await loadExs();
        return;
      }
      let intLv;
      if (radioID === "2") {
        intLv = "high";
      } else if (radioID === "3") {
        intLv = "mid";
      } else {
        intLv = "low";
      }
      await loadExs({ level: intLv });
    }
  }

  // requirements in objact type, can be undefined
  async function loadExs(extraRequirements) {
    // loading screen
    Notiflix.Loading.circle({
      svgColor: "black",
    });

    // prepare fetch string
    let fetchString = "/exercise/all";
    let queryAdded = 0;
    for (let key in extraRequirements) {
      if (extraRequirements[key]) {
        if (queryAdded === 0) {
          fetchString += "?";
        }
        if (queryAdded > 0) {
          fetchString += "&";
        }
        fetchString += `${key}=${extraRequirements[key]}`;
        queryAdded++;
      }
    }

    // fetching
    const res = await fetch(fetchString);
    const result = await res.json();
    const exercises = result.data;

    // refresh exercise-list
    await showExsPreview(exercises);

    Notiflix.Loading.remove();
    activateTilt();
    activateClickOnExs();
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

  async function showExsPreview(exercises) {
    // clear the list
    exsList.innerHTML = "";

    if (exercises.length === 0) {
      exsList.innerHTML = `<div class="not-found"> - No Results - </div>`;
    }

    // loop exercises
    for (let i = 0; i < exercises.length; i++) {
      const ex = exercises[i];
      const exID = ex.id;
      let cardNum;
      const exName = ex.name.toUpperCase();
      const lv = ex.level.charAt(0).toUpperCase() + ex.level.slice(1);
      if (lv === "High") {
        cardNum = 1;
      } else if (lv === "Mid") {
        cardNum = 2;
      } else {
        cardNum = 3;
      }

      // prepare html
      let htmlString = `
        <div class="card" id="ex-${exID}">
            <div class="card-image card${cardNum}" 
            style="
                background: url('/ex_uploads/thumbnails/${ex.thumbnail}');
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;">
            </div>
            <div class="card-text card${cardNum}">
                <span class="date">${lv} Intensity</span>
                <h2>${exName}</h2>
                <p>${ex.details}</p>
            </div>
            <div class="card-stats card${cardNum}">
                <div class="stat right-border">
                <div class="value">${ex.calories}<sup></sup></div>
                <div class="type">Calories</div>
                </div>
                <div class="stat left-border">
                <div class="type">per</div>
                <div class="value">Repetition</div>
                </div>
            </div>
        </div>
        `;
      exsList.innerHTML += htmlString;
    }
  }
  loadExs();
  activateClickOnRadios();
}
init();
