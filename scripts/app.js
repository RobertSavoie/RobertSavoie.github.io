"use strict";
(function () {
    function ActiveLinkCallback() {
        switch (router.ActiveLink) {
            case "home": return DisplayHomePage;
            case "about": return DisplayAboutUsPage;
            case "contact": return DisplayContactUsPage;
            case "contact-list": return DisplayContactListPage;
            case "edit": return DisplayEditContactPage;
            case "login": return DisplayLoginPage;
            case "register": return DisplayRegisterPage;
            case "products": return DisplayProductsPage;
            case "services": return DisplayServicesPage;
            case "404": return Display404Page;
            default:
                console.error("Error: Callback does not exist " + router.ActiveLink);
                return new Function();
        }
    }
    function DisplayHomePage() {
        console.log("Home Page");
        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph!</p>`);
        $("body").append(`<article class="container">
                        <p id="ArticleParagraph" class="mt-3">This is my Article Paragraph</p></article>`);
    }
    function DisplayProductsPage() {
        console.log("Products Page");
    }
    function DisplayServicesPage() {
        console.log("Services Page");
    }
    function DisplayAboutUsPage() {
        console.log("About Us Page");
    }
    function DisplayContactUsPage() {
        console.log("Contact Us Page");
        ContactFormValidation();
        let sendButton = document.getElementById("SendBtn");
        let subscribeCheckbox = document.getElementById("subscriptionCheckbox");
        sendButton.addEventListener("click", function (event) {
            event.preventDefault();
            if (subscribeCheckbox.checked) {
                console.log("Checkbox checked!");
                let fullName = document.forms[0].fullName.value;
                let contactNumber = document.forms[0].contactNumber.value;
                let emailAddress = document.forms[0].emailAddress.value;
                let message = document.forms[0].message.value;
                AddContact(fullName, contactNumber, emailAddress, message);
                location.href = "/contact-list";
            }
        });
    }
    function DisplayContactListPage() {
        console.log("Contact List Page");
        if (localStorage.length > 0) {
            let contactList = document.getElementById("contactList");
            let data = "";
            let keys = Object.keys(localStorage);
            let index = 1;
            for (const key of keys) {
                let contactData = localStorage.getItem(key);
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
            $("#AddBtn").on("click", () => { location.href = "/edit#add"; });
            $("button.delete").on("click", function () {
                if (confirm("Are you sure you want to delete this contact?")) {
                    localStorage.removeItem($(this).val());
                    location.href = "/contact-list";
                }
            });
            $("button.edit").on("click", function () {
                location.href = "/edit#" + $(this).val();
            });
        }
    }
    function DisplayEditContactPage() {
        console.log("Edit Contact Page");
        ContactFormValidation();
        let page = location.hash.substring(1);
        switch (page) {
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
                $("#CancelBtn").on("click", () => { location.href = "/contact-list"; });
                break;
            default: {
                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page));
                $("#fullName").val(contact.FullName);
                $("#contactNumber").val(contact.ContactNumber);
                $("#email").val(contact.EmailAddress);
                $("#message").val(contact.Message);
                $("#EditBtn").on("click", (event) => {
                    event.preventDefault();
                    contact.FullName = $("#fullName").val();
                    contact.ContactNumber = $("#contactNumber").val();
                    contact.EmailAddress = $("#email").val();
                    contact.Message = $("#message").val();
                    localStorage.setItem(page, contact.serialize());
                    location.href = "/contact-list";
                });
                $("#CancelBtn").on("click", () => { location.href = "/contact-list"; });
                break;
            }
        }
    }
    function DisplayLoginPage() {
        console.log("Display Login Page");
        let messageArea = $("#messageArea");
        messageArea.hide();
        $("#loginBtn").on("click", function () {
            let success = false;
            let newUser = new core.User();
            $.get("./data/user.json", function (data) {
                let userName = document.forms[0].userName.value;
                let password = document.forms[0].password.value;
                for (const u of data.users) {
                    if (userName.value === u.Username && password.value === u.Password) {
                        success = true;
                        newUser.fromJSON(u);
                        break;
                    }
                }
                if (success) {
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    location.href = "/contact";
                }
                else {
                    $("#userName").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Failed to authenticate");
                }
            });
        });
        $("#cancelBtn").on("click", function () {
            document.forms[0].reset();
            location.href = "/";
        });
    }
    function DisplayRegisterPage() {
        console.log("Display Register Page");
    }
    function Display404Page() {
        console.log("Displaying 404 Page");
    }
    function CheckLogin() {
        if (sessionStorage.getItem("user")) {
            $("#login").html(`<a id="logout" class="nav-link" href="#">
                            <i class="fa-solid fa-sign-out-alt"></i> Logout</a>`);
        }
        $("#logout").on("click", function () {
            sessionStorage.clear();
            location.href = "/";
        });
    }
    function AddContact(fullName, contactNumber, emailAddress, message) {
        let contact = new core.Contact(fullName, contactNumber, emailAddress, message);
        if (contact.serialize()) {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    function ContactFormValidation() {
        ValidateField("#fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-Z][a-z]+))*$/, "Please enter a valid first and last name (ex. Mr. Peter Parker)");
        ValidateField("#contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please enter a valid phone number (ex. 555 555-5555");
        ValidateField("#email", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid email address (ex. example@email.com");
    }
    function ValidateField(inputFieldID, regularExpression, errorMessage) {
        let messageArea = $("#messageArea");
        $(inputFieldID).on("blur", function () {
            let inputFieldText = $(this).val();
            if (!regularExpression.test(inputFieldText)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(errorMessage).show();
            }
            else {
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function AjaxRequest(method, url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (typeof callback === "function") {
                    callback(xhr.responseText);
                }
                else {
                    console.error("Error: Please provide a valid function for callback");
                }
            }
        });
        xhr.open(method, url);
        xhr.send();
    }
    function capitalizeFirstCharacter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function LoadHeader() {
        $.get("/views/components/header.html", function (html_data) {
            $("header").html(html_data);
            document.title = capitalizeFirstCharacter(router.ActiveLink);
            $(`li>a:contains(${document.title})`).addClass("active");
            CheckLogin();
        });
    }
    function LoadContent() {
        let page = router.ActiveLink;
        let callback = ActiveLinkCallback();
        $.get(`/views/content/${page}.html`, function (html_data) {
            $("main").html(html_data);
            callback();
        });
    }
    function LoadFooter() {
        $.get("/views/components/footer.html", function (html_data) {
            $("footer").html(html_data);
        });
    }
    function Start() {
        console.log("App Started!");
        LoadHeader();
        LoadContent();
        LoadFooter();
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map