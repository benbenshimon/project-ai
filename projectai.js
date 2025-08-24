// קבלת הפניות לאלמנטים ב-HTML
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator-keys');
const display = calculator.querySelector('.calculator-screen');

// משתנים לשמירת הנתונים של החישוב
let firstValue = '';
let operator = '';
let secondValue = '';
let result = '';

// הוספת מאזין לאירועי לחיצה על הכפתורים
keys.addEventListener('click', e => {
    // בודק אם האלמנט שנלחץ הוא כפתור
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.value;
        const displayedNum = display.value;

        // טיפול בלחיצה על מספר או נקודה עשרונית
        if (!isNaN(parseFloat(action)) || action === '.') {
            if (operator === '') {
                // הזנת המספר הראשון
                if (action === '.' && displayedNum.includes('.')) return;
                firstValue += action;
                display.value = firstValue;
            } else {
                // הזנת המספר השני
                if (action === '.' && displayedNum.includes('.')) return;
                secondValue += action;
                display.value = secondValue;
            }
        }

        // טיפול בלחיצה על כפתור פעולה (+, -, *, /)
        if (action === '+' || action === '-' || action === '*' || action === '/') {
            if (firstValue !== '' && secondValue === '') {
                // הגדרת הפעולה
                operator = action;
            } else if (firstValue !== '' && secondValue !== '') {
                // חישוב ביניים והכנה לפעולה הבאה
                firstValue = operate(firstValue, secondValue, operator);
                secondValue = '';
                operator = action;
                display.value = firstValue;
            }
        }

        // טיפול בלחיצה על כפתור שווה (=)
        if (action === '=') {
            if (firstValue !== '' && secondValue !== '' && operator !== '') {
                result = operate(firstValue, secondValue, operator);
                display.value = result;
                firstValue = result;
                secondValue = '';
                operator = '';
            }
        }

        // טיפול בלחיצה על כפתור ניקוי (AC)
        if (action === 'all-clear') {
            firstValue = '';
            operator = '';
            secondValue = '';
            result = '';
            display.value = '';
        }
    }
});

/**
 * פונקציה שמבצעת את הפעולה החשבונית
 * @param {string} num1 - המספר הראשון
 * @param {string} num2 - המספר השני
 * @param {string} op - הפעולה החשבונית
 * @returns {number} - תוצאת החישוב
 */
function operate(num1, num2, op) {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    switch (op) {
        case '+':
            return n1 + n2;
        case '-':
            return n1 - n2;
        case '*':
            return n1 * n2;
        case '/':
            // טיפול בחילוק באפס
            if (n2 === 0) {
                return 'שגיאה';
            }
            return n1 / n2;
    }
}