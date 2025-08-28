// Copyright (c) 2025, Raindrop and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Loan Module", {
// 	refresh(frm) {

// 	},
// });

frappe.ui.form.on("Loan Module", {
    refresh: function(frm) {
        frm.add_custom_button(__('Disbursement'), function() {
             frappe.new_doc('Disbursement Details', {
                loan: frm.doc.name
            });
        }, __('Actions'));

        
        frm.add_custom_button(__('Payment'), function() {
            frappe.new_doc('Payment', {
                loan: frm.doc.name,
            });
        }, __('Actions'));
    }
    });


