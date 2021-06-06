const signUp = async () => {
    var username = $('#username').val();
    var password = $('#password').val();
    var housecode = $('#housecode').val();
    var agreesToTerms = document.getElementById("agreesToTerms").checked;
    var nickname = $('#nickname').val();

    var response = await fetchData('/api/v1/child_signup', {"username": username, "password": password, "housecode": housecode, "agreesToTerms": agreesToTerms, "nickname": nickname});

    if (response.failed) {
        $("#err-text").html(response.message);
    } else {
        window.location.href = "/login";
    }
}

const signUpParent = async () => {
    var username = $('#username').val();
    var password = $('#password').val();
    var housename = $('#housename').val();
    var agreesToTerms = document.getElementById("agreesToTerms").checked;

    var response = await fetchData('/api/v1/parent_signup', {"username": username, "password": password, "housename": housename, "agreesToTerms": agreesToTerms});

    if (response.failed) {
        $("#err-text").html(response.message);
    } else {
        window.location.href = "/login";
    }
}

const login = async () => {
    console.log("Button");

    var username = $('#username').val();
    var password = $('#password').val();

    var response = await fetchData('/api/v1/login', {"username": username, "password": password});

    console.log(response);

    if (response.failed) {
        $("#err-text").html(response.message);
    } else {
        window.location.href = response.accountType == 'parent' ? '/parent_app' : '/child_app';
    }
}