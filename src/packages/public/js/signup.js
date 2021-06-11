const signUp = async () => {
    let username = $('#username').val();
    let password = $('#password').val();
    let housecode = $('#housecode').val();
    let agreesToTerms = document.getElementById("agreesToTerms").checked;
    let nickname = $('#nickname').val();

    let response = await fetchData('/api/v2/child_signup', {"username": username, "password": password, "housecode": housecode, "agreesToTerms": agreesToTerms, "nickname": nickname});

    if (response.failed) {
        $("#err-text").html(response.message);
    } else {
        window.location.href = "/login";
    }
}

const signUpParent = async () => {
    let username = $('#username').val();
    let password = $('#password').val();
    let housename = $('#housename').val();
    let agreesToTerms = document.getElementById("agreesToTerms").checked;

    let response = await fetchData('/api/v2/parent_signup', {"username": username, "password": password, "housename": housename, "agreesToTerms": agreesToTerms});

    if (response.failed) {
        $("#err-text").html(response.message);
    } else {
        window.location.href = "/login";
    }
}

const login = async () => {
    console.log("Button");

    let username = $('#username').val();
    let password = $('#password').val();

    let response = await fetchData('/api/v2/login', {"username": username, "password": password});

    console.log(response);

    if (response.failed) {
        $("#err-text").html(response.message);
    } else {
        window.location.href = response.accountType == 'parent' ? '/parent_app' : '/child_app';
    }
}