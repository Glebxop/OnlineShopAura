/**
 * Created by Master on 29.11.2019.
 */

({

    getProducts : function(component, page, recordToDisplay) {
       let min = component.get("v.min");
       let max=component.get("v.max");
       if(min==""){
          min=null;
       }
       if(max==""){
          max=null;
       }
       let type=component.get("v.dependingType");
       let subType=component.get("v.dependingSubtype");
       let action = component.get("c.fetchProduct");
       action.setParams({
                        "pageNumber": page,
                        "recordToDisply": recordToDisplay,
                        'min' : min,
                        'max' : max,
                        'type' : type,
                        'subtype' : subType
                      });
       action.setCallback(this, function(a) {
           if (a.getState() === 'SUCCESS') {
              let result = a.getReturnValue();
              component.set("v.products", result.products);
       		  component.set("v.page", result.page);
       		  component.set("v.total", result.total);
       		  component.set("v.pages", Math.ceil(result.total / recordToDisply));
           } else {
              this.showToast({"title": "Sorry",
                              "message": response.getError()
                             });
           }
       });
       $A.enqueueAction(action);
    },

    toBasketHelper : function(cmp, addingId){
        let products = cmp.get("v.products");
        let basket = cmp.get("v.basket");
        let isAddToBasket = true;
        for (let i = 0; i < basket.length; i++) {
           if(addingId == basket[i].Id){
              isAddToBasket=false;
              break;
           }
        }
        if(isAddToBasket){
        for (let a = 0; a < products.length; a++) {
           if(addingId == products[a].Id){
              products[a].count=1;
              basket.push(products[a]);
              break;
           }
        }
        cmp.set("v.basket",basket);}
    },

    detailsHelper : function ( component, detailProduct ){
        component.set("v.detailProduct",detailProduct);
        component.set("v.isDetail",true);
    },
    showToast:function(params){
            let toastEvent=$A.get("e.force:showToast");
            toastEvent.setParams(params);
            toastEvent.fire();
        },
});