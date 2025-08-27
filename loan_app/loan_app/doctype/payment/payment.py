# Copyright (c) 2025, Raindrop and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Payment(Document):
    def on_submit(self):
        self.update_loan_payment()

    def update_loan_payment(self):
        if not self.loan:
            frappe.throw("Loan reference is missing")

        loan_doc = frappe.get_doc("Loan Module", self.loan)
        loan_doc.paid_amount += self.total_paid_amount
        loan_doc.remaining_amount = (loan_doc.disbursement_amount or 0) - loan_doc.paid_amount

        for p in self.payment_details:
            loan_doc.append("payment_details", {
                "date": p.date,
                "principal": p.principal,
                "interest": p.interest,
                "other_charges": p.other_charges,
                "total_payment": p.total_payment
            })

      
        loan_doc.flags.ignore_validate_update_after_submit = True
        loan_doc.save(ignore_permissions=True)
