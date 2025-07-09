// Utility function to get element value and parse it
function getValue(id, parseFunc = parseFloat) {
    const element = document.getElementById(id);
    if (!element) return 0;
    const value = element.value;
    return parseFunc(value) || 0;
}

// Shared output container and currency symbol

const currencySymbol = '₹';

// EMI Calculator
function calculateEMI() {
    const loanAmount = getValue("loanAmount");
    const interestRate = getValue("interestRate") / 12 / 100;
    const loanTenure = getValue("loanTenure", parseInt);
    const obj = document.getElementById("emiResult");

    if (loanAmount && interestRate && loanTenure) {
        const emi = (loanAmount * interestRate * Math.pow(1 + interestRate, loanTenure)) /
                    (Math.pow(1 + interestRate, loanTenure) - 1);
        obj.innerText = `${currencySymbol}${Math.round(emi)}`;
    } else {
        alert("Please enter all required values for EMI calculation.");
    }
}

// SIP Calculator with Chart
function calculateSIP() {
    const monthlyInvestment = getValue("monthlyInvestment");
    const returnRate = getValue("returnRate") / 12 / 100;
    const investmentDuration = getValue("investmentDuration", parseInt) * 12;
    const obj = document.getElementById("sipResult");

    if (monthlyInvestment && returnRate && investmentDuration) {
        const futureValue = monthlyInvestment * (Math.pow(1 + returnRate, investmentDuration) - 1) * (1 + returnRate);
        obj.innerText = `${currencySymbol}${Math.round(futureValue)}`;
        renderSIPChart(futureValue, investmentDuration);
    } else {
        alert("Please enter all required values for SIP calculation.");
    }
}

// Render SIP Projection Chart
function renderSIPChart(futureValue, investmentDuration) {
    const ctx = document.getElementById('sipChart');
    if (!ctx) return;

    const years = investmentDuration / 12;
    const labels = Array.from({ length: years }, (_, i) => `Year ${i + 1}`);
    const values = Array.from({ length: years }, (_, i) => Math.round(futureValue * ((i + 1) / years)));

    new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Projected Value',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Retirement Savings Calculator
function calculateRetirement() {
    const currentAge = getValue("currentAge", parseInt);
    const retirementAge = getValue("retirementAge", parseInt);
    const monthlyExpenses = getValue("monthlyExpenses");
    const inflationRate = getValue("inflationRate") / 100;
    const obj = document.getElementById("retirementResult");

    if (currentAge && retirementAge && monthlyExpenses && inflationRate) {
        const yearsToRetirement = retirementAge - currentAge;
        const futureMonthlyExpenses = monthlyExpenses * Math.pow(1 + inflationRate, yearsToRetirement);
        const retirementCorpus = futureMonthlyExpenses * 12 * (80 - retirementAge); // Assuming life expectancy = 80
        obj.innerText = `${currencySymbol}${Math.round(retirementCorpus)}`;
    } else {
        alert("Please enter all required values for retirement calculation.");
    }
}
