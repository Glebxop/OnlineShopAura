/**
 * Created by Master on 29.11.2019.
 */

public with sharing class OrderItemTriggerHandler {

    public static void afterInsert(List<Order_from_shop_item__c> orderItems) {

        Map<Id, Integer> productsId = new Map<Id, Integer>();
        for (Order_from_shop_item__c orderFromShop : orderItems) {
            productsId.put(orderFromShop.ProdId__c, Integer.valueOf(orderFromShop.Quantity__c));
        }

        List<Product2> products = [SELECT Id,Number_of_product__c FROM Product2 WHERE Id IN :productsId.keySet()];
        for (Product2 product : products) {
            product.Number_of_product__c = product.Number_of_product__c - productsId.get(product.Id);
        }

        update products;
    }

}