/**
 * Created by Master on 22.11.2019.
 */

({
setTotalCount : function (cmp){
            let totalPrice=0;
            let basket = cmp.get("v.basket");
            if(typeof basket !== undefined){
            for (let i = 0; i < basket.length; i++) {
             totalPrice += basket[i].Price__c;
            }}
            cmp.set("v.totalValue",totalPrice);
}
});