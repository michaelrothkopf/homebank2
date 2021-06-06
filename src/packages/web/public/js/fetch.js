const fetchData = async (url='', data={}) => {
    var failed = false;
    var response;
    try {
        response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
    } catch {
        failed = true;
    }
    
    return new Promise((resolve, reject) => {
        if (!failed) {
            resolve(response.json());
        } else {
            reject('API fetch failed.');
        }
    });
}