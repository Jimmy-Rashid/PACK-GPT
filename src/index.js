const messageBox = document.getElementById('messageBox');
const triggerButton = document.getElementById('triggerButton');
const slideUpModal = document.getElementById('slideUpModal');

triggerButton.addEventListener('click', () => {
    localStorage.setItem('query', messageBox.value);
    // console.log(localStorage.getItem('query'));
});
