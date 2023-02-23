const loginForm = document.querySelector('#login')
const signupForm = document.querySelector('#signup')


window.onload = ()=>{
    login()
    signup()
}

function login(){
    loginForm.addEventListener('submit',async (event)=>{
        event.preventDefault()
        let form = event.target
        const formData = {
            email:form.email.value,
            password:form.password.value
        }
        let res = fetch('/users/login',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(formData)
        })
        if (res.ok){
            alert("successful login")
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
        const formData = new FormData(form)
        //let imageName = form.icon.files[0]?form.icon.files[0].name : ''
        // let formData = {
        //     icon:imageName,
        //     first_name:form.first_name.value,
        //     last_name:form.last_name.value,
        //     email: form.email.value,
        //     password: form.password.value,
        //     dob:form.date_of_birth.value,
        //     gender:form.gender.value,
        //     height:form.height.value,
        //     weight:form.weight.value
        // }
        
        let res = await fetch('/users/signup',{
            method:'POST',
            body:formData
        })

        if (res.ok){
            alert('success signup')
        }
    })
}
