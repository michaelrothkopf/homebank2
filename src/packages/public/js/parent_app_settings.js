/*
<div class="p-3 bg-secondary text-light d-flex flex-row">
    <div class="chore">
        <div class="small">Michael</div>
        Allowance: $50/week
    </div>
    <div class="d-flex flex-column flex-sm-row ml-auto">
        <input type="number" class="form-control" placeholder="New allowance" id="newAllowance" step="0.01" pattern="^\d*(\.\d{0,2})?$">
        <div class="m-1"></div>
        <button class="btn btn-success" onclick="setAllowance(3)">Save</button>
    </div>
</div>
*/

const setAllowance = async (childId) => {
    let newAllowance = $("#newAllowance-" + childId).val();

    if (!newAllowance) {
        return;
    }

    let response = await fetchData('/api/v2/setUserAllowance', {userId: childId, newAllowance: newAllowance});

    if (response.failed) {
        return;
    }

    getHouseholdSettings();
}

const setStartingBalance = async (childId) => {
    let newStartingBalance = $("#newStartingBalance-" + childId).val();

    if (!newStartingBalance) {
        return;
    }

    let response = await fetchData('/api/v2/setUserStartingBalance', {userId: childId, newBalance: newStartingBalance});

    if (response.failed) {
        return;
    }

    getHouseholdSettings();
}

const getHouseholdSettings = async () => {
    let householdUsers = await fetchData('/getHouseholdUsers', {});

    if (householdUsers.failed) {
        return;
    }

    $("#childList").html(`
        <div class="p-3 bg-primary text-light d-flex flex-row">
            <div class="chore">
                <span title="Your child's starting balance is added to the calculated total. It doesn't affect completed chores, bonuses, or purchases." class="">&#9432;</span>
                Children's settings:
            </div>
        </div>
    `);

    for (child of householdUsers.data) {
        $("#childList").append(`
        <div class="p-3 bg-secondary text-light d-flex flex-column flex-md-row flex-grow-0">
            <div class="chore">
                <div class="small">` + child.nickname + `</div>
                Allowance: $` + child.allowance + `/week<br>
                Starting balance: $` + child.balance + `
            </div>
            <div class="d-flex flex-column flex-sm-row ml-0 ml-md-auto flex-shrink-1 mt-4 mt-md-0">
                <input type="number" class="form-control" placeholder="New allowance" id="newAllowance-` + child.id + `" step="0.01" pattern="^\d*(\.\d{0,2})?$">
                <div class="m-1"></div>
                <div>
                    <button class="btn btn-success w-100 w-md-auto" onclick="setAllowance(` + child.id + `)">Save</button>
                </div>
            </div>
            <div class="d-flex flex-column flex-sm-row ml-0 ml-md-5 flex-shrink-1 mt-4 mt-md-0">
                <input type="number" class="form-control" placeholder="New starting balance" id="newStartingBalance-` + child.id + `" step="0.01" pattern="^\d*(\.\d{0,2})?$">
                <div class="m-1"></div>
                <div>
                    <button class="btn btn-success w-100 w-md-auto" onclick="setStartingBalance(` + child.id + `)">Save</button>
                </div>
            </div>
        </div>`)
    }
}

const getHouseholdCode = async () => {
    let response = await fetchData('/api/v2/getHouseholdInfo', {});

    if (response.failed) {
        return;
    }

    $("#householdCode").html('Household code: ' + response.code);
}

const logout = async () => {
    console.log('loggin out');
    await fetchData('/api/v2/logout');
    window.location.href = "/";
}

getHouseholdSettings();
getHouseholdCode();