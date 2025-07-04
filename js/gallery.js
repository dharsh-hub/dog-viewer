const spinner = '<div class="spinner"></div>';
const breedSelect = document.getElementById('breedSelect');
const gallery      = document.getElementById('gallery');
const loadBtn      = document.getElementById('loadBtn');

async function loadBreeds() {
  gallery.innerHTML = spinner;
  const res = await fetch('https://dog.ceo/api/breeds/list/all');
  const breeds = Object.keys((await res.json()).message);
  breedSelect.innerHTML = breeds.map(b => `<option value="${b}">${b}</option>`).join('');
  gallery.innerHTML = '';
}
loadBreeds();

async function loadGallery() {
  const breed = breedSelect.value;
  if (!breed) return;
  gallery.innerHTML = spinner;
  const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/9`);
  const imgs = (await res.json()).message;
  gallery.innerHTML = imgs.map(url => `<img src="${url}" alt="">`).join('');
}
loadBtn.addEventListener('click', loadGallery);
