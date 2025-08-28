// Copyright (c) 2025, Raindrop and contributors
// For license information, please see license.txt

frappe.ui.form.on("Disbursement Details", {
	refresh(frm) {
		  frm.add_custom_button(__('Journal Entry'), function() {
             frappe.new_doc('Journal Entry', {
                custom_loan_module_no: frm.doc.loan
            });
        });

		if(frm.doc.disbursement && frm.doc.disbursement.length > 0) {
			frm.doc.disbursement.forEach(row => {
				calculate_total_amount(frm, row.doctype, row.name);
			});
		}
	},
});

frappe.ui.form.on("Disbursement",{
	amount:function(frm, cdt, cdn){
		calculate_total_amount(frm, cdt, cdn);
	}
})

function calculate_total_amount(frm, cdt, cdn){
	//parent total
	let total_amount = 0;
	(frm.doc.disbursement || []).forEach(function(r) {
		total_amount += r.amount || 0;
	});

	frm.set_value("total_amount", total_amount);
}
