"use strict";

(function (core) {

    class Contact {

        // Constructors
        constructor(fullName, contactNumber, emailAddress, message) {
            this.FullName = fullName;
            this.ContactNumber = contactNumber;
            this.EmailAddress = emailAddress;
            this.Message = message;
        }

        // Setters
        set FullName(fullName) {
            this.m_fullname = fullName;
        }

        set ContactNumber(contactNumber) {
            this.m_contactnumber = contactNumber;
        }

        set EmailAddress(emailAddress) {
            this.m_emailaddress = emailAddress;
        }

        set Message(message) {
            this.m_message = message;
        }

        // Getters
        get FullName() {
            return this.m_fullname;
        }

        get ContactNumber() {
            return this.m_contactnumber;
        }

        get EmailAddress() {
            return this.m_emailaddress;
        }

        get Message() {
            return this.m_message;
        }

        // Methods
        toString() {
            return `Full Name: ${this.FullName}\n 
                Contact Number: ${this.ContactNumber}\n 
                Email Address: ${this.EmailAddress}\n
                Message: ${this.Message}`;
        }

        serialize() {
            if (this.FullName !== "" && this.ContactNumber !== ""
                && this.EmailAddress !== "" && this.Message !== "") {
                return `${this.FullName},${this.ContactNumber},${this.EmailAddress},${this.Message}`;
            }
            console.error("One of more of the contact attributes is/are empty or missing");
            return null;
        }

        deserialize(data) {
            let propertyArray = data.split(",");
            this.FullName = propertyArray[0];
            this.ContactNumber = propertyArray[1];
            this.EmailAddress = propertyArray[2];
            this.Message = propertyArray[3];
        }

    }
    core.Contact = Contact;
})(core || (core = {}));