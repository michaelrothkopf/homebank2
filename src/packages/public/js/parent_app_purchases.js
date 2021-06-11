const logout = async () => {
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
    let purchases = await fetchData('/api/v2/getHouseholdPurchases');
    console.log(purchases);
    if (purchases.failed) {
        $("#purchaseList").append('<div class="p-3 bg-secondary text-light d-flex flex-row" id="noPurchasesBox">Looks like your children haven\'t made any purchases!</div>');
        return;
    }
    for (purchase of purchases.purchases) {
        $("#purchaseList").append(
            `<div class="p-3 bg-secondary text-light d-flex flex-row" id="completed-purchase-` + purchase.id + `">
                <div class="purchase">
                    <div class="small">` + purchase.nickname + `</div>
                    `+ purchase.item + ': $' + purchase.amount + ` total
                </div>
                <div class="optionbar ml-auto">
                    <button class="btn btn-danger" onclick="removeCompletedPurchase(` + purchase.id + `)">&times;</button>
                </div>
            </div>`
        );
    }
}

getPurchases();