/**
 * Created by Master on 21.11.2019.
 */

public with sharing class ProductTableController {
    @AuraEnabled
    public static List<Product2> getProducts() {
        return [SELECT Id,Name,Description,Picture__c,Price__c,Number_of_product__c FROM Product2];
    }
    /*@AuraEnabled
    public static Map<Id, Product2> getProducts() {
        Map<Id, Product2> products = new Map<Id, Product2>();
        for (Product2 product : [SELECT Id,Name,Description,Picture__c,Price__c FROM Product2]) {
           products.put(product.Id,product);
        }
        return products;
    }*/
}