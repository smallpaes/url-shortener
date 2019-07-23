const urlForm = document.querySelector('form')
const urlResult = document.getElementById('url-result')
const inputUrl = urlForm.querySelector('[name="url"]')
const resetBtn = document.getElementById('reset')

function copyUrl() {
  var copyText = document.getElementById("result");
  copyText.select();
  document.execCommand("copy");
}

urlForm.addEventListener('submit', event => {
  event.preventDefault()

  fetch(`http://localhost:3000/convert?url=${inputUrl.value}`)
    .then(data => {
      return data.json()
    })
    .then(shortenedUrl => {
      urlResult.classList.remove('d-none')
      urlResult.querySelector('[name="result"]').value = `http://localhost:3000/${shortenedUrl.url}`

      // add event listener to copy button
      document.getElementById('copy-btn').addEventListener('click', copyUrl)
    })
})

resetBtn.addEventListener('click', event => {
  // clear user input column
  inputUrl.value = ''
  // clear url result column
  urlResult.querySelector('[name="result"]').value = ''
})