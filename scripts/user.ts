"use strict";

namespace core {

    export class User {

        // Attributes
        private m_displayname: string;
        private m_emailaddress: string;
        private m_username: string;
        private m_password: string;

        // Constructors
        constructor(displayName : string = "", username : string = "", emailAddress : string = "", password : string = "") {
            this.m_displayname = displayName;
            this.m_username = username;
            this.m_emailaddress = emailAddress;
            this.m_password = password;
        }

        // Setters
        public set DisplayName(displayName : string) {
            this.m_displayname = displayName;
        }

        public set EmailAddress(emailAddress : string) {
            this.m_emailaddress = emailAddress;
        }

        public set Username(username : string) {
            this.m_username = username;
        }

        public set Password(password : string) {
            this.m_password = password;
        }

        // Getters
        public get DisplayName() : string {
            return this.m_displayname;
        }

        public get EmailAddress() : string {
            return this.m_emailaddress;
        }

        public get Username() : string {
            return this.m_username;
        }

        public get Password() : string {
            return this.m_password;
        }

        // Methods
        public toString() : string {
            return `Display Name: ${this.DisplayName}\n 
                Email Address: ${this.EmailAddress}\n
                Username: ${this.Username}`;
        }

        public toJSON() : {Username : string, DisplayName : string, EmailAddress : string, Password : string} {
            return {
                "DisplayName" : this.m_displayname,
                "EmailAddress" : this.m_emailaddress,
                "Username" : this.m_username,
                "Password" : this.m_password
            }
        }

        public fromJSON(data : User) : void {
            this.m_displayname = data.DisplayName;
            this.m_emailaddress = data.EmailAddress;
            this.m_username = data.Username;
            this.m_password = data.Password;
        }

        public serialize() : string | null {
            if (this.DisplayName !== "" && this.EmailAddress !== ""
                && this.Username !== "" && this.Password !== "") {
                return `${this.DisplayName},${this.Username},${this.EmailAddress},${this.Password}`;
            }
            console.error("One of more of the contact attributes is/are empty or missing");
            return null;
        }

        deserialize(data : string) : void {
            let propertyArray = data.split(",");
            this.DisplayName = propertyArray[0];
            this.EmailAddress = propertyArray[1];
            this.Username = propertyArray[2];
            this.Password = propertyArray[3];
        }
    }
}