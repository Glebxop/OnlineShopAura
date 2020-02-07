/**
 * Created by Master on 22.11.2019.
 */

({

   loginButton : function(component, event, helper){
       let loginOrRegisterDiv = component.find('loginOrRegistration');
       $A.util.addClass(loginOrRegisterDiv, 'slds-hide');
       $A.util.removeClass(component.find('loginDiv'),'slds-hide');
   },

   registrationButton : function(component, event, helper){
       $A.util.addClass(component.find('loginOrRegistration'), 'slds-hide');
       $A.util.removeClass(component.find('registrationDiv'),'slds-hide');
       component.set("v.header","Registration");
   },

   checkEmail : function(component, event, helper) {
       helper.checkEmailHelper(component);
   },

   checkName : function(component, event, helper) {
       helper.checkNameHelper(component);
   },

   openModel : function(component, event, helper) {
      component.set("v.isOpen", true);
   },

   closeModel : function(component, event, helper) {
      component.set("v.isOpen", false);
   },

   logInCallout : function (component, event, helper){
      helper.logInCalloutHelper(component);
   },

   sendCode : function (component, event, helper){
      helper.sendCodeHelper(component);
   },

   applyCode : function (component, event, helper){
      helper.applyCodeHelper(component);
   },

   getMyOrder : function (component, event, helper){
      helper.getMyOrderHelper(component);
   },

   longCheckName : function (component, event, helper){
      let name = component.get("v.name");
      let maxSize = 16;
      if(name.length > maxSize){
         component.set("v.name",name.slice(0, maxSize));
     }
   },

   longCheckEmail : function (component, event, helper){
      let email = component.get("v.email");
      let maxSize = 36;
      if(email.length > maxSize){
         component.set("v.email",email.slice(0, maxSize));
      }
   },

   longCheckCode : function (component, event, helper){
      let code = component.get("v.code");
      let maxSize = 16;
      if(code.length>maxSize){
         component.set("v.code",code.slice(0, maxSize));
      }
   },
});