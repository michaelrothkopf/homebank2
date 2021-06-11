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

/**
 * 
 * @param {int} purchaseId The id of the purchase to delete
 */
const removeCompletedPurchase = async (purchaseId) => {
    let removePurchaseResponse = await fetchData('/api/v2/removeUserPurchase', {purchaseId: purchaseId});
    console.log(removePurchaseResponse)
    if (removePurchaseResponse) $('#completed-purchase-' + purchaseId.toString()).remove();
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
    for (chore of chores.data.reverse()) {
        console.log(chore.name.toLowerCase().charAt(0).toUpperCase() + chore.name.slice(1))
        $("#choreList").append(
            `<div class="p-3 bg-secondary text-light d-flex flex-row" id="completed-chore-` + chore.id + `">
                <div class="chore">
                    <div class="small">` + chore.nickname.toLowerCase().charAt(0).toUpperCase() + chore.nickname.slice(1) + `</div>
                    `+ chore.name.toLowerCase().charAt(0).toUpperCase() + chore.name.slice(1) + ': $' + chore.value + `
                </div>
                <div class="optionbar ml-auto">
                    <button class="btn btn-danger" onclick="removeCompletedChore(` + chore.id + `)">&times;</button>
                </div>
            </div>`
        );
    }
}

const getBalances = async () => {
    let balances = await fetchData('/api/v2/getHouseholdUsers');

    $("#balanceList").html(`
    <div class="p-3 bg-primary text-light d-flex flex-row">
                        <div class="balance pr-5">
                            Children's balances:
                        </div>
                    </div>`);

    for (balance of balances.data) {
        $("#balanceList").append(
            `<div class="p-3 bg-secondary text-light d-flex flex-row" id="completed-balance-` + balance.id + `">
                <div class="balance">
                    <div class="small">` + balance.nickname + `</div>
                    $`+ balance.allowance + '/week: $' + balance.balance + ` total
                </div>
            </div>`
        );
    }
}

const getPurchases = async () => {
    let purchases = await fetchData('/api/v2/getHouseholdPurchases');
    console.log(purchases);
    if (purchases.failed) {
        return;
    }
    for (purchase of purchases.purchases) {
        $("#purchaseList").append(
            `<div class="p-3 bg-secondary text-light d-flex flex-row" id="completed-purchase-` + purchase.id + `">
                <div class="purchase">
                    <div class="small">` + purchase.nickname.toLowerCase().charAt(0).toUpperCase() + purchase.nickname.slice(1) + `</div>
                    `+ purchase.item.toLowerCase().charAt(0).toUpperCase() + purchase.item.slice(1) + ': $' + purchase.amount + ` total
                </div>
                <div class="optionbar ml-auto">
                    <button class="btn btn-danger" onclick="removeCompletedPurchase(` + purchase.id + `)">&times;</button>
                </div>
            </div>`
        );
    }
}

getChores();
getBalances();
getPurchases();