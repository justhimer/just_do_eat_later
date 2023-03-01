const complete = document.querySelector('#complete_Exercise'),
    food1 = document.querySelector('#add_food_1'),
    food2 = document.querySelector('#add_food_2'),
    removeUnit = document.querySelector('#remove_unit'),
    removeFood = document.querySelector('#remove_food'),
    deleteBasket = document.querySelector('#delete'),
    itemCount = document.querySelector('#item_count'),
    totalCount = document.querySelector('#total_count'),
    confirmBasket = document.querySelector('#confirm'),
    previewBasket = document.querySelector('#preview_basket')
    body = document.querySelector('#test')


    let totalCalories;
    let setData = async function insideBasket(){
        totalCalories = 0
        resData = {}
        let res = await fetch('/shop/orderPreview')

        let result = await res.json()
        console.log(result)
        result.data.forEach((element)=>{
           totalCalories += element.calories
        })
    }
setData()
body.addEventListener('click',async (event)=>{
    if(event.target == complete){
        resData = {exercise_id:3,
        repetitions:20}
        let res = await fetch('/exercise/completeExercise',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },body: JSON.stringify(resData)
        })

        let result = await res.json()
        console.log(result)
        
    }else if (event.target == food1){
        resData = {food_details_id:1,
        quantity:1}
        let res = await fetch('/shop/addFood',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },body:JSON.stringify(resData)
        })

        let result = await res.json()
        console.log(result)
    }else if (event.target == food2){
        resData = {food_details_id:4,
            quantity:1}
            let res = await fetch('/shop/addFood',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },body:JSON.stringify(resData)
            })

        let result = await res.json()
        console.log(result)
    }else if (event.target == removeUnit){
        resData = {food_details_id:4,
        quantity:2}
        let res = await fetch('/shop/removeQuantity',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },body:JSON.stringify(resData)
        })

        let result = await res.json()
        console.log(result)
    }else if (event.target == removeFood){
        resData = {food_details_id:1}
        let res = await fetch('/shop/removeFood',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },body:JSON.stringify(resData)
        })

        let result = await res.json()
        console.log(result)
    }else if (event.target == deleteBasket){
        resData = {}
        let res = await fetch('/shop/deleteBasket')

        let result = await res.json()
        console.log(result)
    }else if (event.target == itemCount){
        resData = {food_details_id:1}
        let res = await fetch('/shop/itemCount',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },body:JSON.stringify(resData)
        })

        let result = await res.json()
        console.log(result)
    }else if (event.target == totalCount){
        resData = {}
        let res = await fetch('/shop/totalCount')

        let result = await res.json()
        console.log(result)
    }else if (event.target == previewBasket){
        setData()

    }else if (event.target == confirmBasket){
        resData = {location_id : 1,
            total_calories:totalCalories
        }
        let res = await fetch('/shop/confirmOrder',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },body:JSON.stringify(resData)
        })

        let result = await res.json()
        console.log(result)
    }
})

