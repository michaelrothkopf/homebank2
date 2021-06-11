let selectedChore;

const setSelectedChore = async (choreId) => {
    selectedChore = choreId;
}

const logout = async () => {
    console.log('loggin out');
    await fetchData('/api/v2/logout');
    window.location.href = "/";
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

const getPurchases = async () => {
    let purchases = await fetchData('/api/v2/getUserPurchases', {data: null});
    console.log(purchases);
    if (purchases.failed) {
        return;
    }
    $("#purchaseList").html(`
    <div class="p-3 bg-primary text-light d-flex flex-row">
        <div class="purchase">
            Recently completed purchases:
        </div>
    </div>`);
    for (purchase of purchases.data.reverse()) {
        $("#purchaseList").append(
            `<div class="p-3 bg-secondary text-light d-flex flex-row" id="completed-purchase-` + purchase.id + `">
                <div class="purchase">
                    `+ purchase.item.toLowerCase().charAt(0).toUpperCase() + purchase.item.slice(1) + ': $' + purchase.amount + `
                </div>
                <div class="optionbar ml-auto">
                    <button class="btn btn-danger" onclick="removeCompletedPurchase(` + purchase.id + `)">&times;</button>
                </div>
            </div>`
        );
    }
}

const logPurchase = async () => {
    let purchaseName = $("#purchaseName").val();
    let purchasePrice = $("#purchasePrice").val();

    let response = await fetchData('/api/v2/addUserPurchase', {item: purchaseName, amount: purchasePrice});
    
    if (response.failed) {
        $("#addPurchaseErrorText").html(response.message);
        return;
    }

    getPurchases();
}

getPurchases();