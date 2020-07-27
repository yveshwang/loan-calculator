const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const { checkSchema, validationResult } = require("express-validator");

const { CreateMortgageLoan } = require("../lib/loanCalculatorService");

function mortgage(req, res, next) {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return next(createError(400));
  }

  const { amount, years } = req.query;
  const loan = CreateMortgageLoan(amount, years);

  res.render("amortizationPlan", {
    title: "Amortization Plan",
    loan: loan,
  });
}

router.get(
  "/",
  checkSchema({
    amount: { in: ["query"], isInt: true, toInt: true },
    years: { in: ["query"], isInt: true, toInt: true },
  }),
  mortgage
);

module.exports = router;
