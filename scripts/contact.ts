"use strict";

namespace core {

    export class Contact {
        private m_fullName: string;
        private m_contactNumber: string;
        private m_emailAddress: string;
        private m_message: string;

        constructor(fullName : string = "", contactNumber : string = "", emailAddress : string = "", message : string = "") {
            this.m_fullName = fullName;
            this.m_contactNumber = contactNumber;
            this.m_emailAddress = emailAddress;
            this.m_message = message;
        }

        public set FullName(fullName : string) {
            this.m_fullName = fullName;
        }

        public get FullName() : string {
            return this.m_fullName;
        }

        public set ContactNumber(contactNumber: string ) {
            this.m_contactNumber = contactNumber;
        }

        public get ContactNumber(): string  {
            return this.m_contactNumber;
        }

        public set EmailAddress(emailAddress : string ) {
            this.m_emailAddress = emailAddress;
        }

        public get EmailAddress() : string  {
            return this.m_emailAddress;
        }

        public set Message (message : string){
            this.m_message = message;
        }

        public get Message() : string {
            return this.m_message;
        }

        public toString() : string  {
            return ` FullName: ${this.FullName}\n 
            Contact Number: ${this.ContactNumber}\n 
            Email Address: ${this.EmailAddress} 
            Message: ${this.Message}`;
        }

        public serialize() : string | null {
            if (this.FullName !== "" && this.ContactNumber !== "" && this.EmailAddress !== "" && this.Message !== "") {
                return `${this.FullName}, ${this.ContactNumber}, ${this.EmailAddress}, ${this.Message}`;
            }
            console.error("One or more of the attributes are empty or missing")
            return null;
        }

        public deserialize(data : string ) : void   {
            let propertyArray = data.split(",");
            this.m_fullName = propertyArray[0];
            this.m_contactNumber = propertyArray[1];
            this.m_emailAddress = propertyArray[2];
            this.m_message = propertyArray[3];
        }
    }
}