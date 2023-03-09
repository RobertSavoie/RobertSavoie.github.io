"use strict";
var core;
(function (core) {
    class Contact {
        m_fullName;
        m_contactNumber;
        m_emailAddress;
        m_message;
        constructor(fullName = "", contactNumber = "", emailAddress = "", message = "") {
            this.m_fullName = fullName;
            this.m_contactNumber = contactNumber;
            this.m_emailAddress = emailAddress;
            this.m_message = message;
        }
        set FullName(fullName) {
            this.m_fullName = fullName;
        }
        get FullName() {
            return this.m_fullName;
        }
        set ContactNumber(contactNumber) {
            this.m_contactNumber = contactNumber;
        }
        get ContactNumber() {
            return this.m_contactNumber;
        }
        set EmailAddress(emailAddress) {
            this.m_emailAddress = emailAddress;
        }
        get EmailAddress() {
            return this.m_emailAddress;
        }
        set Message(message) {
            this.m_message = message;
        }
        get Message() {
            return this.m_message;
        }
        toString() {
            return ` FullName: ${this.FullName}\n 
            Contact Number: ${this.ContactNumber}\n 
            Email Address: ${this.EmailAddress} 
            Message: ${this.Message}`;
        }
        serialize() {
            if (this.FullName !== "" && this.ContactNumber !== "" && this.EmailAddress !== "" && this.Message !== "") {
                return `${this.FullName}, ${this.ContactNumber}, ${this.EmailAddress}, ${this.Message}`;
            }
            console.error("One or more of the attributes are empty or missing");
            return null;
        }
        deserialize(data) {
            let propertyArray = data.split(",");
            this.m_fullName = propertyArray[0];
            this.m_contactNumber = propertyArray[1];
            this.m_emailAddress = propertyArray[2];
            this.m_message = propertyArray[3];
        }
    }
    core.Contact = Contact;
})(core || (core = {}));
//# sourceMappingURL=contact.js.map