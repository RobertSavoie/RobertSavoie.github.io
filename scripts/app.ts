// noinspection JSJQueryEfficiency

"use strict";

//IIFE - Immediately Invoked Function Expression
//AKA  - Anonymous Self-Executing Function
(function(){
    /**
     * Returns a function for the activeLink (current path) to display
     * @param {string}activeLink
     * @returns {function}
     */
    function ActiveLinkCallback() : Function {

        switch(router.ActiveLink)
        {
            case "home" : return DisplayHomePage;
            case "about" : return DisplayAboutUsPage;
            case "contact" : return DisplayContactUsPage;
            case "contact-list" : return DisplayContactListPage;
            case "edit" : return DisplayEditContactPage;
            case "login" : return DisplayLoginPage;
            case "register" : return DisplayRegisterPage;
            case "products" : return DisplayProductsPage;
            case "services" : return DisplayServicesPage;
            case "404" : return Display404Page;
            default:
                console.error("Error: Callback does not exist " + router.ActiveLink);
                return new Function();
        }
    }

    function DisplayHomePage() : void {
        console.log("Home Page")

        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph!</p>`)

        $("body").append(`<article class="container">
                        <p id="ArticleParagraph" class="mt-3">This is my Article Paragraph</p></article>`)
    }
    function DisplayProductsPage() : void {
        console.log("Products Page")
    }
    function DisplayServicesPage() : void {
        console.log("Services Page")
    }
    function DisplayAboutUsPage() : void {
        console.log("About Us Page")
    }
    function DisplayContactUsPage() : void {
        console.log("Contact Us Page")

        ContactFormValidation();

        let sendButton = document.getElementById("SendBtn") as HTMLElement;
        let subscribeCheckbox = document.getElementById("subscriptionCheckbox") as HTMLInputElement;

        sendButton.addEventListener("click", function(event : MouseEvent){
            event.preventDefault();

            if(subscribeCheckbox.checked){
                console.log("Checkbox checked!")

                let fullName = document.forms[0].fullName.value;
                let contactNumber = document.forms[0].contactNumber.value;
                let emailAddress = document.forms[0].emailAddress.value;
                let message = document.forms[0].message.value;

                AddContact(fullName, contactNumber, emailAddress, message);

                location.href = "/contact-list";
            }
        });
    }
    function DisplayContactListPage() : void {
        console.log("Contact List Page")

        if(localStorage.length > 0){
            let contactList = document.getElementById("contactList") as HTMLElement;
            let data = "";
            // Add deserialized data from localStorage
            let keys = Object.keys(localStorage);
            // return a string array of keys
            let index = 1;
            for(const key of keys){
                let contactData = localStorage.getItem(key) as string;
                let contact = new core.Contact();
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                         <td>${contact.FullName}</td>
                         <td>${contact.ContactNumber}</td>
                         <td>${contact.EmailAddress}</td>
                         <td>${contact.Message}</td>                         
                         <td class="text-center">
                            <button value="${key}" class="btn btn-primary btn-sm edit">
                            <i class="fa-solid fa-edit fa-sm"></i> Edit
                            </button>
                         </td>
                         <td>
                            <button value="${key}" class="btn btn-danger btn-sm delete">
                            <i class="fa-regular fa-trash-alt fa-sm"></i> Delete
                            </button>
                         </td>
                         </tr>`;
                index++;
            }
            contactList.innerHTML = data;
            $("#AddBtn").on("click", () => {location.href = "/edit#add";});
            $("button.delete").on("click", function () {
                if(confirm("Are you sure you want to delete this contact?")){
                    localStorage.removeItem($(this).val() as string);
                    location.href = "/contact-list";
                }
            });
            $("button.edit").on("click", function () {
                location.href = "/edit#" + $(this).val();

            });
        }
    }
    function DisplayEditContactPage() : void {
        console.log("Edit Contact Page")

        ContactFormValidation();

        let page = location.hash.substring(1);

        switch(page){
            case "add":
                $("main>h1").text("Add Contact");
                $("#EditBtn").html(`<i class="fas fa-plus fa-sm"></i> Add`);

                $("#EditBtn").on("click", (event) => {
                    event.preventDefault();

                    let fullName = document.forms[0].fullName.value;
                    let contactNumber = document.forms[0].contactNumber.value;
                    let emailAddress = document.forms[0].emailAddress.value;
                    let message = document.forms[0].message.value;

                    AddContact(fullName, contactNumber, emailAddress, message);
                    location.href = "/contact-list";
                });

                $("#CancelBtn").on("click", () => {location.href = "/contact-list";});
                break;
            default:{
                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page) as string);
                $("#fullName").val(contact.FullName);
                $("#contactNumber").val(contact.ContactNumber);
                $("#email").val(contact.EmailAddress);
                $("#message").val(contact.Message);
                $("#EditBtn").on("click", (event) => {
                    event.preventDefault();

                    contact.FullName = $("#fullName").val() as string;
                    contact.ContactNumber = $("#contactNumber").val() as string;
                    contact.EmailAddress = $("#email").val() as string;
                    contact.Message = $("#message").val() as string;

                    localStorage.setItem(page, contact.serialize() as string);

                    location.href = "/contact-list";
                });
                $("#CancelBtn").on("click", () => {location.href = "/contact-list";});
                break;
            }
        }
    }

    function DisplayLoginPage() : void {
        console.log("Display Login Page")

        let messageArea = $("#messageArea");
        messageArea.hide();
        $("#loginBtn").on("click", function(){

            let success = false;
            let newUser = new core.User();

            $.get("./data/user.json", function(data){

                let userName = document.forms[0].userName.value;
                let password = document.forms[0].password.value;

                for(const u of data.users){
                    if(userName.value === u.Username && password.value === u.Password){
                        success = true;
                        newUser.fromJSON(u);
                        break;
                    }
                }

                if(success){
                    sessionStorage.setItem("user", newUser.serialize() as string);
                    messageArea.removeAttr("class").hide();
                    location.href = "/contact";
                }
                else{
                    $("#userName").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Failed to authenticate");
                }

            });

        });

        $("#cancelBtn").on("click", function(){
            document.forms[0].reset();
            location.href = "/";
        })

    }
    function DisplayRegisterPage() : void {
        console.log("Display Register Page")
    }

    function Display404Page() : void {
        console.log("Displaying 404 Page")
    }

    function CheckLogin() : void {

        if(sessionStorage.getItem("user")){

            $("#login").html(`<a id="logout" class="nav-link" href="#">
                            <i class="fa-solid fa-sign-out-alt"></i> Logout</a>`);

        }
        $("#logout").on("click", function(){
            sessionStorage.clear();
            location.href = "/";
        })
    }

    /**
     * Creates a contact from the given parameters
     * @param {string}fullName
     * @param {string}contactNumber
     * @param {string}emailAddress
     * @param {string}message
     */
    function AddContact(fullName : string, contactNumber : string, emailAddress : string, message : string) : void {
        let contact = new core.Contact(fullName, contactNumber, emailAddress, message);
        if(contact.serialize()){
            let key = contact.FullName.substring(0,1) + Date.now();
            localStorage.setItem(key, contact.serialize() as string);
        }
    }

    function ContactFormValidation() : void {
        // Validate full name
        ValidateField("#fullName",
            /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-Z][a-z]+))*$/,
            "Please enter a valid first and last name (ex. Mr. Peter Parker)");
        // Validate Phone Number
        ValidateField("#contactNumber",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Please enter a valid phone number (ex. 555 555-5555");
        // Validate Email Address
        ValidateField("#email",
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please enter a valid email address (ex. example@email.com");
    }

    function ValidateField(inputFieldID : string, regularExpression : RegExp, errorMessage : string) : void {
        let messageArea = $("#messageArea");

        $(inputFieldID).on("blur", function(){

            let inputFieldText = $(this).val() as string;
            if(!regularExpression.test(inputFieldText)){
                // fail validation
                $(this).trigger("focus").trigger("select"); // go back to the fullName text
                messageArea.addClass("alert alert-danger").text(errorMessage).show();
            }else{
                //pass validation
                messageArea.removeAttr("class").hide();
            }
        });
    }

    function AjaxRequest(method : string, url : string, callback : Function) : void {
        // Step 1
        let xhr = new XMLHttpRequest();

        // Step 2
        xhr.addEventListener("readystatechange", ()=>{
            if(xhr.readyState === 4 && xhr.status === 200){
                if(typeof callback === "function"){
                    callback(xhr.responseText);
                }else{
                    console.error("Error: Please provide a valid function for callback")
                }
            }
        });

        // Step 3
        xhr.open(method, url);

        // Step 4
        xhr.send()
    }

    function capitalizeFirstCharacter(str : string) : string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function LoadHeader() : void {

        $.get("/views/components/header.html", function (html_data){

            $("header").html(html_data);

            document.title = capitalizeFirstCharacter(router.ActiveLink);

            $(`li>a:contains(${document.title})`).addClass("active");
            CheckLogin();
        });
    }

    function LoadContent() : void {

        let page = router.ActiveLink;
        let callback = ActiveLinkCallback();

        $.get(`/views/content/${page}.html`, function (html_data){

            $("main").html(html_data);
            callback();

        });

    }

    function LoadFooter() : void{

        $.get("/views/components/footer.html", function (html_data){

            $("footer").html(html_data);
        });

    }

    function Start() : void {
        console.log("App Started!");

        LoadHeader();

        LoadContent();

        LoadFooter();
    }

    window.addEventListener("load", Start)

})();

