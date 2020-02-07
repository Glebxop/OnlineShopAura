/**
 * Created by Master on 22.11.2019.
 */

({
    openModel: function(component, event, helper) {
          component.set("v.isOpen", true);
    },
    closeModel: function(component, event, helper) {
          helper.closeModelHelper(component);
    },
    register : function(component, event, helper) {
          helper.closeModelHelper(component);
          component.set("v.isRegister" , true);
    },
    backToShop : function ( component, event, helper ){
          component.set("v.isBasket" , true);
    },
    details : function ( component, event, helper ){
          component.set("v.isDetail" , true);
          component.set("v.detailProduct", event.getSource().get("v.value"));
    },
    deleteFromBasket : function ( component, event, helper ){
          let basket = component.get("v.basket");
          let idDelElement = event.getSource().get("v.value");
          let basketAfterDelete = new Array();
          for( let i = 0; i < basket.length; i++ ){
                        if(basket[i].Id != idDelElement){
                            basketAfterDelete.push(basket[i].Id);
                        }
                    }
          component.set("v.basket", basketAfterDelete);
    },
    howMany : function ( component, event, helper ){
          let idOfProduct = event.getSource().get("v.name");
          let howMany = event.getSource().get("v.value");
          let basket = component.get("v.basket");
          let availableUnits;
          for( let i = 0; i < basket.length; i++ ){
              if(basket[i].Id == idOfProduct){
                  availableUnits = basket[i].Number_of_product__c ;
                  if(availableUnits < howMany){
                     howMany = availableUnits;
                  }
                  else if(howMany <= 0){
                     howMany = 1;
                  }
              basket[i].count = howMany;
              break;
              }
          }
          component.set("v.basket", basket);
    },
});