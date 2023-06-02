const signUpForm = document.querySelector("#sign_up_form")
const pwd = document.querySelector("#password")
const genderSelector = document.querySelector("#gender-selection")

signUpForm.addEventListener('submit', (event) => {
  event.preventDefault()
  pwd.value = sha256(pwd.value) 
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
