let lcd = null; // Display-elementet
let memory = 0; // Tidigare värde
let arithmetic = null; // Operator (+, -, *, /)
let isComma = false; // Kontroll för decimaltecken
let isNewInput = true; // För att rensa display efter operator

function init() {
    lcd = document.getElementById('lcd');
    let keyBoard = document.getElementById('keyBoard');
    keyBoard.onclick = buttonClick;
}

function buttonClick(e) {
    let btn = e.target.id;

    // Ignorera om något annat än knappen klickas
    if (!btn) return;

    if (btn.startsWith('b')) {
        let digit = btn.substring(1);
        addDigit(digit);
    } else {
        switch (btn) {
            case 'comma':
                addComma();
                break;
            case 'add':
                setOperator('+');
                clearLCD() 
                break;
            case 'sub':
                setOperator('-');
                clearLCD() 
                break;
            case 'mul':
                setOperator('*');
                clearLCD() 
                break;
            case 'div':
                setOperator('/');
                clearLCD() 
                break;
            case 'enter':
                calculate();
                break;
            case 'clear':
                memClear();
                break;
        }
    }
}

function addDigit(digit) {
    if (isNewInput) {
        lcd.value = digit;
        isNewInput = false;
    } else {
        lcd.value += digit;
    }
}

function addComma() {
    if (!isComma) {
        if (isNewInput || lcd.value === '') {
            lcd.value = '0,';
            isNewInput = false;
        } else {
            lcd.value += ',';
        }
        isComma = true;
    }
}

function setOperator(operator) {
    if (lcd.value === '') return;

    // Spara aktuellt värde (byt , mot . för decimalhantering)
    memory = parseFloat(lcd.value.replace(',', '.'));
    arithmetic = operator;
    isNewInput = true;
    isComma = false;
}

function calculate() {
    if (arithmetic === null || isNewInput) return;

    let current = parseFloat(lcd.value.replace(',', '.'));
    let result = 0;

    switch (arithmetic) {
        case '+':
            result = memory + current;
            break;
        case '-':
            result = memory - current;
            break;
        case '*':
            result = memory * current;
            break;
        case '/':
            result = current !== 0 ? memory / current : 'Error';
            break;
    }

    // Visa resultat (byt tillbaka till , för visning)
    lcd.value = (typeof result === "number" ? result.toString().replace('.', ',') : result);
    isComma = lcd.value.includes(',');
    arithmetic = null;
    isNewInput = true;
}

function clearLCD() {
    lcd.value = '';
    isComma = false;
}

function memClear() {
    memory = 0;
    arithmetic = null;
    clearLCD();
}

window.onload = init;