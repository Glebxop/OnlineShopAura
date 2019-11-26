/**
 * Created by Master on 25.11.2019.
 */

({
    showToast:function(params){
                      	    var toastEvent=$A.get("e.force:showToast");
                      	    toastEvent.setParams(params);
                      	    toastEvent.fire();
                       }
});