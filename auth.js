const tabs = document.querySelectorAll('.auth-tab');
const switchLinks = document.querySelectorAll('[data-switch]');
const form = document.querySelector('#auth-form');
const title = document.querySelector('#form-title');
const subtitle = document.querySelector('#form-subtitle');
const submitLabel = document.querySelector('#submit-label');
const note = document.querySelector('#auth-note');
const status = document.querySelector('.form-status');
const signupFields = document.querySelectorAll('.signup-only');
let mode = 'signin';

function setMode(nextMode) {
  mode = nextMode;
  const isSignup = mode === 'signup';
  tabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.mode === mode));
  signupFields.forEach((field) => {
    field.hidden = !isSignup;
    const input = field.querySelector('input');
    input.required = isSignup;
  });
  title.textContent = isSignup ? 'Join JoshKidz' : 'Welcome back';
  subtitle.textContent = isSignup ? 'Create an account and stay close to the work.' : 'Sign in to stay connected with JoshKidz.';
  submitLabel.textContent = isSignup ? 'Create account' : 'Sign in';
  note.innerHTML = isSignup ? 'Already have an account? <a href="#" data-switch="signin">Sign in</a>' : 'New to JoshKidz? <a href="#" data-switch="signup">Create an account</a>';
  note.querySelector('[data-switch]').addEventListener('click', (event) => {
    event.preventDefault();
    setMode(event.currentTarget.dataset.switch);
  });
  status.style.display = 'none';
}

tabs.forEach((tab) => tab.addEventListener('click', () => setMode(tab.dataset.mode)));
switchLinks.forEach((link) => link.addEventListener('click', (event) => {
  event.preventDefault();
  setMode(link.dataset.switch);
}));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  if (mode === 'signup' && data.get('password') !== data.get('confirm')) {
    status.textContent = 'Passwords do not match. Please check them and try again.';
    status.style.display = 'block';
    return;
  }
  status.textContent = mode === 'signup' ? 'Your account form is ready. Connect this page to your member system to finish registration.' : 'Your sign-in form is ready. Connect this page to your member system to authenticate users.';
  status.style.display = 'block';
});