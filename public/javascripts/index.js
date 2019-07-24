const urlForm = document.querySelector('form')
const urlResult = document.getElementById('url-result')
const inputUrl = urlForm.querySelector('[name="url"]')
const resetBtn = document.getElementById('reset')

function copyUrl() {
  var copyText = document.getElementById("result");
  copyText.select();
  document.execCommand("copy");
}

function handleAnimationEnd(event) {
  return event.target.classList.remove('animated', 'bounceIn')
}

urlForm.addEventListener('submit', event => {

  event.preventDefault()
  urlForm.classList.add('was-validated')
  if (!inputUrl.checkValidity()) { return }
  fetch(`${window.location.href}convert?url=${inputUrl.value}`)
    .then(data => {
      return data.json()
    })
    .then(shortenedUrl => {
      urlResult.classList.remove('d-none')
      urlResult.classList.add('animated', 'bounceIn')
      urlResult.addEventListener('animationend', handleAnimationEnd)
      urlResult.querySelector('[name="result"]').value = `${window.location.href}${shortenedUrl.url}`

      // add event listener to copy button
      document.getElementById('copy-btn').addEventListener('click', copyUrl)
    })
})

resetBtn.addEventListener('click', event => {
  // clear user input column
  inputUrl.value = ''
  // clear url result column
  urlResult.querySelector('[name="result"]').value = ''
  // reset the form
  urlResult.classList.add('d-none')
  urlForm.classList.remove('was-validated')
  // add animation to input 
  inputUrl.classList.add('animated', 'bounceIn')
  inputUrl.addEventListener('animationend', handleAnimationEnd)
})

