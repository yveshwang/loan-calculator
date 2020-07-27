const Loan = require("../../../loan");
const SeriesLoanPrinciple = require("../seriesLoanPrinciple");

describe("Amortization Plan: Series Loan Principle", () => {
  const loan = new Loan(3000, 5, 1, 12, SeriesLoanPrinciple);

  it("should generate monthly payback plan", () => {
    expect(loan.amortizationPlan.getPayments()).toHaveLength(12);
  });

  it("should have equal payback amount for each month", () => {
    expect(
      Array.from(
        new Set(loan.amortizationPlan.getPayments().map((p) => p.repayment))
      )
    ).toHaveLength(1);
  });

  it("should calculate interest foreach month based on remaining balance", () => {
    expect(
      Array.from(
        new Set(loan.amortizationPlan.getPayments().map((p) => p.interest))
      )
    ).toHaveLength(12);
  });

  it("should return amount of the interest and principal", () => {
    loan.amortizationPlan.getPayments().forEach((payment) => {
      expect(payment).toHaveProperty("interest");
      expect(payment).toHaveProperty("principal");
      expect(payment.interest + payment.principal).toBe(payment.repayment);
    });
  });

  it("should return loan balance", () => {
    const payments = loan.amortizationPlan.getPayments();

    expect(payments[0].balance).toBe(loan.amount);
    expect(Math.floor(payments[payments.length - 1].nextBalance)).toBe(0);
  });
});
