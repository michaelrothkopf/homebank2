var selectedChore;
var choreIndex;

const setSelectedChore = async (choreId) => {
    selectedChore = choreId;
    $("#selectLogChoreButton").html(choreIndex[choreId]);
}

const logout = async () => {
    console.log('loggin out');
    await fetchData('/api/v1/logout');
    window.location.href = "/";
}

const removeCompletedChore = async (choreId) => {
    var removeChoreResponse = await fetchData('/api/v1/remove_completed_chore', {choreId: choreId});
    console.log(removeChoreResponse)
    if (removeCompletedChore) $('#completed-chore-' + choreId.toString()).remove();
    getBalance();
}

const getChores = async () => {
    var chores = await fetchData('/api/v1/get_child_chore_list', {data: null});
    console.log(chores);
    if (chores.failed) {
        return;
    }
    $("#choreList").html(`
        <div class="p-3 bg-primary text-light d-flex flex-row">
            <div class="chore">
                Recently completed chores:
            </div>
        </div>
    `);
    for (chore of chores.chores.reverse()) {
        $("#choreList").append(
            `<div class="p-3 bg-secondary text-light d-flex flex-row" id="completed-chore-` + chore.id + `">
                <div class="chore">
                    `+ chore.name + ': $' + chore.amount + `
                </div>
                <div class="optionbar ml-auto">
                    <button class="btn btn-danger" onclick="removeCompletedChore(` + chore.id + `)">&times;</button>
                </div>
            </div>`
        );
        
    }
}

const getBalance = async () => {
    var balance = await fetchData('/api/v1/get_user_balance');

    console.log(balance);

    if (balance.failed) {
        return;
    }

    $("#balanceList").html(`
        <div class="p-3 bg-primary text-light d-flex flex-row">
            <div class="balance pr-5">
                Current balance:
            </div>
        </div>
        <div class="p-3 bg-secondary text-light">
            <div class="small">Balance:</div>
            $` + balance.balance.balance + `
         </div>
    `);
}

const getAvailableChores = async () => {
    var chores = await fetchData('/api/v1/get_household_available_chores');

    if (chores.failed) {
        return;
    }

    $("#choreSelector").html('');

    choreIndex = {};

    for (chore of chores.chores) {
        $("#choreSelector").append(`
        <a href="javascript: setSelectedChore(` + chore.id + `)" class="dropdown-item">` + chore.name + `</a>`);
        choreIndex[chore.id] = chore.name;
    }
}

const logChore = async () => {
    var response = await fetchData('/api/v1/log_chore', {choreId: selectedChore});
    
    if (response.failed) {
        $("#addChoreErrorText").html(response.message);
        return;
    }

    getChores();
    getBalance();
}

getChores();
getAvailableChores();
getBalance();