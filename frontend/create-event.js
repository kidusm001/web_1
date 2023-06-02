const form = document.querySelector("#new-event-form")
const addTagButton = document.querySelector('#add-tag-btn')
const tagInput = document.querySelector('#tag-input')
const addedTags = document.querySelector('#added-tags')

sessionStorage.setItem('user_id', 'Abel')
const merchantId = sessionStorage.getItem('user_id')

const tags = new Set()
const maxTags = 8

let tagCount = 0

function handleNewTag() {
  if (tagCount === maxTags) return;

  const updateAddTagBtn = () => {
    if (tagCount < maxTags) {
      addTagButton.disabled = false;
      addTagButton.style.background = '#b17cc4';
    } else {
      addTagButton.disabled = true;
      addTagButton.style.background = 'grey';
    }
  };

  const tag = document.createElement('span');
  const tag_text = document.createElement('span');
  tag_text.textContent = tagInput.value;
  if (tag_text.textContent === '') return;
  tag.appendChild(tag_text);
  tag.classList.add('tag');
  tags.add(tagInput.value);

  const removeButton = document.createElement('button');
  removeButton.innerHTML = `<i class="fa-solid fa-xmark" style="color: #ffffff;"></i>`;
  removeButton.classList.add('removeTagButton');
  removeButton.style.background = 'red';
  tag.append(removeButton);

  addedTags.appendChild(tag);
  tagInput.value = '';
  tagCount++;

  removeButton.addEventListener('click', () => {
    addedTags.removeChild(tag)
    tagCount--
    updateAddTagBtn()
    tags.delete(tag_text.textContent)
  });

  updateAddTagBtn();
}

function fadeIn(element) {
  element.style.opacity = '0';
  element.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    element.style.opacity = '1';
  }, 100);
}

addTagButton.addEventListener('click', () => {
  handleNewTag();
  fadeIn(addedTags.lastChild);
});

tagInput.addEventListener('keydown', (event) => {
  if(event.key === 'Enter'){
    event.preventDefault()
    handleNewTag()
  } 
})

form.addEventListener('submit', (event) => {
  event.preventDefault();
  tagInput.value = JSON.stringify([...tags]) 

  const merchantData = document.createElement('input') 
  merchantData.setAttribute("type", "text")
  merchantData.setAttribute("name", "user_name")
  merchantData.value = merchantId
  merchantData.setAttribute("style", "display: none;")
  form.appendChild(merchantData)

  const formData = new FormData(form);

  for(let [name, value] of formData) console.log(`${name}: ${value}`)
  fetch('../backend/php/events/create.php', {
    method: 'POST',
    body: formData
  }).then(response => {
    alert(response)
  }).catch(error => {
    alert(error);
  })
})
