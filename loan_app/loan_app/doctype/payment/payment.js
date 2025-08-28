// // Copyright (c) 2025, Raindrop and contributors
// For license information, please see license.txt

frappe.ui.form.on("Payment", {
    refresh(frm) {
        frm.add_custom_button(__('Journal Entry'), function() {
            frappe.new_doc('Journal Entry', {
                custom_loan_module_no: frm.doc.loan
            });
        });

        if(frm.doc.payment_details && frm.doc.payment_details.length > 0) {
            frm.doc.payment_details.forEach(row => {
                calculate_total_payment(frm, row.doctype, row.name);
            });
        }
    }
});

frappe.ui.form.on("Payment Details", {
    principal: function(frm, cdt, cdn) {
        calculate_total_payment(frm, cdt, cdn);
    },
    interest: function(frm, cdt, cdn) {
        calculate_total_payment(frm, cdt, cdn);
    },
    other_charges: function(frm, cdt, cdn) {
        calculate_total_payment(frm, cdt, cdn);
    },
});

function calculate_total_payment(frm, cdt, cdn) {
    let row = locals[cdt][cdn];

    //child row total
    row.total_payment = (row.principal || 0) + (row.interest || 0) + (row.other_charges || 0);
    frm.refresh_field("payment_details");

    //parent total
    let total_paid_amount = 0;
    (frm.doc.payment_details || []).forEach(function(r) {
        total_paid_amount += r.total_payment || 0;
    });

    frm.set_value("total_paid_amount", total_paid_amount);
}
