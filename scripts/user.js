"use strict";

(function (core) {

    class User {

        // Constructors
        constructor(firstName = "", lastName = "", username = "",
                    emailAddress = "", password = "") {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Username = username;
            this.EmailAddress = emailAddress;
            this.Password = password;
        }

        // Setters
        set FirstName(firstName) {
            this.m_firstname = firstName;
        }

        set LastName(lastName) {
            this.m_lastname = lastName;
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

        // Getters
        get FirstName() {
            return this.m_firstname;
        }

        get LastName() {
            return this.m_lastname;
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

        // Methods
        toString() {
            let output = `First Name: ${this.FirstName}\n`;
            output += `Last Name: ${this.LastName}\n`;
            output += `Email Address: ${this.EmailAddress}\n`;
            output += `Username: ${this.Username}`;

            return output;
        }

        toJSON(){
            return {
                "FirstName" : this.FirstName,
                "LastName" : this.LastName,
                "EmailAddress" : this.EmailAddress,
                "Username" : this.Username,
                "Password" : this.Password
            }
        }

        fromJSON(data){
            this.FirstName = data.FirstName;
            this.LastName = data.LastName;
            this.EmailAddress = data.EmailAddress;
            this.Username = data.Username;
            this.Password = data.Password;
        }

        serialize() {
            if (this.FirstName !== "" && this.LastName !== "" && this.EmailAddress !== ""
                && this.Username !== "" && this.Password !== "") {
                return `${this.FirstName},${this.LastName},${this.EmailAddress},${this.Username},${this.Password}`;
            }
            console.error("One of more of the contact attributes is/are empty or missing");
            return null;
        }

        deserialize(data) {
            let propertyArray = data.split(",");
            this.FirstName = propertyArray[0];
            this.LastName = propertyArray[1];
            this.EmailAddress = propertyArray[2];
            this.Username = propertyArray[3];
            this.Password = propertyArray[4];
        }
    }
    core.User = User;
})(core || (core = {}));