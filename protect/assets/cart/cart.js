const reviewContainer = document.querySelector('#review_container')

let locationData
let marker=[];

async function main(){
await loadDetails()
initMap()

}
main()


async function getBasket(){
    const res = await fetch('/shop/orderPreview')

    let resData = await res.json()
    return resData
}

async function loadDetails(){
let data = await getBasket()
let userOrders =  data.data
locationData =  data.location
let foodCost = 0

userOrders.forEach((element)=>{
reviewContainer.innerHTML += `
<div class="row">
                    <div class="col-3">${element.quantity}</div>
                    <div class="col-6"><img src="/food_uploads/${element.image}"> ${element.food_name}</div>
                    <div class="col-3">${element.calories}</div>
                  </div>
`
foodCost += element.calories*element.quantity
})
}


function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: 22.3525755, lng: 114.0608075 },

  });

  let loc1 = new google.maps.Marker({
    map,
    draggable: false,
    animation: google.maps.Animation.DROP,
    position: { lat: locationData[0].point.x, lng: locationData[0].point.y },
  })

  let loc2 = new google.maps.Marker({
    map,
    draggable: false,
    animation: google.maps.Animation.DROP,
    position: { lat: locationData[0].point.x, lng: locationData[1].point.y },
  })

  let loc3 = new google.maps.Marker({
    map,
    draggable: false,
    animation: google.maps.Animation.DROP,
    position: { lat: locationData[0].point.x, lng: locationData[2].point.y },
  })

  loc1.addEventListener('click',console.log("1"))
}

// function toggleBounce(unit) {
//     marker.forEach(element=>{
//         element.setAnimation(null);
//     })
//     marker[unit].setAnimation(google.maps.Animation.BOUNCE);

//   }
  