const orderContainer = document.querySelector('#pending_order_container')


async function main (){
    loadOrders()
}
main()

async function getDetails (){
    let res = await fetch('/shop/userOrders')

    let result = await res.json()
    console.log(result.knexData)
    return result.knexData
}

async function loadOrders(){
    let resData = await getDetails()
    if (resData.orders.length > 0){
        resData.orders.forEach(element => {
            let foods = []
            resData.food.forEach((elem)=>{
                if (elem.trans_id == element.id){
                    foods.push(`${elem.name} | ${elem.portion} | x ${elem.quantity} `)
                }
            })
            if (element.status == "complete"){
                orderContainer.innerHTML = `
                <div class="order_container">
                <div class="order_no">
                Order No: ${element.id}
                </div>
                <div class="order_details">
                <div class="order_title">
                <strong>${element.title}</strong><br>
                ${element.address}<br>
                </div>
                <div class="order_content">
                ${foods.join('<br>')}
                ${foods.join('<br>')}
                </div>
                </div>
                <div class="collected_status">
                pending
                </div>
                </div>
                `
            }else if (element.status == "pending"){
                orderContainer.innerHTML = `
                <div class="order_container">
                <div class="order_no">
                Order No: ${element.id}
                </div>
                <div class="order_details">
                <div class="order_title">
                <strong>${element.title}</strong><br>
                ${element.address}<br>
                </div>
                <div class="order_content">
                ${foods.join('<br>')}
                ${foods.join('<br>')}
                </div>
                </div>
                <div class="collected_status">
                    <button id="${element.id}" class="confirmation_btn">Collected!</button>
                    </div>
                </div>
                `
            }
        });
    }else{
        orderContainer.innerHTML = `
        <h1>No Orders</h1>
        `
    }

}

orderContainer.addEventListener('click',async (event)=>{
    if (event.target.classList.contains('confirmation_btn')){
        let res = await fetch(`/shop/collctedOrder/${event.target.id}`)

        if (res.ok){
            loadOrders()
        }else{
            alert('error')
        }
    }
})


/* <div class="order_container">
    <div class="order_no">
    Order No: 
    </div>
    <div class="order_details">

    </div>
    <div class="collected_status">
    test3
    </div>
</div> */