document.getElementById('toggleMenu').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

function searchWord() {
    let word = document.getElementById("wordInput").value.trim();

    if (!word) {
        alert("Please enter a word!");
        return;
    }

    let apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            if (data.title) {
                document.getElementById("result").innerHTML = `<p>Word not found!</p>`;
                return;
            }

            let entry = data[0];
            let meaning = entry.meanings[0]?.definitions[0]?.definition || "No definition available.";
            let phonetics = entry.phonetics.find(p => p.text)?.text || "No phonetics available.";
            let audio = entry.phonetics.find(p => p.audio)?.audio || null;

            document.getElementById("result").innerHTML = `
                <h2>${word}</h2>
                <p><strong>Phonetics:</strong> ${phonetics}</p>
                <p><strong>Meaning:</strong> ${meaning}</p>
                ${audio ? `<audio controls><source src="${audio}" type="audio/mpeg">Your browser does not support audio.</audio>` : ""}
            `;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("result").innerHTML = `<p>Something went wrong. Try again!</p>`;
        });
}
