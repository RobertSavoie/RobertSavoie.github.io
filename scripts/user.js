"use strict";
var core;
(function (core) {
    class User {
        m_displayname;
        m_emailaddress;
        m_username;
        m_password;
        constructor(displayName = "", username = "", emailAddress = "", password = "") {
            this.m_displayname = displayName;
            this.m_username = username;
            this.m_emailaddress = emailAddress;
            this.m_password = password;
        }
        set DisplayName(displayName) {
            this.m_displayname = displayName;
        }
        set EmailAddress(emailAddress) {
            this.m_emailaddress = emailAddress;
        }
        set Username(username) {
            this.m_username = username;
        }
        set Password(password) {
            this.m_password = password;
        }
        get DisplayName() {
            return this.m_displayname;
        }
        get EmailAddress() {
            return this.m_emailaddress;
        }
        get Username() {
            return this.m_username;
        }
        get Password() {
            return this.m_password;
        }
        toString() {
            return `Display Name: ${this.DisplayName}\n 
                Email Address: ${this.EmailAddress}\n
                Username: ${this.Username}`;
        }
        toJSON() {
            return {
                "DisplayName": this.m_displayname,
                "EmailAddress": this.m_emailaddress,
                "Username": this.m_username,
                "Password": this.m_password
            };
        }
        fromJSON(data) {
            this.m_displayname = data.DisplayName;
            this.m_emailaddress = data.EmailAddress;
            this.m_username = data.Username;
            this.m_password = data.Password;
        }
        serialize() {
            if (this.DisplayName !== "" && this.EmailAddress !== ""
                && this.Username !== "" && this.Password !== "") {
                return `${this.DisplayName},${this.Username},${this.EmailAddress},${this.Password}`;
            }
            console.error("One of more of the contact attributes is/are empty or missing");
            return null;
        }
        deserialize(data) {
            let propertyArray = data.split(",");
            this.DisplayName = propertyArray[0];
            this.EmailAddress = propertyArray[1];
            this.Username = propertyArray[2];
            this.Password = propertyArray[3];
        }
    }
    core.User = User;
})(core || (core = {}));
//# sourceMappingURL=user.js.map