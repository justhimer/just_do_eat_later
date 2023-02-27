const content = document.querySelector('#main')
const accountContainer = document.querySelector("#account_container")
const personalContainer = document.querySelector("#personal_detail_container")
const bodyContainer = document.querySelector("#body_container")
const imgContainer = document.querySelector('#img_container')
const accountBtn = document.querySelector('#account_edit')
const personalBtn = document.querySelector('#personal_edit')
const bodyBtn = document.querySelector('#body_edit')
const iconBtn = document.querySelector('#icon_edit')
const imgPreview = document.querySelector('#img_preview')
const iconForm = document.querySelector('#icon_form')

let emailData,
    passwordData,
    imgData,
    firstNameData,
    lastNameData,
    genderData,
    dobData,
    heightData,
    weightData;

loadDetails()


async function getDetails() {
    const res = await fetch('/users/userDetails')
    let resData = await res.json()
    console.log(resData)
    emailData = resData.email;
    passwordData = 'AAATK3!7';
    imgData = `/users/${resData.icon}`;
    firstNameData = resData.first_name;
    lastNameData = resData.last_name;
    genderData = resData.gender;
    dobData = resData.dob;
    heightData = resData.height;
    weightData = resData.weight;
    return resData
}

async function loadDetails() {
    await getDetails()

    refreshContent('img')
    refreshContent('account')
    refreshContent('personal')
    refreshContent('body')
    console.log("done upload");
}

content.addEventListener('click', (event) => {
    if (event.target == accountBtn) {
        console.log('account')
        accountContainer.innerHTML = `
        <form id="account_form">
                    <div>Email:</div><input id="email" name="email" type="email" value="${emailData}">
                    <br>
                    <div>Password:</div><input id="password" name="password" type="password" value="${passwordData}">
                    <br>
                    <div>Confirm Password:</div><input id="confirm" name="confirm" type="password" value="${passwordData}">
                    <button id="account_submit" type="button">
                        Submit
                    </button>
                    <input type="reset">
                    <button id="account_cancel" type="button">
                        Cancel
                    </button>
                </form>
        `
    } else if (event.target == personalBtn) {
        console.log('personal')
        if (genderData == "male") {
            personalContainer.innerHTML = `
            <form id="personal_form">
                        <div>First Name:</div><input id="first_name" name="first_name" type="text" value="${firstNameData}">
                        <br>
                        <div>Last Name:</div><input id="last_name" name="last_name" type="text" value="${lastNameData}">
                        <br>
                        <div>Gender:</div>
                        <input id="male" value="male" name="gender" type="radio" checked> <label for="male">Male</label>
                        <br>
                        <input id="female" value="female" name="gender" type="radio"><label for="female">Female</label>
                        <br>
                        <div>Date of Birth:</div><input id="dob" name="dob" type="date" value="${dobData}">
                        <button id="personal_submit" type="button">
                            Submit
                        </button>
                        <input type="reset">
                        <button id="personal_cancel" type="button">
                            Cancel
                        </button>
                    </form>
            `
        } else if (genderData == "female") {
            personalContainer.innerHTML = `
            <form id="personal_form">
                        <div>First Name:</div><input id="first_name" name="first_name" type="text" value="${firstNameData}">
                        <br>
                        <div>Last Name:</div><input id="last_name" name="last_name" type="text" value="${lastNameData}">
                        <br>
                        <div>Gender:</div>
                        <input id="male" value="male" name="gender" type="radio"> <label for="male">Male</label>
                        <br>
                        <input id="female" value="female" name="gender" type="radio" checked><label for="female">Female</label>
                        <br>
                        <div>Date of Birth:</div><input id="dob" name="dob" type="date" value="${dobData}">
                        <button id="personal_submit" type="button">
                            Submit
                        </button>
                        <input type="reset">
                        <button id="personal_cancel" type="button">
                            Cancel
                        </button>
                    </form>
            `
        } else {
            personalContainer.innerHTML = `
            <form id="personal_form">
                        <div>First Name:</div><input id="first_name" name="first_name" type="text" value="${firstNameData}">
                        <br>
                        <div>Last Name:</div><input id="last_name" name="last_name" type="text" value="${lastNameData}">
                        <br>
                        <div>Gender:</div>
                        <input id="male" value="male" name="gender" type="radio"> <label for="male">Male</label>
                        <br>
                        <input id="female" value="female" name="gender" type="radio"><label for="female">Female</label>
                        <br>
                        <div>Date of Birth:</div><input id="dob" name="dob" type="date" value="${dobData}">
                        <button id="personal_submit" type="button">
                            Submit
                        </button>
                        <input type="reset">
                        <button id="personal_cancel" type="button">
                            Cancel
                        </button>
                    </form>
            `
        }

    } else if (event.target == bodyBtn) {
        console.log('body')
        bodyContainer.innerHTML = `
        <form id="body_form">
        <div>Height:</div><input id="height" name="height" type="number" value="${heightData}">
        <br>
        <div>Weight:</div><input id="weight" name="weight" type="number" value="${weightData}">
        <button id="body_submit" type="button">
            Submit
        </button>
        <input type="reset">
        <button id="body_cancel" type="button">
            Cancel
        </button>
    </form>
        `
    } else if (event.target == iconBtn) {
        iconForm.classList.toggle('shown')
    }
})

accountContainer.addEventListener('click', async (event) => {
    if (event.target.id == "account_cancel") {
        refreshContent('account')
    } else if (event.target.id == "account_submit") {
        await alterHandler('account')
    }
})

personalContainer.addEventListener('click', async (event) => {
    if (event.target.id == "personal_cancel") {
        refreshContent('personal')
    } else if (event.target.id == "personal_submit") {
        await alterHandler('personal')
    }
})

bodyContainer.addEventListener('click', async (event) => {
    if (event.target.id == "body_cancel") {
        refreshContent('body')
    } else if (event.target.id == "body_submit") {
        await alterHandler('body')
    }
})

iconForm.addEventListener('change', async (event) => {
    const [file] = event.target.files
    if (file) {
        imgPreview.src = URL.createObjectURL(file)
    }
})

imgContainer.addEventListener('click', async (event) => {
    if (event.target.id == "icon_submit") {
        if (document.querySelector('#icon_input').files[0]) {
            let formData = new FormData(iconForm)
            let res = await fetch('/users/updateImg', {
                method: "Put",
                body: formData
            })
            if (res.ok) {
                console.log('success')
                await getDetails()
                refreshContent('img')
                iconForm.classList.toggle('shown')
            }
        } else {
            alert('no files provided')
            return
        }
    } else if (event.target.id == 'icon_cancel') {
        iconForm.classList.toggle('shown')
        iconForm.reset()
        refreshContent('img')
    } else if (event.target.id == 'icon_reset'){
        refreshContent('img')
    }
})

async function alterHandler(section) {
    console.log('received')
    let res,
        form,
        formData;
    switch (section) {
        case 'body':
            form = document.querySelector('#body_form')
            formData = {
                height: form.height.value,
                weight: form.weight.value
            }
            console.log('body request');
            res = await fetch('/users/updateBody', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            getDetails()
            refreshContent('body')
            break;
        case 'personal':
            form = document.querySelector('#personal_form')
            formData = {
                first_name: form.first_name.value,
                last_name: form.last_name.value,
                gender: form.gender.value,
                dob: form.dob.value.toString()
            }
            console.log('personal request');
            res = await fetch('/users/updatePersonal', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            getDetails()
            refreshContent('personal')
            break;
        case 'account':
            form = document.querySelector('#account_form')
            if (form.password.value != form.confirm.value) {
                alert("password values are not the same")
                return
            }
            formData = {
                email: form.first_name.value,
                password: form.password.value,
                confirm: form.confirm.value,
                dob: form.dob.value
            }
            console.log('account request');
            res = await fetch('/users/updateAccount', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            getDetails()
            refreshContent('account')
            break;
    }
}

async function refreshContent(section) {
    switch (section) {
        case 'account':
            accountContainer.innerHTML = `
            <div id="email">
                            email: ${emailData}
                        </div>
        
                        <div id="password">
                            password: ********
                        </div>
            `
            break;
        case 'personal':
            personalContainer.innerHTML = `
    <div id="first_name">
                    First Name: ${firstNameData}
                </div>

                <div id="last_name">
                    Last Name: ${lastNameData}
                </div>

                <div id="gender">
                    Gender: ${genderData}
                </div>

                <div id="birth_date">
                    Date of Birth: ${dobData}
                </div>
    `

            break;
        case 'body':
            bodyContainer.innerHTML = `
    <div id="height">
                    Height: ${heightData}
                </div>

                <div id="weight">
                    Weight: ${weightData}
                </div>
    `
            break;
        case 'img':
            imgPreview.src = imgData;
            break;
    }
}

