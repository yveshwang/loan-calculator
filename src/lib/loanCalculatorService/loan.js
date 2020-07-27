const moment = require("moment");

class Loan {
  constructor(
    amount,
    annualInterestRate,
    years,
    paymentsPerYear,
    AmortizationPlan
  ) {
    this.amount = amount;
    this.annualInterestRate = annualInterestRate;
    this.years = years;
    this.paymentsPerYear = paymentsPerYear;
    this.startDate = moment(new Date()).date(10);
    this.amortizationPlan = new AmortizationPlan(this);
  }
}

module.exports = Loan;
