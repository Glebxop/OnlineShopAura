

({
    showToast:function(params){
        let toastEvent=$A.get("e.force:showToast");
        toastEvent.setParams(params);
        toastEvent.fire();
    },

    checkEmailHelper : function(email){
        let regExpEmailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = $A.util.isEmpty(email) && email.match(regExpEmailformat);
        return isValid;
    },

    checkNameHelper : function(name){
        let regExpNameFormat = /^[a-zA-Z1-9]{3,10}$/;
        let isValid = $A.util.isEmpty(name) && name.match(regExpNameFormat);
        return isValid;
    },

    logInCalloutHelper : function(component){
        let name=component.get("v.name");
        let email=component.get("v.email");
        let checkName = this.checkNameHelper(name);
        let checkEmail =  this.checkEmailHelper(email);
        if(checkName&&checkEmail){
           component.set("v.showError",false);
           let action = component.get('c.login');
           action.setParams({
                            'name' : component.get("v.name"),
                            'email' : component.get("v.email")
                           });
           action.setCallback(this,function(response){
           if(response.getState() === 'SUCCESS') {
              component.set("v.header","Date of dispatch");
              component.set("v.showError",false);
              component.set("v.contactId",response.getReturnValue());
              $A.util.removeClass(component.find('orderDiv'), 'slds-hide');
              $A.util.addClass(component.find('loginDiv'), 'slds-hide');
           } else {
              let errors = response.getError();
              if (errors && errors[0] && errors[0].message) {
                component.set("v.showError",true);
                component.set("v.errorMessage",errors[0].message);
              }
           }
           });
        $A.enqueueAction(action);
        }else{
           component.set("v.showError",true);
           component.set("v.errorMessage","Wrong name or email. Only Number and letters.From 3 to 10.");   }
    },


    sendCodeHelper : function(component){
        let name=component.get("v.name");
        let email=component.get("v.email");
        let checkName = this.checkNameHelper(name);
        let checkEmail =  this.checkEmailHelper(email);
        if(checkName&&checkEmail){
           let action = component.get("c.sendCodeController");
           action.setParams({
                            'name' : name,
                            'email' : email
                           });
           action.setCallback(this,function(response){
           if(response.getState() === 'SUCCESS') {
              component.set("v.showError",false);
              $A.util.removeClass(component.find('codeInputDiv'), 'slds-hide');
              this.showToast({"title": "Success!",
                              "message": "Check your email."
                             })
           } else {
              let errors = response.getError();
              if (errors && errors[0] && errors[0].message) {
                 component.set("v.showError",true);
                 component.set("v.errorMessage",errors[0].message);
              }
           }
           });
        $A.enqueueAction(action);
        }
        else{
           component.set("v.showError",true);
           component.set("v.errorMessage","Wrong name or email. Only Number and letters.From 3 to 10.");
        }
    },

    applyCodeHelper : function(component){
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
        if(response.getState() === 'SUCCESS') {
           component.set("v.showError",false);
           component.set("v.contactId",response.getReturnValue());
           $A.util.removeClass(component.find('orderDiv'), 'slds-hide');
           $A.util.addClass(component.find('registrationDiv'), 'slds-hide');
           component.set("v.header","Date of dispatch");
        } else {
           let errors = response.getError();
           if (errors && errors[0] && errors[0].message) {
               component.set("v.showError",true);
               component.set("v.errorMessage",errors[0].message);
           }
           }
        });
        $A.enqueueAction(action);
    },
    checkTime : function ( component ){
        let timeOfDispatch = component.get("v.dateTimeOFDispatch");
        let dispatch = new Date(timeOfDispatch);
        let dateNow = new Date();
        let isRight = dispatch.getTime()<=dateNow.getTime();
        return isRight;
    },

    isOrderTrue : function (component){
        component.set("v.showError",false);
        let map = new Map();
        let basket=component.get("v.basket");
        let contId = component.get("v.contactId");
        let timeOfDispatch = component.get("v.dateTimeOFDispatch");
        let totalCost = component.get("v.totalValue");
        for(let i = 0; i < basket.length; i++){
            map.set(basket[i].Id,basket[i].count);
        }
        let json =  Object.fromEntries(map);
        let action = component.get('c.orderProductsController');
        action.setParams({
                         'basket' : json,
                         'contactId' : contId,
                         'timeOfDispatch' : timeOfDispatch,
                         'totalCount' : totalCost
                         });
        action.setCallback(this,function(response){
        if(response.getState() === 'SUCCESS') {
           component.set("v.showError",false);
           component.set("v.isOpen",false);
           component.set("v.basket",[]);
           component.set("v.isBasket",true);
           this.showToast({"title": "Success!",
                           "message": "Order is accepted."})
           let appEvent = $A.get("e.c:Cleaner");
           appEvent.fire();
        } else {
           let errors = response.getError();
           if (errors && errors[0] && errors[0].message) {
              component.set("v.showError",true);
              component.set("v.errorMessage",errors[0].message);
           }
        }
        });
        $A.enqueueAction(action);
    },

    getMyOrderHelper : function ( component ){
        if(this.checkTime(component)){
            component.set("v.showError",true);
            component.set("v.errorMessage","Please fill required fields");
        }else{
           this.isOrderTrue(component);
        }
    }


});