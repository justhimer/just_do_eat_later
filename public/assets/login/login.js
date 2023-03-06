const signUpButton = document.getElementById('signUp');
const emailRegisterButton = document.querySelector('#signup-register')
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const signupFormContainer = document.querySelector('#signup-form .space-allocater')
const loginForm = document.querySelector('#login-form')
const signupForm = document.querySelector('#signup-form')
const imgPreview = document.querySelector('#img_preview')
const imgUpload = document.querySelector('#signup_icon')
const continueForm = document.querySelector('#continue')


emailRegisterButton.addEventListener('click',()=>{
    emailRegisterButton.classList.add('hidden')
    signupFormContainer.classList.remove('hidden')
})

imgUpload.addEventListener('change',()=>{
    imgSwitch()
})

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

function main(){
    checkStatus()
    imgSwitch()
    login()
    signup()
    continueLogin()
}
main()

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
            window.location.href = `/?message=Registration+Complete/`
        }
    })
}

function imgSwitch(){
    let [file] = imgUpload.files
    if (file){
        imgPreview.src = URL.createObjectURL(file)
    }else{
        imgPreview.src = `/user_upload/default_user_icon.png`;
    }
    
}

function checkStatus(){
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      let value = params.registration; 
      if (value == 'continue'){
        document.getElementById('login_box').classList.add('hidden')
      }else{
        document.getElementById('continue_box').classList.add('hidden')
      }
}