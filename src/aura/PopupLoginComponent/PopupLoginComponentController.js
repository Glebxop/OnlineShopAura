/**
 * Created by Master on 22.11.2019.
 */

({
    openModel: function(component, event, helper) {
         // for Display Model,set the "isOpen" attribute to "true"
         component.set("v.isOpen", true);
    },

    closeModel: function(component, event, helper) {
         component.set("v.isOpen", false);//helper.closeModelHelper(component);
    },

    logIn : function(component, event, helper) {
        //.removeClass
         $A.util.addClass(component.find('buttons'), 'slds-hide');
         $A.util.removeClass(component.find('loginFields'), 'slds-hide');
         $A.util.removeClass(component.find('loginButton'), 'slds-hide');
    },

    register : function(component, event, helper) {
         $A.util.addClass(component.find('buttons'), 'slds-hide');
         $A.util.removeClass(component.find('loginFields'), 'slds-hide');
         $A.util.removeClass(component.find('registrationField'), 'slds-hide');
    },

    sendCode : function ( component, event, helper ){
         let name=component.get("v.name");
         let email=component.get("v.email");
         console.log(name+email);
         let action = component.get("c.sendCodeController");
         action.setParams({
                           'name' : name,
                           'email' : email
                          });
         action.setCallback(this,function(response){
        //var result = response.getReturnValue();
         if(response.getState() === 'SUCCESS') {
                      			//go to roder date
         } else {
           var errors = response.getError();
           if (errors && errors[0] && errors[0].message) {
             helper.showToast({
                               "title": "Error",
                               "label":"Error",
                               "message": errors[0].message
                               });
                                  }
                              }
         });
                          $A.enqueueAction(action);

              },

    applyCode : function ( component, event, helper ){
        let name=component.get("v.name");
        let email=component.get("v.email");
        let codeFromEmail=component.get("v.code");
        let action = component.get("c.applyCodeController");
        action.setParams({
                          'name' : name,
                          'email' : email,
                          'codeFromEmail' : codeFromEmail
                                        });
        action.setCallback(this,function(response){
        let result = response.getReturnValue();
        if(response.getState() === 'SUCCESS') {
                           			//go to roder date
        } else {
          var errors = response.getError();
          if (errors && errors[0] && errors[0].message) {
          helper.showToast({
                            "title": "Error",
                            "label":"Error",
                            "message": errors[0].message
          });
          }
          }
        });
        $A.enqueueAction(action);
    },

    logInCallout : function ( component, event, helper ){
                  let name=component.get("v.name");
                  let email=component.get("v.email");
                  let action = component.get('c.login');
                          action.setParams({

                              'name' : name,
                              'email' : email

                          });
                          action.setCallback(this,function(response){
                          	var result = response.getReturnValue();
                          	if(response.getState() === 'SUCCESS') {
                          	   $A.util.removeClass(component.find('orderDiv'), 'slds-hide');
                          	   $A.util.addClass(component.find('loginOrRegisterDiv'), 'slds-hide');
                      			//go to roder date
                          	} else {
                                  // If server throws any error
                                  var errors = response.getError();
                                  if (errors && errors[0] && errors[0].message) {
                                      helper.showToast({
                                                                      "title": "Error",
                                                                      "label":"Error",
                                                                      "message": errors[0].message
                                                      });
                                  }
                              }

                          });
                          $A.enqueueAction(action);

              },

              getMyOrder  : function ( component, event, helper ){
                  console.log('BASKET ORDER');
                  let basket=component.get("v.basket");
                  let action = component.get('c.orderProductsController');
                                            action.setParams({
                                                'basket' : basket,
                                            });
                                            action.setCallback(this,function(response){
                                            	var result = response.getReturnValue();
                                            	if(response.getState() === 'SUCCESS') {
                                            	   $A.util.removeClass(component.find('orderDiv'), 'slds-hide');
                                            	   $A.util.addClass(component.find('loginOrRegisterDiv'), 'slds-hide');
                                        			//go to roder date
                                            	} else {
                                                    // If server throws any error
                                                    var errors = response.getError();
                                                    if (errors && errors[0] && errors[0].message) {
                                                        helper.showToast({
                                                                                        "title": "Error",
                                                                                        "label":"Error",
                                                                                        "message": errors[0].message
                                                                        });
                                                    }
                                                }

                                            });
                                            $A.enqueueAction(action);


              }


              /*apply : function ( component, event, helper ){
                  let action = cmp.get('c.apply');//!!!!!!!!!!!!!!!!!!!!!!!!!!parametrs name email
                          action.setCallback(this,function(response){
                             if(response.getState() === 'SUCCESS') {
                                 if(response.getReturnValue()){
                                     //!!!!!!!!!oder
                                 }
                                 else{
                                     $A.util.toggleClass(activate, 'slds-hide');
                                 }

                             }/////Exception
                          });
                          $A.enqueueAction(action);

              },
              applyCode : function ( component, event, helper ){

                  let action = cmp.get('c.apply');//!!!!!!!!!!!!!!!!!!!!!!!!!!parametrs code
                                            action.setCallback(this,function(response){
                                               if(response.getState() === 'SUCCESS') {
                                                   if(response.getReturnValue()){
                                                       //!!!!!!!!!oder
                                                   }
                                                   else{
                                                       $A.util.toggleClass(activate, 'slds-hide');
                                                   }

                                               }/////Exception
                                            });
                                            $A.enqueueAction(action);

              }*/
});