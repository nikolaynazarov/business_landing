document.addEventListener('DOMContentLoaded', () => {
  const openFormButton = document.querySelector('.btn-down');
  
  if(openFormButton) {
    openFormButton.addEventListener('click', () => {
      openForm();
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formSubmit();

    setTimeout(() => {
      closeForm();
    }, 5000);
  })

  smoothScroll();
});