# Copyright (c) 2025, Raindrop and contributors
# For license information, please see license.txt


import frappe
from frappe.model.document import Document
from frappe.utils import now


class DisbursementDetails(Document):
    def on_submit(self):
        self.update_loan()

    def update_loan(self):
        if not self.loan:
            frappe.throw("Loan reference is missing")

        
        loan_doc = frappe.get_doc("Loan Module", self.loan)
        loan_doc.disbursement_amount += self.total_amount
        loan_doc.remaining_amount = loan_doc.disbursement_amount - (loan_doc.paid_amount or 0)

        for d in self.disbursement:
            loan_doc.append("disbursement", {
                "date": d.date,
                "amount": d.amount,
                "due_date": d.due_date
            })
            
        loan_doc.flags.ignore_validate_update_after_submit = True
        loan_doc.save(ignore_permissions=True)
