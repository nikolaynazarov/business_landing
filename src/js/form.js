const formContainer = document.querySelector('.form-container');
const form = document.querySelector('.form');
const formInputs = document.querySelectorAll('.form__input');
const closeFormButton = document.querySelector('.form__close-button');

const onClose = () => {
  closeForm();
  closeFormButton.removeEventListener('click', onClose);
};

const closeForm = () => {
  formContainer.classList.add('is-hidden');
};

const openForm = () => {
  formContainer.classList.remove('is-hidden');
  closeFormButton.addEventListener('click', onClose);
}

const formSubmit = () => {
  const message = document.createElement('p');
  
  message.classList.add('form__message');
  message.textContent = 'Thank you for the application. Our manager will contact you soon';

  form.appendChild(message);

  formInputs.forEach((input) => {
    input.value = '';
  });
  
  setTimeout(() => {
    form.removeChild(document.querySelector('.form__message'));
  }, 5000);
};