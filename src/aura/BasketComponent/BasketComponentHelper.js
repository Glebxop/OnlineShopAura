/**
 * Created by Master on 22.11.2019.
 */

({
setTotalCount : function (cmp){
            let totalPrice = 0;
            let basket = cmp.get("v.basket");
            let prodInBasket = Number(0);
            if(typeof basket !== undefined){
            for (let i = 0; i < basket.length; i++) {
            prodInBasket += Number(basket[i].count);
             totalPrice += basket[i].Price__c*basket[i].count;
            }}
            cmp.set("v.countInBasket",prodInBasket);
            cmp.set("v.totalValue",Number(totalPrice));
}
});