const userIdInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password') 
const form = document.querySelector('#sign-in-form')

form.addEventListener('submit', async (event) => {
  event.preventDefault()
   
  const formData = new FormData(form);
  
  fetch('http://0.0.0.0:8000/users/login.php', {
    method: 'POST',
    body: formData
  }).then(response => {
    if(response.ok){
      console.log(`${userIdInput.value} logged in`)
      let user_type = await getUserType(userIdInput.value)
      sessionStorage.setItem('user_id', userIdInput.value) 
      sessionStorage.setItem('user_type', user_type)
      window.location.href = user_type === 'customer'
        ? "../cust-home.html"
        : "../merch-home.html"
    }else{
      alert("login failed !")
    }
  }).catch(error => {
    alert(error);
  })
})
