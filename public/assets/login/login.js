const loginForm = document.querySelector('#login')
const signupForm = document.querySelector('#signup')
const continueForm = document.querySelector('#continue')

window.onload = ()=>{
    login()
    signup()
    continueLogin()
}

function login(){
    loginForm.addEventListener('submit',async (event)=>{
        event.preventDefault()
        let form = event.target
        const formData = {
            email:form.email.value,
            password:form.password.value
        }
        let res = await fetch('/users/login',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(formData)
        })
        if (res.ok){
            window.location.href = `/?message=Successfully+Logged+In`
        }
    })
}

function signup(){
    signupForm.addEventListener('submit',async (event)=>{
        event.preventDefault()
        let form = event.target

        if (form.password.value != form.confirm.value){
            alert("password not the same")
            return
        } 
        if (!form.first_name.value || !form.last_name.value || !form.email.value || !form.password.value || !form.confirm.value || !form.date_of_birth.value || !form.gender.value || !form.height.value || !form.weight.value){
            alert("mandatory fields cannot be blank")
            return
        }
        const formData = new FormData(form)
        let res = await fetch('/users/signup',{
            method:'POST',
            body:formData
        })

        if (res.ok){
            window.location.href = `/?message=Successfully+Logged+In`
        }
    })
}

function continueLogin(){
    continueForm.addEventListener('submit',async (event)=>{
        event.preventDefault()
        let form = event.target
        if (!form.date_of_birth.value || !form.continue_gender.value || !form.height.value || !form.weight.value){
            alert("mandatory fields cannot be blank")
            return
        }
        const formData = {
            birth_date:form.date_of_birth.value,
            gender:form.continue_gender.value,
            height:form.height.value,
            weight:form.weight.value
        }
        const res = await fetch('/users/googleContinue',{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(formData)
        })

        if (res.ok){
            window.location.href = `localhost:8080/?message=Registration+Complete/`
        }
    })
}