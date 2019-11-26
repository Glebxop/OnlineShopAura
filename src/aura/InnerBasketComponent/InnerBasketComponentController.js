/**
 * Created by Master on 22.11.2019.
 */

({

    openModel: function(component, event, helper) {
          // for Display Model,set the "isOpen" attribute to "true"
          component.set("v.isOpen", true);
       },

       closeModel: function(component, event, helper) {
             helper.closeModelHelper(component);
          },

          register : function(component, event, helper) {
              helper.closeModelHelper(component);
              component.set("v.isRegister",true);
          },
          registrationCallback : function ( component, event, helper ){

          },
          backToShop : function ( component, event, helper ){
component.set("v.isBasket",true);
          },

          details : function ( component, event, helper ){
              component.set("v.isDetail",true);
              component.set("v.detailProduct",event.getSource().get("v.value"));
          },


});