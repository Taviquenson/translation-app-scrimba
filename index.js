import{ askgpt } from './netlify/functions/askgpt.js'

const toggleBtn = document.getElementById("toggle-btn");
const queryEl = document.getElementById("input");
const languagesEl = document.getElementById("languages");
const outputEl = document.getElementById("output");
const secondTitle = document.getElementById("second-title");

// Initial state
let isTranslate = true;
outputEl.classList.toggle("hidden");

toggleBtn.addEventListener("click", async () => {
    if (isTranslate) {
        await translate();
    } else {
        startOver();
    }
});

const translate = async function() {
    // Using optional chaining operator (?.) to prevent errors if no radio button is selected.
    const language = document.querySelector('input[name="choice-radios"]:checked')?.value;
    // console.log("query value:", `'${queryEl.value}'`)
    if (language && queryEl.value) {
        const response = await askgpt(queryEl.value, language);
        const data = await response.json();
        outputEl.value = data.content;
        toggleBtn.textContent = 'Start Over';
        isTranslate = !isTranslate;
        languagesEl.classList.toggle("hidden");
        outputEl.classList.toggle("hidden");
        secondTitle.textContent = "Your translation 👇";
    }
}

const startOver = function() {
    toggleBtn.textContent = 'Translate';
    queryEl.value = '';
    const radios = document.querySelectorAll('input[name="choice-radios"]');
    radios.forEach(radio => {
        radio.checked = false;
    })
    isTranslate = !isTranslate;
    languagesEl.classList.toggle("hidden");
    outputEl.classList.toggle("hidden");
    secondTitle.textContent = "Select language 👇";
}
