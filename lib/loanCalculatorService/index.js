const AmortizationPlan = require("./amortizationPlan");
const Loan = require("./loan");

module.exports.Loan = Loan;

module.exports.CreateMortgageLoan = (amount, years) =>
  new Loan(amount, 3.5, years, 12, AmortizationPlan.SeriesLoanPrinciple);
