const textArea = document.getElementById("textArea")
const section = document.getElementById('section')
const entryNumberDiv = document.getElementById("entryNumbers")
const submitBtn = document.getElementById("form")
const body = document.getElementById("body")
let count = 0

const inputDiv = document.createElement("div")
inputDiv.classList.add("inputDiv")
body.prepend(inputDiv)

const textInput = document.createElement("input")
textInput.classList.add("input")
inputDiv.prepend(textInput)

let inputAttribute = document.createAttribute("placeholder")
inputAttribute.value = "Type Your Name Here"
textInput.setAttributeNode(inputAttribute)
let inputAttribute2 = document.createAttribute("type")
inputAttribute2.value = "text"
textInput.setAttributeNode(inputAttribute2)

const inputBtn = document.createElement("button")
inputBtn.classList.add("inputBtn")
inputBtn.innerText = ("Enter")
inputDiv.append(inputBtn)

const my = document.getElementById("my")

function loadName(e) {
    if (textInput.value !== "" && (e.keyCode === 13 || e.type === 'click')) {
        let name = textInput.value
        my.textContent = (name.toLocaleUpperCase() + "'s ")
        body.removeChild(inputDiv)
    }
    localStorage.setItem('usersName', textInput.value);
}
inputBtn.addEventListener("click", loadName)
textInput.addEventListener("keydown", loadName)

var savedName = localStorage.getItem('usersName');

if (savedName) {
    my.textContent = (savedName.toLocaleUpperCase() + "'s ");
    body.removeChild(inputDiv)
}

let allEntryNumbers = document.querySelectorAll(".entryNumber")
function loadBtns() {
    console.log(allEntryNumbers.length)
    console.log("even")

    for (let index = 0; index < allEntryNumbers.length; index++) {
        localStorage.setItem(("entryNum" + count), allEntryNumbers[index].innerHTML)
    }
}
var savedEntryNum = localStorage.getItem("entryNum" + count)
console.log(savedEntryNum)

function submitBtnClick(event) {
    count += 1;
    event.preventDefault();
    const textOutput = document.createElement("div");
    textOutput.className = "textOutput";
    textOutput.innerHTML = "<p>" + textArea.value + "</p>";
    textOutput.style.display = "none";
    section.appendChild(textOutput);


    localStorage.setItem(('entry' + count), textArea.value);

    textArea.value = "";

    const entryNumber = document.createElement('button');
    entryNumber.classList.add("entryNumber");
    entryNumber.innerText = count;
    entryNumberDiv.appendChild(entryNumber);

    const dltBtn = document.createElement("button")
    dltBtn.className = "dlt-btn"
    dltBtn.innerText = ("Delete " + count)
    textOutput.prepend(dltBtn)


    dltBtn.addEventListener("click", function () {
        section.removeChild(textOutput)
        entryNumberDiv.removeChild(entryNumber)
    })

    entryNumber.addEventListener('click', function () {
        const allEntries = document.querySelectorAll(".textOutput");
        let curDisplay = textOutput.style.display;

        for (let i = 0; i < allEntries.length; i++) {
            allEntries[i].style.display = "none";
        }

        textOutput.style.display = curDisplay === "none" ? "block" : "none";

        for (let i = 0; i < allEntries.length; i++) {

            const activeStyle = document.querySelectorAll(".entryNumber")

            if (allEntries[i].style.display === "none") {
                activeStyle[i].classList.remove("active")
            }
            else if (allEntries[i].style.display === "block") {
                activeStyle[i].classList.add("active")
            }
        }
        
    })
    loadBtns();
}

submitBtn.addEventListener("submit", submitBtnClick)
