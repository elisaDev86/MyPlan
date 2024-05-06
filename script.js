document.addEventListener('DOMContentLoaded', function () {
    loadGoals('annual');
    loadGoals('monthly');
    loadGoals('weekly');
    loadGoals('daily');
});

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

function addGoal(tabName) {
    var input, inputValue, ul, li;
    input = document.getElementById(tabName + "Input");
    inputValue = input.value;
    if (inputValue === '') {
        alert("Please enter a goal");
    } else {
        ul = document.getElementById(tabName + "List");
        li = document.createElement("li");
        li.textContent = inputValue;
        li.onclick = function () {
            this.classList.toggle('checked');
            saveGoals(tabName);
        };
        ul.appendChild(li);
        input.value = '';
        saveGoals(tabName);
    }
}

function saveGoals(tabName) {
    var goals = [];
    var list = document.getElementById(tabName + "List");
    var items = list.getElementsByTagName("li");
    for (var i = 0; i < items.length; i++) {
        if (!items[i].classList.contains('checked')) {
            goals.push(items[i].textContent);
        }
    }
    localStorage.setItem(tabName + "Goals", JSON.stringify(goals));
}

function loadGoals(tabName) {
    var goals = JSON.parse(localStorage.getItem(tabName + "Goals"));
    if (goals) {
        var ul = document.getElementById(tabName + "List");
        ul.innerHTML = ""; // Pulisce la lista corrente prima di aggiungere i goal salvati
        goals.forEach(function (goal) {
            var li = document.createElement("li");
            li.textContent = goal;
            li.onclick = function () {
                this.classList.toggle('checked');
                saveGoals(tabName);
            };
            ul.appendChild(li);
        });
    }
}

// Funzione per eliminare un goal
function deleteGoal(tabName) {
    var ul = document.getElementById(tabName + "List");
    var items = ul.getElementsByTagName("li");
    for (var i = 0; i < items.length; i++) {
        if (items[i].classList.contains('checked')) {
            ul.removeChild(items[i]); // Rimuove il goal dalla lista
            saveGoals(tabName); // Salva l'aggiornamento in locale
        }
    }
}
