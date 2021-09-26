console.log('Client Side Javascript file is Loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = 'From Javascript';

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = 'Loading Weather information';
  messageTwo.textContent = '';

  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = '';
        messageTwo.textContent = data.error;
      } else {
        messageTwo.textContent = '';
        messageOne.textContent = data.location + ' ' + data.forecast;
      }
    });
  });
});
