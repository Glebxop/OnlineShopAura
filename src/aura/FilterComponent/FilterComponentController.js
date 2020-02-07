/**
 * Created by Master on 21.11.2019.
 */

({

  maxChange : function (cmp, event,helper){
     let max = cmp.get("v.max");
     if(max.toString().length>16){
        cmp.set("v.max",max.toString().slice(0, 16));
     }
  },

  minChange : function (cmp, event,helper){
     let min = cmp.get("v.min");
     if(min.toString().length>16){
        cmp.set("v.min",min.toString().slice(0, 16));
     }
  },

  submit : function(cmp, event,helper) {
      helper.submitHelper(cmp, event);
    },

  /*clean : function(cmp, event,helper) {
      helper.cleanHelper(cmp, event);
  }*/
});