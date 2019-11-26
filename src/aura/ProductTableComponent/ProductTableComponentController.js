/**
 * Created by Master on 21.11.2019.
 */

({

    doInit : function(cmp,ev,helper){
        let action = cmp.get('c.getProducts');
        action.setCallback(this,function(response){
        if(response.getState() === 'SUCCESS') {
           cmp.set("v.products",response.getReturnValue());
        }
        });
        $A.enqueueAction(action);
    },

    toBasket : function(cmp,ev,helper){
         let products=cmp.get("v.products");
         let basket = cmp.get("v.basket");
         for (let i = 0; i < products.length; i++) {
            if(ev.getSource().get("v.value")==products[i].Id){
               basket.push(products[i]);
            }
         }
         cmp.set("v.basket",basket);
    },

    details : function ( component, event, helper ){
         component.set("v.isDetail",true);
         component.set("v.detailProduct",event.getSource().get("v.value"));
    },

});