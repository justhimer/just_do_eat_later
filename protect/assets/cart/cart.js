var current_fs, next_fs, previous_fs;
var left, opacity, scale;
var animating;
const reviewContainer = document.querySelector('#review_container')
const locationContainer = document.querySelector('#chosen_container')
const allContent = document.querySelector('#main')
const confirmBtn = document.querySelector('#confirm')
const deleteBtn = document.querySelector('#delete')
const deleteArr = document.querySelectorAll('.card__delete')
const minusArr = document.querySelectorAll('.card__minus')
const addArr = document.querySelectorAll('.card__add')


function wtf() {
  console.log('clicked!')
}

let locationData,
  locationChose,
  foodCost


async function main() {
  await loadDetails()
  initMap()
  addToCart()
  async function main() {
    await loadDetails()
    initMap()
    foodListener()
    // console.log(deleteArr);
  }
  main()





  $(".next").click(function () {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    next_fs.show();
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now, mx) {
          scale = 1 - (1 - now) * 0.2;
          left = now * 50 + "%";
          opacity = 1 - now;
          current_fs.css({
            transform: "scale(" + scale + ")",
            position: "absolute"
          });
          next_fs.css({ left: left, opacity: opacity });
        },
        duration: 800,
        complete: function () {
          current_fs.hide();
          animating = false;
        },
        easing: "easeInOutBack"
      }
    );
  });

  $(".previous").click(function () {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();
    $("#progressbar li")
      .eq($("fieldset").index(current_fs))
      .removeClass("active");

    previous_fs.show();
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now, mx) {
          scale = 0.8 + (1 - now) * 0.2;
          left = (1 - now) * 50 + "%";
          opacity = 1 - now;
          current_fs.css({ left: left });
          previous_fs.css({
            transform: "scale(" + scale + ")",
            opacity: opacity
          });
        },
        duration: 800,
        complete: function () {
          current_fs.hide();
          animating = false;
        },
        easing: "easeInOutBack"
      }
    );
  });

  // my code



  ///////////////////////////// 
  const getFoodData = document.querySelector('.card')

  async function addToCart(food_name) {

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let existingfood = cart.find(item => item.id === food.id);

    if (existingfood) {

      existingfood.quantity += 1;
    } else {

      cart.push({
        id: food.id,
        name: food_name.name,
        calories: food.calories,
        quantity: 1,
      });
    }


    localStorage.setItem('cart', JSON.stringify(cart));

  }

  async function getBasket() {

    localStorage.setItem('cart', JSON.stringify(cart));
  }



  async function getBasket() {
    const res = await fetch('/shop/orderPreview')

    let resData = await res.json()
    return resData
  }

  async function loadDetails() {
    let data = await getBasket()
    let userOrders = data.data
    locationData = data.location
    foodCost = 0
    reviewContainer.innerHTML = ``

    await userOrders.forEach((element) => {
      reviewContainer.innerHTML += `
      <article id="${element.food_id}" class="card">
        <div class="card__delete" ><p>X</p></div>
        <img class="card__image" src="/food_uploads/${element.image}" />
        <div class="card__data">
          <div class="card__info">
            <h2>${element.food_name}</h2>
            <p>(${element.portion})</p>
            <h2>x <div class="card_food_quantity">${element.quantity}</div></h2>
          </div>
          <div class="final_hold">
            <button type="button" class="card__minus">-</button>
            <h3 class="card__price">${element.calories * element.quantity} Cal</h3>
            <button type="button" class="card__add">+</button>
          </div>
        </div>
      </article>
`
      foodCost += element.calories * element.quantity
    })


  }




  function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: { lat: 22.29023223431154, lng: 114.17045008119564 },

    });
    let infoWindow = new google.maps.InfoWindow();
    let latlngbounds = new google.maps.LatLngBounds();

    for (let keys in locationData) {
      let data = locationData[keys]
      let myLatlng = new google.maps.LatLng(data.point.x, data.point.y);
      let marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: `test ${keys}`,
        id: data.id
      })

      async function markerClick(i, j) {
        google.maps.event.addListener(i, "click", (e) => {
          infoWindow.setContent("<div style = 'width:200px;min-height:40px'>" + ` <h6>${j.title}</h6><br><p>${j.address}</p><br><p>${j.description}</p> ` + "</div>")
          infoWindow.open(map, marker)
          map.setZoom(15)
          map.panTo(i.position)
          locationChose = i.id
          changeLocation()
          updateContainer()
          console.log(locationChose)
        })
      }

      markerClick(marker, data)

    }
    function changeLocation() {
      if (!locationChose) {
        locationContainer.innerHTML = `
        <br>
      `
      } else {
        locationContainer.innerHTML = `
        <br>
      <div>${locationData[locationChose - 1].title}</div>
      <div>${locationData[locationChose - 1].address}</div>
      <div>${locationData[locationChose - 1].description}</div>
      `
      }
    }
  }



  async function updateContainer() {
    console.log(foodCost);
  }

  confirmBtn.addEventListener('click', async (event) => {
    event.preventDefault()
    if (!foodCost || !locationChose) {
      console.log("foodCost: ", foodCost)
      console.log("locationChose: ", locationChose)
      alert("Items empty")
      return
    }
    let resData = {
      location_id: locationChose,
      total_calories: foodCost
    }
    let res = await fetch('/shop/confirmOrder', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify(resData)
    })

    let result = await res.json()
    if (res.ok) {
      window.location.href = "/"
    } else {
      alert(result.message)
      return
    }
  })

  let result = await res.json()
  if (res.ok) {
    window.location.href = "/"
  } else {
    alert(result.message)
  }
}

deleteBtn.addEventListener('click', async (event) => {
  if (!foodCost || !locationChose) {
    console.log("foodCost: ", foodCost)
    console.log("locationChose: ", locationChose)
    alert("Are you sure to delete itmes?")
    return
  }

  let resData = {
    location_id: locationChose,
    total_calories: foodCost
  }
  let res = await fetch('/shop/deleteBasket', {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    }, body: JSON.stringify(resData)
  })

  let result = await res.json()
  if (res.ok) {
    window.location.href = "/"
  } else {
    alert(result.message)
  }
})


function foodListener() {


}
function foodListener() {
  const deleteArr = document.querySelectorAll('.card__delete')
  const minusArr = document.querySelectorAll('.card__minus')
  const addArr = document.querySelectorAll('.card__add')

  deleteArr.forEach((element) => {
    let food_id = element.parentElement.id
    element.addEventListener('click', async () => {
      let resData = JSON.stringify({
        food_details_id: food_id,
      })

      const res = await fetch('/shop/removeFood', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: resData
      })

      if (res.ok) {
        document.getElementById(`${food_id}`).remove()
      } else {
        alert("error")
        return
      }
    })
  })

  minusArr.forEach((element) => {
    element.addEventListener('click', async () => {
      let food_id = element.parentElement.parentElement.parentElement.id
      let resData = JSON.stringify({
        food_details_id: food_id,
        quantity: 1
      })

      const res = await fetch('/shop/removeQuantity', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: resData
      })

      if (res.ok) {
        let oldQuantity = Number(document.querySelector(`article[id="${food_id}"] .card__info .card_food_quantity`).innerHTML)
        if (oldQuantity == 1) {
          document.getElementById(`${food_id}`).remove()
        } else {
          document.querySelector(`article[id="${food_id}"] .card__info .card_food_quantity`).innerHTML = oldQuantity - 1
        }

      } else {
        alert("error")
        return
      }
    })
  })

  addArr.forEach((element) => {
    element.addEventListener('click', async () => {
      let food_id = element.parentElement.parentElement.parentElement.id
      let resData = JSON.stringify({
        food_details_id: food_id,
        quantity: 1
      })

      const res = await fetch('/shop/addFood', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: resData
      })

      if (res.ok) {
        let oldQuantity = Number(document.querySelector(`article[id="${food_id}"] .card__info .card_food_quantity`).innerHTML)
        document.querySelector(`article[id="${food_id}"] .card__info .card_food_quantity`).innerHTML = oldQuantity + 1
      } else {
        alert("error")
        return
      }
    })
  })

}
