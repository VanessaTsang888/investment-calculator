// data - value made-up of all the below info:
// initial amount
// annual contribution
// expected return
// duration

// Defined a custom object type with this shape - the identifier and its type within a set of braces.
// We are working with numbers since we are calculating some investment amount.
type InvestmentData = {
  initialAmount: number;
  annualContribution: number;
  expectedReturn: number;
  duration: number;
};

// Since the output is an Array of results `result[]` we need a type for this and we
// can call it `InvestmentResult`. The `year` identifier should be of type string.
type InvestmentResult = {
  year: string;
  totalAmount: number;
  totalContributions: number;
  totalInterestEarned: number;
};

// Union Type as we want to return either a string (error cases) or an Array of `InvestmentResult[]`.
type CalculationResult = InvestmentResult[] | string;

// Func should yield an Array of such `InvestmentResult` objects.
// An Array of results (i.e. objects where each result describes 1 year) from different years.
function calculateInvestment(data: InvestmentData): CalculationResult {
  const { initialAmount, annualContribution, expectedReturn, duration } = data;
  // Error cases: If user input data is invalid, we want to catch that
  // and logout an error msg since we don't want to calculate liabilities.
  if (initialAmount < 0) {
    return 'Initial investment amount must be at least zero.';
  }

  if (duration <= 0) {
    return 'No valid amount of years provided.';
  }

  if (expectedReturn < 0) {
    return 'Expected return must be at least zero.';
  }

  // Perform actual calculations were we obtain the different pieces of info for every year.
  let total = initialAmount;
  let totalContributions = 0;
  let totalInterestEarned = 0;

  // Annual restults is an Array full of investment result objects so we can assign the
  // `InvestmentResult` type to this variable. Initially it will be an empty Array.
  const annualResults: InvestmentResult[] = [];

  // These calculations should be performed at the end of every year.
  // Only if the condition inside of loop is true, execute the code in the body within the braces.
  for (let i = 0; i < duration; i++) {
    total = total * (1 + expectedReturn);
    totalInterestEarned = total - totalContributions - initialAmount;
    totalContributions = totalContributions + annualContribution;
    total = total + annualContribution;

    // Save data (inside for-loop) for this year in this Array. Continue with the next iteration of this
    //  for-loop and therefore with the next year. Push new value into this Array which should be an object
    // that describes our custom type `InvestmentResult`.
    annualResults.push({
      year: `Year ${i + 1}`,
      totalAmount: total,
      totalInterestEarned, // Javascript shortcut syntax: name of key is same as name of variable.
      totalContributions, // As above for `totalInterestEarned`
    });
  }

  // After each loop, return our annual results. With this return statement we are either returning
  //  a string (err cases) or an Array of investment results `InvestmentResult[]`
  return annualResults;
}

// Output the results within the `calculateInvestment()` func within this print results func.
// Reuse `CalculationResult` data type for results param.
// Check if `results` is a string - err msg. If so, logout the `results` before return.
function printResults(results: CalculationResult) {
  if (typeof results === 'string') {
    console.log(results);
    return;
  }

  // Loop through all our year end results and output info for every year to the terminal.
  for (const yearEndResult of results) {
    console.log(yearEndResult.year);
    console.log(`Total: ${yearEndResult.totalAmount.toFixed(0)}`);
    console.log(
      `Total Contributions: ${yearEndResult.totalContributions.toFixed(0)}`
    );
    console.log(
      `Total Interest Earned: ${yearEndResult.totalInterestEarned.toFixed(0)}`
    );
    console.log('----------------------');
  }
}

// Use the `investmentData` variable that has the shape of `investmentData` type to calculate our investment results.
// This is the shape of the data object named investment data we want to pass into `calculateInvestment()` func below,
// and store in `results` variable below.
// To use this app we need to add our input data for these four properties such as the initial amount
// which I have already set to 5000.
const investmentData: InvestmentData = {
  initialAmount: 5000,
  annualContribution: 500,
  expectedReturn: 0.08, // 8%
  duration: 10, // number of years
};

// Call the func with the `investmentData` passed as an argument (as a value), to calculate our investment/to get back our results (left).
// Results variable should yield some results which are of type `CalculationResult` ...
const results = calculateInvestment(investmentData);

// output our results with this print results func - print results to the terminal.
printResults(results);
