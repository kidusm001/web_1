const form = document.querySelector("#new-event-form")
const addTagButton = document.querySelector('#add-tag-btn')
const tagInput = document.querySelector('#tag-input')
const addedTags = document.querySelector('#added-tags')

const tags = new Set()
const maxTags = 8

let tagCount = 0

function handleNewTag(){
  if (tagCount === maxTags) return
  
  const updateAddTagBtn = () => {
    if(tagCount < maxTags){
      addTagButton.disabled = false;
      addTagButton.style.background = 'green'
    }else{
      addTagButton.disabled = true
      addTagButton.style.background = 'grey'
    }
  }

  const tag = document.createElement('span')
  const tag_text = document.createElement('span')
  tag_text.textContent = tagInput.value
  tag.appendChild(tag_text)
  tag.classList.add('tag')
  tags.add(tagInput.value)

  const removeButton = document.createElement('button')
  removeButton.textContent = 'x'
  removeButton.classList.add('removeTagButton')
  removeButton.style.background = 'red'
  tag.append(removeButton)

  addedTags.appendChild(tag)
  tagInput.value = ''
  tagCount++

  removeButton.addEventListener('click', () => {
    addedTags.removeChild(tag)
    tagCount--
    updateAddTagBtn()
    console.log('delted' + tag.textContent)
    tags.delete(tag_text.textContent)
  })

  updateAddTagBtn()
}

addTagButton.addEventListener('click', handleNewTag)

tagInput.addEventListener('keydown', (event) => {
  if(event.key === 'Enter'){
    event.preventDefault()
    handleNewTag()
  } 
})

form.addEventListener('submit', (event) => {
  event.preventDefault();
  tagInput.value = JSON.stringify([...tags]) 
  const formData = new FormData(form);

  for(let [name, value] of formData) console.log(`${name}: ${value}`)
  fetch('../backend/php/events/create_event.php', {
    method: 'POST',
    body: formData
  }).then(response => {
    console.log(response)
  }).catch(error => {
    console.error(error);
  })
})
