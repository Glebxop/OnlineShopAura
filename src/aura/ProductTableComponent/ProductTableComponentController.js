({

  doInit: function(component, event, helper) {
      let page = component.get("v.page") || 1;
      let recordToDisply = 2;
      helper.getProducts(component, page, recordToDisply);
  },

  doFilter : function(component, event, helper) {
      component.set("v.page",1);
      helper.getProducts(component, 1, 2);
  },

  navigate: function(component, event, helper) {
      let page = component.get("v.page") || 1;
      let direction = event.getSource().get("v.label");
      let recordToDisply = 2
      page = direction === "Previous Page" ? (page - 1) : (page + 1);
      helper.getProducts(component, page, recordToDisply);
  },

  toBasket : function(cmp,ev,helper){
      helper.toBasketHelper(cmp,ev.getSource().get("v.value"));
  },

  details : function ( component, event, helper ){
      helper.detailsHelper(component, event.getSource().get("v.value"));
  },

  clean : function(cmp, event) {
      cmp.set("v.min",undefined);
      cmp.set("v.max",undefined);
      cmp.set("v.dependingType",undefined);
      cmp.set("v.dependingSubtype",undefined);
  }

});