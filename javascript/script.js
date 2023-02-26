const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");

const btn = document.getElementById("searchBtn");

btn.addEventListener("click", () => {
  let inputWord = document.getElementById("inputWord").value;
  fetch(`${url}${inputWord}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      result.innerHTML = `
      <!-- Word -->
          <div class="flex justify-between mt-20">
            <h3 class="text-3xl text-blue-900">${inputWord}</h3>
            <button onclick="playSound()" class="bg-tran border-none">
              <img class="" src="/images/audio.svg" alt="" />
            </button>
          </div>
          <!-- Details -->
          <div class="flex gap-10 text-gray-600 mt-1.5 mb-5 text-2xl">
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>/${data[0].phonetic}/</p>
          </div>
          <!-- Word Meaning -->
          <p class="text-gray-700">
            ${data[0].meanings[0].definitions[0].definition}
          </p>
          <!-- Word Example -->
          <p class="text-gray-700 pl-5 border-l-2 italic mt-8">
            ${data[0].meanings[0].definitions[0].example || ""}
          </p>`;
      sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
    });
});

function playSound() {
  sound.play();
}
