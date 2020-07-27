const { LinkedListNode } = require("../../../simpleLinkedList");

function getDateOfPayment(payment) {
  const previousDate =
    payment.previous?.dateOfPayment || payment.loan.startDate;
  const months = 12 / payment.loan.paymentsPerYear;

  return previousDate.clone().add(months, "months");
}

class SeriesLoanPrinciplePayment extends LinkedListNode {
  constructor(loan, repayment, interestRate) {
    super();

    this.loan = loan;
    this.balance = null;
    this.nextBalance = null;
    this.principal = null;
    this.interest = null;
    this.dateOfPayment = null;
    this.repayment = repayment;
    this.interestRate = interestRate;
  }

  init() {
    this.balance = this.previous?.nextBalance || this.loan.amount;
    this.interest = this.balance * this.interestRate;
    this.principal = this.repayment - this.interest;
    this.nextBalance = Math.abs(this.balance - this.principal);
    this.dateOfPayment = getDateOfPayment(this);
  }

  toJSON() {
    const { balance, nextBalance, interest, principal, repayment } = this;

    return {
      balance,
      nextBalance,
      interest,
      principal,
      repayment,
    };
  }
}

module.exports = SeriesLoanPrinciplePayment;
