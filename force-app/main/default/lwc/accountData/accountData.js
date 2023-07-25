import { LightningElement, track } from "lwc";
import getAccounts from "@salesforce/apex/AccountDataController.getAccounts";

export default class AccountData extends LightningElement {
    @track accounts;
    @track allaccounts;
    totalAccounts = 0;
    pageSize = 5;
    columns = [
        { label: "Name", fieldName: "name" },
        { label: "Account Number", fieldName: "accountnumber" },
        { label: "Account Source", fieldName: "source" },
        { label: "Active", fieldName: "active" },
        { label: "Phone", fieldName: "phone" }
    ];

    connectedCallback() {
        this.init();
    }

    init() {
        getAccounts()
            .then((accounts) => {
                console.log("res vvv");
                console.log(accounts);
                let acc_a = [];
                if (accounts) {
                    this.totalAccounts = accounts.length;
                    accounts.forEach((acc) => {
                        let a = {};
                        a.Id = acc.Id;
                        a.name = acc.Name;
                        a.accountnumber = acc.AccountNumber;
                        a.source = acc.AccountSource;
                        a.active = acc.Active__c;
                        a.phone = acc.Phone;
                        acc_a.push(a);
                    });
                    this.allaccounts = acc_a;
                    console.log(this.accounts);
                    this.accounts = this.allaccounts.slice(0, this.pageSize);
                }
                console.log("this.accounts vvv");
                console.log(this.accounts);
            })
            .catch((err) => {
                console.log("err vvv");
                console.log(err);
            });
    }

    handlePagination(event) {
        const start = (event.detail - 1) * this.pageSize;
        const end = this.pageSize * event.detail;
        this.accounts = this.allaccounts.slice(start, end);
    }
}
