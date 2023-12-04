function calculateIncomeTax(income) {
    // Define tax brackets and rates for single filer
    const taxBrackets = [
        { start: 0, end: 11000, rate: 0.1 },
        { start: 11001, end: 44725, rate: 0.12 },
        { start: 44726, end: 95375, rate: 0.22 },
        { start: 95376, end: 182100, rate: 0.24 },
        { start: 182101, end: 231250, rate: 0.32 },
        { start: 231251, end: 578125, rate: 0.35 },
        { start: 578126, end: Infinity, rate: 0.37 }
    ];

    // Calculate tax for each bracket
    let totalTax = 0;
    let remainingIncome = income;

    for (const bracket of taxBrackets) {
        const taxableAmount = Math.min(remainingIncome, bracket.end - bracket.start + 1);
        const taxInBracket = taxableAmount * bracket.rate;
        totalTax += taxInBracket;

        remainingIncome -= taxableAmount;

        if (remainingIncome <= 0) {
            break;
        }
    }

    return totalTax;
}

function calculateTax() {
    // Get income from user input
    const incomeInput = document.getElementById("income");
    const income = parseFloat(incomeInput.value);

    // Calculate income tax
    const tax = calculateIncomeTax(income);

    // Calculate effective tax rate
    const effectiveTaxRate = (tax / income) * 100;

    // Calculate net annual income and net monthly income
    const netAnnualIncome = income - tax;
    const netMonthlyIncome = netAnnualIncome / 12;

    // Display results
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
        <p>Total federal taxes paid: ${tax}</p>
        <p>Effective Tax Rate: ${effectiveTaxRate.toFixed(2)}%</p>
        <p>Net Annual Income: ${netAnnualIncome}</p>
        <p>Net Monthly Income: ${netMonthlyIncome}</p>
    `;
}
