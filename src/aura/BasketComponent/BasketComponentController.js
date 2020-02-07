
({
    goToBasket : function(cmp,event,helper){
        cmp.set("v.isBasket",false);
    },
    doInit : function(cmp,event,helper){
        helper.setTotalCount(cmp);
    }

});