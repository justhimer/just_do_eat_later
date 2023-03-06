const orderContainer = document.querySelector('#pending_order_container')


async function main (){
    loadOrders()
}
main()

async function getDetails (){
    let res = await fetch('/shop/userOrders')

    let result = await res.json()
    return result.knexData
}

async function loadOrders(){
    let resData = await getDetails()
    console.log(resData)
    if (resData.orders.length>0){
        orderContainer.innerHTML = ``
        resData.orders.forEach(element => {
            let foods = '';
            let totalCost = 0
            resData.food.forEach((elem)=>{
                if (elem.trans_id == element.id){
                    foods += `
                    <tr>
                        <td width="20%"> <img src="/food_uploads/${elem.image}" width="90">
                        </td>
                        <td width="60%"> <span class="font-weight-bold">${elem.name}</span>
                            <div class="product-qty"> <span class="d-block">Quantity:${elem.quantity}</span>
                                <span>Portion:${elem.portion}</span> </div>
                        </td>
                        <td width="20%">
                            <div class="text-right"> <span class="font-weight-bold">${elem.calories} Calories</span>
                            </div>
                        </td>
                    </tr>
                    `
                    totalCost += elem.calories*elem.quantity
                }
            })
            if (element.status == "complete"){
                orderContainer.innerHTML += `
                <div class="container">
            <div class="row d-flex justify-content-center">
                <div class="col-md-10">
                    <div class="card">
                        <div class="invoice p-5">
                            <div class="payment mb-3 border-bottom table-responsive">
                                <table class="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div class="py-2"> <span class="d-block text-muted">Order ID:</span>
                                                    <span>${element.id}</span> </div>
                                            </td>
                                            <td>
                                                <div class="py-2"> <span class="d-block text-muted">Pick-up Location:</span> <span>${element.address}</span> </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="product border-bottom table-responsive">
                                <table class="table table-borderless">
                                    <tbody>
                                        ${foods}
                                    </tbody>
                                </table>
                            </div>
                            <div class="row d-flex justify-content-end">
                                <div class="col-md-5">
                                    <table class="table table-borderless">
                                        <tbody class="totals">
                                            <tr class="border-bottom">
                                                <td>
                                                    <div class="text-left"> <span
                                                            class="font-weight-bold">Total</span> </div>
                                                </td>
                                                <td>
                                                    <div class="text-right"> <span
                                                            class="font-weight-bold">${totalCost} Calories</span> </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="row d-flex justify-content-center">
                                <div class="col-md-12 text-center collected_status"><h3>Collection Status:</h3><br>
                                <p>Complete!</p>
                                </div></div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between footer p-3"> <span></span> <span>${element.created_at.split(" ")[0]}</span> </div>
                    </div>
                </div>
            </div>
        </div>
                `

            }else if (element.status == "pending"){
                orderContainer.innerHTML += `
                <div class="container">
            <div class="row d-flex justify-content-center">
                <div class="col-md-10">
                    <div class="card">
                        <div class="invoice p-5">
                            <div class="payment mb-3 border-bottom table-responsive">
                                <table class="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div class="py-2"> <span class="d-block text-muted">Order ID:</span>
                                                    <span>${element.id}</span> </div>
                                            </td>
                                            <td>
                                                <div class="py-2"> <span class="d-block text-muted">Pick-up Location:</span> <span>${element.address}</span> </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="product border-bottom table-responsive">
                                <table class="table table-borderless">
                                    <tbody>
                                        ${foods}
                                    </tbody>
                                </table>
                            </div>
                            <div class="row d-flex justify-content-end">
                                <div class="col-md-5">
                                    <table class="table table-borderless">
                                        <tbody class="totals">
                                            <tr class="border-bottom">
                                                <td>
                                                    <div class="text-left"> <span
                                                            class="font-weight-bold">Total</span> </div>
                                                </td>
                                                <td>
                                                    <div class="text-right"> <span
                                                            class="font-weight-bold">${totalCost} Calories</span> </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="row d-flex justify-content-center">
                                <div class="col-md-12 text-center collected_status"><h3>Collection Status:</h3><br>
                                <button id="${element.id}" class="confirmation_btn">Picked Up!</button>
                                </div></div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between footer p-3"> <span></span> <span>${element.created_at.split(" ")[0]}</span> </div>
                    </div>
                </div>
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