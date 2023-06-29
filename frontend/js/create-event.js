const form = document.querySelector("#new-event-form")
const addTagButton = document.querySelector('#add-tag-btn')
const tagInput = document.querySelector('#tag-input')
const addedTags = document.querySelector('#added-tags')
const finish_button = document.querySelector('#finish_button')
const tagi = document.querySelector('input[name="tagi"]')

// sessionStorage.setItem('user_id', "Iyasu#1234")
const merchantId = sessionStorage.getItem('user_id')

const tags = new Set();
const maxTags = 8;

let tagCount = 0;

async function handleNewTag() {
  if (tagCount === maxTags) return;

  const updateAddTagBtn = () => {
    if (tagCount < maxTags) {
      addTagButton.disabled = false;
      addTagButton.style.background = "#b17cc4";
    } else {
      addTagButton.disabled = true;
      addTagButton.style.background = "grey";
    }
  };

  const tag = document.createElement("span");
  const tag_text = document.createElement("span");
  tag_text.textContent = tagInput.value;
  if (tag_text.textContent === "") return;
  tag.appendChild(tag_text);
  tag.classList.add("tag");
  tags.add(tagInput.value);

  const removeButton = document.createElement("button");
  removeButton.innerHTML = `<i class="fa-solid fa-xmark" style="color: #ffffff;"></i>`;
  removeButton.classList.add("removeTagButton");
  removeButton.style.background = "red";
  tag.append(removeButton);

  addedTags.appendChild(tag);
  tagInput.value = "";
  tagCount++;

  removeButton.addEventListener("click", () => {
    addedTags.removeChild(tag);
    tagCount--;
    updateAddTagBtn();
    tags.delete(tag_text.textContent);
  });

  tagi.value = JSON.stringify(Array.from(tags))
  updateAddTagBtn();
}

function fadeIn(element) {
  element.style.opacity = "0";
  element.style.transition = "opacity 0.5s ease";
  setTimeout(() => {
    element.style.opacity = "1";
  }, 100);
}

addTagButton.addEventListener('click',async () => {
  await handleNewTag();
  fadeIn(addedTags.lastChild);
});

tagInput.addEventListener('keydown',async (event) => {
  if(event.key === 'Enter'){
    event.preventDefault()
    await handleNewTag()
  } 
})

function handleSubmit(e) {
  e.preventDefault()

  const formData = new FormData(form);
  formData.append('merchant_id', merchantId)
  let redirectHome = () => {
    let currentURL = window.location.href
    let newURL = currentURL.substring(0, currentURL.lastIndexOf("/") + 1) + "merchant-home-page.html";
    window.location.href = newURL 
  }

  fetch('http://localhost:8000/events/create.php', {
    mode: 'no-cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify(formData),
    body: formData,
  }).then(response => {
      if(response.status === 200){
        redirectHome()
      }else{
        redirectHome()
        alert(" Failed !")
        throw new Error(response.text)
      }
  }).catch(error => {
      redirectHome()
  })
}

form.addEventListener('submit', e => e.preventDefault())
finish_button.addEventListener('click', handleSubmit)
