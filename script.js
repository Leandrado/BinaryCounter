//Bits Control
const numberOfBitsGroupsInput = document.getElementById("numberOfBits")
var numberOfBitsGroups = numberOfBitsGroupsInput.value
var numberOfBits = numberOfBitsGroups * 4

//Limit of 1-6 bits (0 is available for better UX)
let limitOfBits = 6 //You can change that number, but the responsibility may be broken.
numberOfBitsGroupsInput.setAttribute("oninput", "if(value < 0) value = 1; if(value > limitOfBits) value = limitOfBits; \
    this.value = Math.floor(this.value); defineNumberOfGroupBits()")
    
const numberBase10 = document.getElementById("numberbase10")

//Functions
function AddNumber() {
    let num = numberBase10.value
    num = parseInt(num)

    if (num < 2**(numberOfBits)-1) {
        num++
    }

    numberBase10.value = num

    updateBinaryValues()
}

function retBtn() {
    let num = numberBase10.value
    num = parseInt(num)

    if (num > 0) {
        num--
    }

    numberBase10.value = num

    updateBinaryValues()
}

function updateBinaryValues() {
    let tempNumber = numberBase10.value
    for (i = numberOfBits; i > 0; i--) {
        if (tempNumber - 2**(i -1) >= 0) {
            document.getElementById(`bit${i}`).value = 1
            tempNumber -= 2**(i - 1)
        }
        else {
            document.getElementById(`bit${i}`).value = 0
        }
    }
}

function updateNumberValue(){ 
    let soma = 0
    for (i = 1; i < numberOfBits + 1; i++) {
        if (document.getElementById(`bit${i}`).value == 1) {
            soma += 2**(i - 1)
        }
    }
    numberBase10.value = soma
}

function defineNumberOfGroupBits() {
    let counters = document.getElementById("counters")
    counters.innerHTML = ""

    numberOfBitsGroups = numberOfBitsGroupsInput.value
    numberOfBits = numberOfBitsGroups * 4

    for (i = numberOfBitsGroups; i >= 1; i--) {
        let bitsGroup = document.createElement("div")
        bitsGroup.classList.add("bitsGroup")
        
        for (j = 4; j >= 1; j--) {
            let bits = document.createElement("input")
            bits.type = "number"
            bits.classList.add("bits")
            bits.id = `bit${((i - 1) * 4) + j}` //Add a Id in decreasy order
            bits.setAttribute("oninput", `if(value > 1) value = 1; if(value < 0) value = 0; \
                this.value = Math.floor(this.value); updateNumberValue()`)
            bitsGroup.appendChild(bits)
        }
        counters.appendChild(bitsGroup)
    }
    
    numberBase10.setAttribute("oninput", `if(value > ${2**numberOfBits - 1}) value = ${2**numberOfBits - 1}; \
    if(value < 0) value = 0; this.value = Math.floor(this.value); updateBinaryValues() `)

    updateBinaryValues() //To save the bits that are left over
    updateNumberValue() //To save the number
}

//Initial execution functions
defineNumberOfGroupBits()
updateBinaryValues()