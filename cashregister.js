function checkCashRegister(price, cash, cid) {
    const currencyUnit = {
        "PENNY": 0.01,
        "NICKEL": 0.05,
        "DIME": 0.1,
        "QUARTER": 0.25,
        "ONE": 1,
        "FIVE": 5,
        "TEN": 10,
        "TWENTY": 20,
        "ONE HUNDRED": 100
    };

    let change = cash - price;
    let changeArr = [];
    let totalCID = 0;

    for (let i = 0; i < cid.length; i++) {
        totalCID += cid[i][1];
    }
    totalCID = totalCID.toFixed(2);

    if (Number(totalCID) < change) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    } else if (Number(totalCID) === change) {
        return { status: "CLOSED", change: cid };
    } else {
        for (let i = cid.length - 1; i >= 0; i--) {
            const currencyName = cid[i][0];
            const currencyValue = currencyUnit[currencyName];
            const availableAmount = cid[i][1];
            let availableCount = availableAmount / currencyValue;
            let returnedCount = 0;

            while (change >= currencyValue && availableCount > 0) {
                change -= currencyValue;
                change = change.toFixed(2);
                availableCount--;
                returnedCount++;
            }

            if (returnedCount > 0) {
                changeArr.push([currencyName, returnedCount * currencyValue]);
            }
        }

        if (Number(change) > 0) {
            return { status: "INSUFFICIENT_FUNDS", change: [] };
        } else {
            return { status: "OPEN", change: changeArr };
        }
    }
}
