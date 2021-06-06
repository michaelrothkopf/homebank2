var selectedChore;

const setSelectedChore = async (choreId) => {
    selectedChore = choreId;
}

const logout = async () => {
    console.log('loggin out');
    await fetchData('/api/v1/logout');
    window.location.href = "/";
}

/**
 * 
 * @param {int} purchaseId The id of the purchase to delete
 */
const removeCompletedPurchase = async (purchaseId) => {
    var removePurchaseResponse = await fetchData('/api/v1/remove_purchase', {purchaseId: purchaseId});
    console.log(removePurchaseResponse)
    if (removePurchaseResponse) $('#completed-purchase-' + purchaseId.toString()).remove();
}

const getPurchases = async () => {
    var purchases = await fetchData('/api/v1/get_user_purchases', {data: null});
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
    for (purchase of purchases.purchases.reverse()) {
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
    var purchaseName = $("#purchaseName").val();
    var purchasePrice = $("#purchasePrice").val();

    var response = await fetchData('/api/v1/log_purchase', {purchaseName: purchaseName, purchasePrice: purchasePrice});
    
    if (response.failed) {
        $("#addPurchaseErrorText").html(response.message);
        return;
    }

    getPurchases();
}

getPurchases();