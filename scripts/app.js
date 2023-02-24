/**
 * Name: Rob Savoie & Rhys Thompson
 * Last Update: 2/23/2023
 * Current Update: 2/24/2023
 * File Name: app.js
 * Description: This is our JavaScript file using a different variety of different functions & tags.
 * In this assignment our group demonstrates the different types of logic used to create a basic webpage
 * including two navbars. The top navbar contains the websites name, 5 options for the user to choose from,
 * and the bottom navbar having our groups name plus the current date.
 */

"use strict";

//IIFE - Immediately Invoked Function Expression
//AKA  - Anonymous Self-Executing Function
(function (){
    /** @Start
     * This function loads all the information about the pages from JavaScript to our website.
     */
    function Start() {
        console.log("App Started!")

        AjaxRequest("GET", "header.html", LoadHeader);
        AjaxRequest("GET", "footer.html", LoadFooter);

        switch(document.title)
        {
            case "Home":
                DisplayHomePage();
                break;
            case "Projects":
                DisplayProjectsPage();
                break;
            case "Services":
                DisplayServicesPage();
                break;
            case "About Us":
                DisplayAboutUsPage();
                break;
            case "Human Resources":
                DisplayHRPage();
                break;
            case "Contact Us":
                DisplayContactUsPage();
                break;
            case "Contact List":
                DisplayContactListPage();
                break;
            case "Edit Contact":
                DisplayEditContactPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
        }
    }
    window.addEventListener("load", Start)

    //
    //
    // Display Pages
    //
    //

    /** @DisplayHomePage
     * This function displays the home page when user clicks the home button.
     */
    function DisplayHomePage() {
        console.log("Home Page");

        $("*main").append(document.createElement("h1")).append(document.createElement("p"));
        $("*h1").addClass("mb-3").text("Welcome To Our Website!");
        $("*p").addClass("mt-3").text("Welcome to Rob and Rhys' website!");
    }

    /** @DisplayProjectsPage
     * This function displays the projects page on our website.
     */
    function DisplayProjectsPage() {
        console.log("Display Projects Page");

        $("*main")
            .append(`<h1 class="mb-3">Rob and Rhys' Projects</h1>`)
            .append(`<p id="para1"></p>`)
            .append(`<hr/>`);
        $("#para1")
            .append(`<h1 class="robh1">Rob's Projects</h1>`)
            .append(`<hr/>`)
            .append(`<p>Here are all three of Rob's personal projects he has worked on over the years</p>`)
            .append(`<img class="img-amazon" src="../images/amazon.png" alt="No Image Found">`)
            .append(`<img class="img-facebook" src="../images/Screen_of_Facebook.png" alt="No Image Found">`)
            .append(`<img class="img-twitter" src="../images/twitter.png" alt="No Image Found">`)
            .append(`<br>`)
            .append(`<br>`)
            .append(`<p>Rob has worked for Amazon, Facebook, and Twitter working on their login pages</p>`)
            .append(`<hr/>`)
            .append(`<h1 class="rhysh1">Rhys' Projects</h1>`)
            .append(`<hr/>`)
            .append(`<p>Here are all three of Rhys' personal projects he has worked on over the years</p>`)
            .append(`<img class="img-scaffold" src="../images/scaffold.png" alt="No Image Found">`)
            .append(`<img class="img-parkhub" src="../images/parkhub.png" alt="No Image Found">`)
            .append(`<img class="img-windows7" src="../images/windows7.png" alt="No Image Found">`)
            .append(`<br>`)
            .append(`<br>`)
            .append(`<p>Rhys has worked on installing scaffold at scotia bank arena, designed an app 
                        called parkhub and installed Windows 7 through a virtual machine.</p>`);
    }

    /** @DisplayServicePage
     * This function displays our services page.
     */
    function DisplayServicesPage() {
        console.log("Display Services Page");

        $("*main")
            .append(`<h1 class="mb-3">Services We Provide:</h1>`)
            .append(`<h1 class="robh1">Rob's Skills</h1>`)
            .append(`<p>
                        <li>HTML/PHP/JavaScript</li>
                        <li>C#/Visual Studio</li>
                        <li>COBOL</li>
                     </p>`)
            .append(`<h1 class="rhysh1">Rhys' Skills:</h1>`)
            .append(`<p>
                        <li>Cloud</li>
                        <li>C#/Visual Studio</li>
                        <li>Python</li>
                     </p>`);
    }

    /** @DisplayAboutUsPage
     * This function displays the About Us page on our website.
     */
    function DisplayAboutUsPage() {
        console.log("Display About Us Page");

        $("*main")
            .append(`<h1 class="mb-3">About Us</h1>`)
            .append(`<h1 class="robh1">Rob Savoie</h1>`)
            .append(`<hr/>`)
            .append(`<p id="imageSection1">
                         <p class="mt-3">Rob is a 2nd Year Student at Durham College currently enrolled in the 
                                         Computer Programing Analysis program which is a 3-year course.
                         </p>
                     </p>`)
            .append(`<h1 class="rhysh1">Rhys Thompson</h1>`)
            .append(`<hr/>`)
            .append(`<p id="imageSection2">
                         <p class="mt-3">Rhys is a 2nd Year Student at Durham College currently enrolled in the 
                         Computer Programing Course which is a 2-year course. Rhys Plans to graduate this semester!
                         </p>
                     </p>`);
        $("#imageSection1")
            .append($(`<img class="img-square" src="../images/Rob.jpg" alt="Rob.jpg">`));
        $("#imageSection2")
            .append($(`<img class="img-square" src="../images/rhyswithtt.png" alt="Unable to find Rhys image">`));
    }

    /** @DisplayHRPage
     * This function displays the Human Resources page on our website.
     */
    function DisplayHRPage() {
        console.log("Display Human Resources Page");
        $("*main").append(`<h1 class="mb-3">Human Resources</h1>`);
    }

    /** @DisplayContactUsPage
     * This function displays the Contact Us page on our website.
     */
    function DisplayContactUsPage() {
        console.log("Display About Us Page");

        ContactFormValidation();

        let subscribeCheckbox = document.getElementById("subscriptionCheckbox");
        $("#SendBtn").on("click", function(event){
            event.preventDefault();
            if(subscribeCheckbox.checked){
                console.log("Checkbox checked!")
                AddContact(document.getElementById("fullName").value,
                    document.getElementById("contactNumber").value,
                    document.getElementById("email").value,
                    document.getElementById("message").value);
                location.href = "contact-list.html";
            }
        });

        $("*main")
            .append($(`<h5 class="mb-3">Rob Savoie</h5>`))
            .append(`<p>Email Address: robert.savoie1@dcmail.ca</p>`)
            .append($(`<hr/>`))
            .append(`<h5 class="mb-3">Rhys Thompson</h5>`)
            .append(`<p>Email Address: rhys.thompson@dcmail.ca</p>`);
    }

    /**
     * @DisplayContactListPage
     * This function displays the contact list page.
     */
    function DisplayContactListPage(){
        console.log("Display Contact List Page")

        if(localStorage.length > 0){
            let contactList = document.getElementById("contactList");
            let data = "";
            // Add deserialized data from localStorage
            let keys = Object.keys(localStorage);
            // return a string array of keys
            let index = 1;
            for(const key of keys){
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
            $("#AddBtn").on("click", () => {location.href = "edit.html#add";});
            $("button.delete").on("click", function () {
                if(confirm("Are you sure you want to delete this contact?")){
                    localStorage.removeItem($(this).val());
                    location.href = "contact-list.html";
                }
            });
            $("button.edit").on("click", function () {
                location.href = "edit.html#" + $(this).val();

            });
        }
    }

    /**
     * @DisplayEditContactPage
     * This function displays the edit contact list page
     */
    function DisplayEditContactPage(){
        console.log("Display Edit Contact Page")

        ContactFormValidation();

        let page = location.hash.substring(1);

        switch(page){
            case "add":
                $("main>h1").text("Add Contact");
                // noinspection JSJQueryEfficiency
                $("#EditBtn").html(`<i class="fas fa-plus fa-sm"></i> Add`).on("click", (event) => {
                    event.preventDefault();
                    AddContact(document.getElementById("fullName").value,
                        document.getElementById("contactNumber").value,
                        document.getElementById("email").value,
                        document.getElementById("message").value);
                    location.href = "contact-list.html";
                });

                // noinspection JSJQueryEfficiency
                $("#CancelBtn").on("click", () => {location.href = "contact-list.html";});
                break;
            default:{
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

                    location.href = "contact-list.html";
                });
                $("#CancelBtn").on("click", () => {location.href = "contact-list.html";});
                break;
            }
        }
    }

    /**
     * @DisplayLoginPage
     * This function displays the login page
     */
    function DisplayLoginPage(){
        console.log("Display Login Page")

        // const urlParams = new URLSearchParams(window.location.search);
        // const urlUserName = urlParams.get('username');
        // const urlPassword = urlParams.get('password');
        //
        // console.log(urlUserName) //pushes username info to login page
        // console.log(urlPassword) // pushes password info to login page

        let messageArea = $("#messageArea");
        messageArea.hide();
        $("#loginBtn").on("click", function(){
            let success = false;
            let newUser = new core.User();

            $.get("./data/user.json", function(data){
                for(const u of data.users){
                    if(userName.value === u.Username && password.value === u.Password){
                        success = true;
                        newUser.fromJSON(u);
                        break;
                    }
                }
                if(success){
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    location.href = "contact.html";
                }
                else{
                    $("#userName").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Failed to authenticate").show();
                }
            });
        });
        $("#cancelBtn").on("click", function(){
            document.forms[0].reset();
            location.href = "login.html";
        })
    }

    /**
     * @DisplayRegisterPage
     * This function displays the register page
     */
    function DisplayRegisterPage(){
        console.log("Display Register Page")

        $("<div id='messageArea'></div>").insertAfter($("#heading")).hide();
        // Register validation function. Checks to make sure all text fields are the correct input
        RegisterFormValidation();

        $("#registerBtn").on("click", function(event){
            event.preventDefault();

            let success = false;
            let newUser = new core.User();

            $.get("./data/user.json", function(data){

                for(const u of data.users){
                    if(email.value === u.EmailAddress){
                        $("#messageArea").addClass("alert alert-danger").text("Error: Email address already in use").show();
                        break;
                    }
                    if(username.value === u.Username){
                        $("#messageArea").addClass("alert alert-danger").text("Error: User already exists").show();
                        break;
                    }
                    else{
                        if(password.value === confirmPassword.value){
                            success = true;
                            break;
                        }
                        else{
                            $("#messageArea").addClass("alert alert-danger").text("Error: Passwords must match").show();
                        }
                    }
                }
                // When all text fields are filled. Register page will direct user to login page.
                if(success){
                    newUser.FirstName = $("#firstName").val();
                    newUser.LastName = $("#lastName").val();
                    newUser.EmailAddress = $("#email").val();
                    newUser.Username = $("#username").val();
                    newUser.Password = $("#password").val();
                    console.log(newUser.toString());
                    $("#messageArea").removeAttr("class").hide();
                    $("#registerForm").trigger("reset");
                    // location.href = "login.html?username=" + newUser.Username + "&password=" + newUser.Password;
                }
            });
        });
    }

    /**
     * @param fullName
     * @param contactNumber
     * @param emailAddress
     * @param message
     * @AddContact
     * Add contact infor such as fullname, contact number, email address, and
     * message
     */
    function AddContact(fullName, contactNumber, emailAddress, message){
        let contact = new core.Contact(fullName, contactNumber, emailAddress, message);
        if(contact.serialize()){
            let key = contact.FullName.substring(0,1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }

    /**
     * @CheckLogin
     * This function validates user input information.
     */
    function CheckLogin(){
        if(sessionStorage.getItem("user")){
            $("#loginHeader").html(`<a id="logoutHeader" class="nav-link" href="#">
                            <i class="fa-solid fa-sign-out-alt"></i> Logout</a>`);

            $(`<li class='nav-item'>
                <a id='user' class='nav-link' href='#'></a>
                </li>`).insertAfter($("#contactHeader"));

            let user = new core.User();
            let userData = sessionStorage.getItem("user");
            user.deserialize(userData);

            $("#user").text(user.Username);
        }
        $("#logoutHeader").on("click", function(){
            sessionStorage.clear();
            location.href = "index.html";
        })
    }

    /**
     * @ContactFormValidation
     * This function validates the contact page input information.
     */
    function ContactFormValidation(){
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

    /**
     * @RegisterFormValidation
     * This function validates the input in register form page.
     */

    function RegisterFormValidation(){
        ValidateField("#firstName",
            /^[a-zA-Z]{2,}$/,
            "First name must be at least 2 characters");
        // Validate full name
        ValidateField("#lastName",
            /^[a-zA-Z]{2,}$/,
            "Last name must be at least 2 characters");
        // Validate Phone Number
        ValidateField("#email",
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Email must be at least 8 characters and have an @ symbol");
        ValidateField("#username",
            /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
            "Characters must range from 6-20 (ex: johndoe07)");
        // Enter password validation
        ValidateField("#password",
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
            "Please enter a valid password. Must have a minimum of 6 characters, " +
            "1 letter, and one special character.");
    }

    /**
     * @param inputFieldID
     * @param regularExpression
     * @param errorMessage
     * @ValidateField
     * This validates user info such as input id,
     * regular expression, error message.
     */
    function ValidateField(inputFieldID, regularExpression, errorMessage){
        let messageArea = $("#messageArea");

        $(inputFieldID).on("blur", function(){

            let inputFieldText = $(this).val();
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

    /**
     * @param method
     * @param url
     * @param callback
     * @AjaxRequest
     * Creates an Ajax request
     */
    function AjaxRequest(method, url, callback){
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

    /**
     * @param data
     * @LoadHeader
     * Load header onto pages
     */
    function LoadHeader(data){
        $("*header").append(data);
        $("#productsHeader").html(`<li class="nav-item"><a class="nav-link" href="../projects.html">
                                    <i class="fa-solid fa-inbox"></i> Projects</a></li>`);
        $(`<li class='nav-item'>
                <a class='nav-link' href='../human-resources.html'>
                    <i class="fa-solid fa-building-user"></i> Human Resources
                </a>
            </li>`).insertAfter($("#aboutHeader"));
        $(`li>a:contains(${document.title})`).addClass("active");
        CheckLogin();
    }

    /**
     * @param data
     * @LoadFooter
     * Load footer onto pages
     */
    function LoadFooter(data){
        $("*footer").append(data);
    }
})();