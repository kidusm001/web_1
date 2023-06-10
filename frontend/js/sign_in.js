const userIdInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password') 
const form = document.querySelector('#sign-in-form')
const btn = document.querySelector('#submit-button')

btn.addEventListener('click', async (event) => {
  event.preventDefault()
  console.log('btn pressed')
   
  passwordInput.value = await sha256(passwordInput.value)
  const formData = new FormData(form);
  console.log(formData)
  fetch('http://0.0.0.0:8000/users/login.php', {
    method: 'POST',
    body: formData
  }).then(async (response) => {
    if(response.ok){
      console.log(`${userIdInput.value} logged in`)
      let user_type = await getUserType(userIdInput.value)
      sessionStorage.setItem('user_id', JSON.stringify(userIdInput.value)) 
      sessionStorage.setItem('user_type', user_type)
      let page = user_type === 'customer'
        ? "cust-home.html"
        : "merchant-home-page.html"
      let currentURL = window.location.href
      let newURL = currentURL.substring(0, currentURL.lastIndexOf("/") + 1) + page; 
      window.location.href = newURL 
    }else{
      alert("login failed !")
    }
  }).catch(error => {
    alert(error);
  })
})
