// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }

import Notiflix from 'notiflix';

const FormEl = document.querySelector('.form');
FormEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const firstDelay = Number(form.elements.delay.value);
  const delayStep = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);
  
  for (let i = 0; i < amount; i += 1) {
    const delay = firstDelay + i*delayStep;
    const position = i + 1;

  createPromise(position, delay)
  .then(fulfilledPromise)
  .catch(rejectedPromise)
  .finally(() => form.reset());
  }
}

function createPromise(position, delay) {
  
    return new Promise ((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay })
        } else {
          reject({ position, delay })
        }
      }, delay)
    })
}

function fulfilledPromise({position, delay}) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function rejectedPromise({position, delay}) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

