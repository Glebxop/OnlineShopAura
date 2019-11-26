/**
 * Created by Master on 21.11.2019.
 */

({
    goToBasket : function(cmp,ev,helper){
        cmp.set("v.isBasket",false);
    },
    doInit : function(cmp,ev,helper){
        helper.setTotalCount(cmp);
    },
    changeBasket : function (cmp,ev,helper){
        helper.setTotalCount(cmp);
    }

});