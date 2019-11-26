/**
 * Created by Master on 22.11.2019.
 */

({
    toBasket : function(cmp,ev,helper){
            let products=cmp.get("v.products");
            let basket = cmp.get("v.basket");
            for (let i = 0; i < products.length; i++) {
             if(ev.getSource().get("v.value")==products[i].Id){
                 basket.push(products[i]);
             }
            }
            cmp.set("v.basket",basket);
        }
});