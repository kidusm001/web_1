const userIdInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password') 
const form = document.querySelector('#sign-in-form')

form.addEventListener('submit', (event) => {
  event.preventDefault()
   
  const formData = new FormData(form);
  
  fetch('http://0.0.0.0:8000/users/login.php', {
    method: 'POST',
    body: formData
  }).then(response => {
    if(response.ok){
      console.log(`${userIdInput.value} logged in`)
      sessionStorage.setItem('user_id', userIdInput.value) 
    }else{
      alert("login failed !")
    }
  }).catch(error => {
    alert(error);
  })
})
