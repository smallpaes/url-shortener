const urlForm = document.querySelector('form')
const urlResult = document.getElementById('url-result')

function copyUrl() {
  var copyText = document.getElementById("result");
  copyText.select();
  document.execCommand("copy");
}

urlForm.addEventListener('submit', event => {
  event.preventDefault()
  const inputUrl = urlForm.querySelector('[name="url"]').value

  fetch(`http://localhost:3000/convert?url=${inputUrl}`)
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

