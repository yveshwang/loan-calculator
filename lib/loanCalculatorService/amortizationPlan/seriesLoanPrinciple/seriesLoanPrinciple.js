const { LinkedList } = require("../../../simpleLinkedList");
const Payment = require("./seriesLoanPrinciplePayment");

class SeriesLoanPrinciple extends LinkedList {
  constructor(loan) {
    super();

    this.loan = loan;
    this.interestRate = loan.annualInterestRate / 100 / loan.paymentsPerYear;
    this.repaymentsCount = loan.years * loan.paymentsPerYear;
    this.repayment =
      loan.amount *
      (this.interestRate +
        this.interestRate /
          (Math.pow(1 + this.interestRate, this.repaymentsCount) - 1));

    for (let i = 1; i <= this.repaymentsCount; i++) {
      const payment = new Payment(this.loan, this.repayment, this.interestRate);

      this.add(payment);
      payment.init();
    }
  }

  getPayments() {
    const result = [];

    this.each((payment) => {
      result.push(payment);
    });

    return result;
  }

  getTotalInterest() {
    let totalInterest = 0;

    this.each((payment) => {
      totalInterest += payment.interest;
    });

    return totalInterest;
  }
}

module.exports = SeriesLoanPrinciple;
