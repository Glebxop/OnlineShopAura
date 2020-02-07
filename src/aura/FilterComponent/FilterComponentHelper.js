/**
 * Created by Master on 05.12.2019.
 */

({

    submitHelper : function(cmp, event) {
       let appEvent = $A.get("e.c:FilterEvent");
       appEvent.fire();
    },

    cleanHelper : function(cmp, event) {
       component.set("v.dependingType","---None---");
       component.set("v.dependingSubtype","---None---");
    }

});