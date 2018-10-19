(function () {

    //Variable's declaration & Assigning selectors
    var $emailSignUp = document.querySelector("#email-sign-up"),
        $emailSignIn = document.querySelector("#email-sign-in"),
        $passwordSignUp = document.querySelector("#pass-sign-up"),
        $confirmPasswordSignUp = document.querySelector("#confirm-password"),
        $passwordSignIn = document.querySelector("#pass-sign-in"),
        $formSignUp = document.querySelector(".sign-up-form"),
        $formSignIn = document.querySelector(".sign-in-form"),
        $submitSignUp = document.querySelector("#signup-submit"),
        $submitSignIn = document.querySelector("#signin-submit"),
        $startButtonSignUp = document.querySelector("#signup"),
        $startButtonSignIn = document.querySelector("#signin"),
        $profilePage = document.querySelector(".user-profile"),
        $homePage = document.querySelector(".homepage-content"),
        $userMenu = document.querySelector(".homepage-menu"),
        $outputWin = document.querySelector("aside"),
        $closeSignIn = document.querySelector("#signin-close"),
        $closeSignUp = document.querySelector("#signup-close"),
        $userLogOut = document.querySelector("#user-logout");
    //Error's object
    var errMessage = {
        WRONG_EMAIL_NAME: 'Wrong E-mail address =(',
        EXISTING_EMAIL: "Such login is already exists, please type another one",
        INVALID_LOGIN: "No such login, type Ok to register or Cancel to try another one",
        WRONG_PASSWORD: "Password requires at least 8 symbols ;-)",
        INVALID_PASSWORD_CONFIRM: "Repeat password properly, please",
        INVALID_PASSWORD: "Wrong account password =(",
        BLANK_FIELDS: "Fill in all the fields, please!"
    };

    //Assigning event handlers for registration logic
    $startButtonSignUp.addEventListener('click', renderForm);
    $emailSignUp.addEventListener('change', validateEmail);
    $passwordSignUp.addEventListener('change', validatePassword);
    $passwordSignIn.addEventListener('change', validatePassword);
    $confirmPasswordSignUp.addEventListener('change', validatePassword);
    $submitSignUp.addEventListener('click', onSubmit);
    $closeSignUp.addEventListener('click', closeForm);

    //Assigning event handlers for logining logic
    $startButtonSignIn.addEventListener('click', renderForm);
    $emailSignIn.addEventListener('change', validateEmail);
    $submitSignIn.addEventListener('click', onSubmit);
    $closeSignIn.addEventListener('click', closeForm);

    $userLogOut.addEventListener('click', function () {
        $profilePage
            .classList
            .toggle('show-window');
        $homePage
            .classList
            .toggle('hide-window');
        $userMenu
            .classList
            .toggle('hide-window');
    });

    //Application's logic
    function setProfile(userEmail) {
        var userData,
            userText;

        userData = document.createElement('h2');
        userText = document.createTextNode(`Hi, homie! Your email: ${userEmail}`);
        userData.append(userText);
        $outputWin.append(userData);
    }

    function actionLocalStorage(emailKey, passwordValue) {
        if (passwordValue) {
            localStorage.setItem(emailKey, passwordValue);
        } else {
            return localStorage.getItem(emailKey);
        }
    }

    function validateEmail(e) {
        if (e.target === $emailSignUp) {
            if (!e.target.value.match(/^[a-zA-Z0-9][\w/.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w/.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z/.]*[a-zA-Z]$/)) {
                alert(errMessage.WRONG_EMAIL_NAME);
                this.value = '';
                return false;
            } else if (actionLocalStorage($emailSignUp) !== null) {
                alert(errMessage.EXISTING_EMAIL);
                e.target.value = '';
                return false;
            }
        } else if (e.target === $emailSignIn) {
            var anotherLogin;

            if (actionLocalStorage(e.target.value) === null) {
                anotherLogin = confirm(errMessage.INVALID_LOGIN);
                if (anotherLogin) {
                    $formSignIn
                        .classList
                        .toggle("show-window");
                    $formSignUp
                        .classList
                        .toggle("show-window");
                } else {
                    e.target.value = '';
                }
                return false;
            }
        }
        e
            .target
            .classList
            .toggle('checked-password');
    }

    function validatePassword() {
        if (this === $confirmPasswordSignUp) {
            if (this.value === $passwordSignUp.value) {
                this
                    .classList
                    .remove('error-check-password');
                this
                    .classList
                    .add('checked-password');
                return;
            } else {
                this
                    .classList
                    .add('error-check-password');
            }
            return;
        }
        if ((this.value).length < 8) {
            this
                .classList
                .remove('checked-password');
            alert(errMessage.WRONG_PASSWORD);
            this.value = '';
            return false;
        } else {
            this
                .classList
                .toggle('checked-password');
        }
    }

    function renderForm(e) {
        if (e.target === $startButtonSignIn) {
            if ($formSignUp.classList.contains('show-window')) {
                $formSignUp
                    .classList
                    .toggle('show-window');
            }
            $formSignIn
                .classList
                .toggle('show-window');
        } else if (e.target === $startButtonSignUp) {
            if ($formSignIn.classList.contains('show-window')) {
                $formSignIn
                    .classList
                    .toggle('show-window');
            }
            $formSignUp
                .classList
                .toggle('show-window');
        }
    }

    function onSubmit(e) {
        e.preventDefault();
        if (e.target === $submitSignUp) {
            if ($emailSignUp.value === '' || $passwordSignUp.value === '' || $confirmPasswordSignUp.value === '') {
                if (document.querySelector(".sign-up-form span") === null) {
                    errorMessage($formSignUp);
                } else {
                    return;
                }
            } else {
                if ($confirmPasswordSignUp.value !== $passwordSignUp.value) {
                    alert(errMessage.INVALID_PASSWORD_CONFIRM);
                    $confirmPasswordSignUp.value = '';
                    return false;
                }
                actionLocalStorage($emailSignUp.value, $passwordSignUp.value);
                $formSignUp
                    .classList
                    .toggle('show-window');
                setProfile($emailSignUp.value);
            }
        } else if (e.target === $submitSignIn) {
            if ($emailSignIn.value === '' || $passwordSignIn.value === '') {
                if (document.querySelector(".sign-in-form span") === null) {
                    errorMessage($formSignIn);
                } else {
                    return;
                }
            } else {
                if (actionLocalStorage($emailSignIn.value) !== $passwordSignIn.value) {
                    if ($passwordSignIn.classList.contains('checked-password')) {
                        $passwordSignIn
                            .classList
                            .remove('checked-password');
                    }
                    alert(errMessage.INVALID_PASSWORD);
                    $passwordSignIn.value = "";
                    return false;
                }
                $formSignIn
                    .classList
                    .toggle('show-window');
                setProfile($emailSignIn.value);
            }
        }
        $homePage
            .classList
            .toggle('hide-window');
        $userMenu
            .classList
            .toggle('hide-window');
        $profilePage
            .classList
            .toggle('show-window');
        $userLogOut
            .classList
            .toggle('show-window');
    }

    function errorMessage(targetForm) {
        var nodeError,
            textError;
        nodeError = document.createElement('span');
        nodeError
            .classList
            .add("error-text");
        textError = document.createTextNode(errMessage.BLANK_FIELDS);
        nodeError.append(textError);
        targetForm.append(nodeError);
    }

    function closeForm(e) {
        if (e.target === $closeSignIn) {
            $formSignIn
                .classList
                .toggle("show-window");
        } else if (e.target === $closeSignUp) {
            $formSignUp
                .classList
                .toggle("show-window");
        }
    }

}());