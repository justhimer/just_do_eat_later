const reviewContainer = document.querySelector('#review_container')
const locationContainer = document.querySelector('#chosen_container')
const allContent = document.querySelector('#main')
const confirmBtn = document.querySelector('#confirm')

let locationData,
locationChose,
foodCost


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
foodCost = 0

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
  let infoWindow = new google.maps.InfoWindow();
  let latlngbounds = new google.maps.LatLngBounds();

  for (let keys in locationData){
    let data = locationData[keys]
    let myLatlng = new google.maps.LatLng(data.point.x,data.point.y);
    let marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: `test ${keys}`,
      id: data.id
    })

    async function markerClick (i,j){
      google.maps.event.addListener(i,"click", (e)=>{
        infoWindow.setContent("<div style = 'width:200px;min-height:40px'>" +` <h6>${j.title}</h6><br><p>${j.address}</p><br><p>${j.description}</p> `+ "</div>")
        infoWindow.open(map,marker)
        map.setZoom(15)
        map.panTo(i.position)
        locationChose = i.id
        changeLocation()
        updateContainer()
      })
    }
    
    markerClick(marker,data)

  }
  function changeLocation() {
    if (!locationChose) {
      locationContainer.innerHTML = `
      
      `
    }else{
      locationContainer.innerHTML = `
      <div class="col-3">${locationData[locationChose-1].title}</div>
      <div class="col-3">${locationData[locationChose-1].address}</div>
      <div class="col-6">${locationData[locationChose-1].description}</div>
      `
    }
  }
}


async function updateContainer(){
  console.log(foodCost);
}

confirmBtn.addEventListener('click',async (event)=>{
  if (!foodCost || !locationChose){
    console.log("foodCost: ", foodCost)
    console.log("locationChose: ", locationChose)
    alert("Items empty")
    return
  }
  let resData = {location_id : locationChose,
    total_calories: foodCost
}
let res = await fetch('/shop/confirmOrder',{
    method:"post",
    headers:{
        "Content-Type":"application/json"
    },body:JSON.stringify(resData)
})

let result = await res.json()
if (res.ok){
window.location.href = "/"
}else{
alert(result.message)
}
})