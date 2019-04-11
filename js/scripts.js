// Keeps input label at top if it has any content
const inputs = document.querySelectorAll('.input-field')

function checkInput(input) {
  input.value.length > 0
  ? input.parentNode.classList.add('filled')
  : input.parentNode.classList.remove('filled')

  if (input.value.length > 0 && input.parentNode.classList.contains('has-error')) {
    const errorMessage = input.parentNode.querySelector('span')
    input.parentNode.classList.remove('has-error')
    input.parentNode.removeChild(errorMessage)
  }
}

inputs.forEach(input => {
  // Fixes input label in case of a refresh
  checkInput(input)
  input.addEventListener('input', function() {
    checkInput(input)
  })
})

// Allow only numbers on the number input
const numberInput = document.getElementById('number')

numberInput.addEventListener('input', function() {
  let value = numberInput.value
  const length = value.length
  // Convert input value into an array
  const valueArray = value.split('')
  // Regex test if the last array index is a number
  if (/^[0-9]*$/.test(valueArray[length - 1])) {
    value = valueArray.join('')
  } else {
    valueArray.pop()
    value = valueArray.join('')
  }
  numberInput.value = value
})

// Simplified validation function
// Checking only for required First and Last name
function validateForm() {
  const requiredInputs = document.querySelectorAll('.isRequired')
  let isValid = true
  requiredInputs.forEach(input => {
    if (input.value.length === 0) {
      if (!input.parentNode.classList.contains('has-error')) {
        const errorNode = document.createElement('span')
        errorNode.innerHTML = 'This field is required'
        input.parentNode.appendChild(errorNode)
      }
      input.parentNode.classList.add('has-error')

      isValid = false
    }
  })
  return isValid
}

// Form next step
const nextButton = document.querySelector('.btn-next')

nextButton.addEventListener('click', function(e) {
  e.preventDefault()
  if (validateForm()) {
    document.querySelector('.status__bar').classList.add('completed')
    document.querySelector('.status__text').innerHTML = '100%'
    alert('Next Step success! Status bar is updated!')
  }
})
