const logout = async () => {
    await fetchData('/api/v2/logout');
    window.location.href = "/";
}

/**
 * 
 * @param {int} choreId The id of the chore to delete
 */
const removeCompletedChore = async (choreId) => {
    let removeChoreResponse = await fetchData('/api/v2/removeCompletedChore', {choreId: choreId});
    console.log(removeChoreResponse)
    if (removeCompletedChore) $('#completed-chore-' + choreId.toString()).remove();
}

const removeAvailableHouseholdChore = async (choreId) => {
    let removeChoreResponse = await fetchData('/api/v2/remove_available_household_chore', {choreId: choreId});
    if (!removeChoreResponse.failed) $("#available-household-chore-" + choreId.toString()).remove();
    else console.log(removeChoreResponse);
}

const getChores = async () => {
    let chores = await fetchData('/api/v2/get_chore_list');
    console.log(chores);
    if (chores.failed) {
        return;
    }
    $("#choreList").html(`
    <div class="p-3 bg-primary text-light d-flex flex-row">
                        <div class="chore">
                            Recently completed chores:
                        </div>
                    </div>`);
    for (chore of chores.chores.reverse()) {
        $("#choreList").append(
            `<div class="p-3 bg-secondary text-light d-flex flex-row" id="completed-chore-` + chore.id + `">
                <div class="chore">
                    <div class="small">` + chore.nickname + `</div>
                    `+ chore.name + ': $' + chore.value + `
                </div>
                <div class="optionbar ml-auto">
                    <button class="btn btn-danger" onclick="removeCompletedChore(` + chore.id + `)">&times;</button>
                </div>
            </div>`
        );
    }
}

const getAvailableChores = async () => {
    let chores = await fetchData('/api/v2/get_household_available_chores');
    console.log(chores);
    if (chores.failed) {
        return;
    }
    $("#availableChoresList").html(`
    <div class="p-3 bg-primary text-light d-flex flex-row">
                        <div class="chore">
                            Household's chores:
                        </div>
                    </div>`);
    for (chore of chores.chores) {
        $("#availableChoresList").append(
            `<div class="p-3 bg-secondary text-light d-flex flex-row" id="available-household-chore-` + chore.id + `">
                <div class="chore">
                    `+ chore.name + ': $' + chore.value + `
                </div>
                <div class="optionbar ml-auto">
                    <button class="btn btn-danger" onclick="removeAvailableHouseholdChore(` + chore.id + `)">&times;</button>
                </div>
            </div>`
        );
    }
}

const createNewChore = async () => {
    let choreName = $("#choreName").val();
    let choreValue = $("#chorePrice").val();
    let createChoreResponse = await fetchData('/api/v2/create_chore', {choreName: choreName, choreValue: choreValue});

    if (createChoreResponse.failed) $("#addChoreErrorText").html(createChoreResponse.message);

    let choreName = $("#choreName").val('');
    let choreValue = $("#chorePrice").val('');

    getAvailableChores();
}

getChores();
getAvailableChores();