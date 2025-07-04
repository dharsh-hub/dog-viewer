/* ----- Shared helpers -------------------------------------------------- */
const spinner = '<div class="spinner"></div>';
const breedSelect   = document.getElementById('breedSelect');
const breedSearch   = document.getElementById('breedSearch');
const imageContainer= document.getElementById('imageContainer');
const getImageBtn   = document.getElementById('getImageBtn');

function showSpinner() { imageContainer.innerHTML = spinner; }

/* ----- Load breeds once ------------------------------------------------- */
async function loadBreeds() {
  showSpinner();
  const res = await fetch('https://dog.ceo/api/breeds/list/all');
  const breeds = Object.keys((await res.json()).message);
  breedSelect.innerHTML = breeds.map(b => `<option value="${b}">${b}</option>`).join('');
  imageContainer.innerHTML = '';
}
loadBreeds();

/* ----- Live‑filter search ---------------------------------------------- */
breedSearch.addEventListener('input', () => {
  const q = breedSearch.value.toLowerCase();
  [...breedSelect.options].forEach(o => o.style.display = o.value.includes(q) ? '' : 'none');
});

/* ----- Fetch image ------------------------------------------------------ */
async function fetchImage() {
  const breed = breedSelect.value;
  if (!breed) return;
  showSpinner();
  const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
  imageContainer.innerHTML = `<img src="${(await res.json()).message}" alt="${breed} dog">`;
}
getImageBtn.addEventListener('click', fetchImage);
