import { Component, OnInit } from "@angular/core";
import * as email from "../nativescript-email";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

    toEmail;
    ccEmail;
    bccEmail;
    subject;
    message;

    constructor() { }

    ngOnInit(): void { }

    onEmailSend(): void {
        // basic validation
        if (!this.subject || !this.message || !this.toEmail) {
            alert("Please enter all required fields!");
            return;
        }

        email.compose({
            subject: this.subject,
            body: this.message,
            to: [this.toEmail],
            cc: [this.ccEmail ? this.ccEmail : ' '],
            bcc: [this.bccEmail ? this.bccEmail : ' ']
        }).then(() => {
            setTimeout(() => {
                this.clearFields();
            }, 5000);
        }, err => {
            this.clearFields();
            alert("Error: " + err);
        });
    }

    clearFields(): void {
        this.toEmail = '';
        this.ccEmail = '';
        this.bccEmail = '';
        this.subject = '';
        this.message = '';
    }
}
