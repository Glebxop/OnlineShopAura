/**
 * Created by Master on 21.11.2019.
 */

public with sharing class ProductTableController {

    public class ProductPagerWrapper {
        @AuraEnabled public Integer pageSize { get; set; }
        @AuraEnabled public Integer page { get; set; }
        @AuraEnabled public Integer total { get; set; }
        @AuraEnabled public List<Product2> products { get; set; }
    }


    @AuraEnabled
    public static ProductPagerWrapper fetchProduct(Decimal pageNumber, Integer recordToDisply, Integer min, Integer max, String type, String subtype) {
        Integer pageSize = recordToDisply;
        Integer offset = ((Integer) pageNumber - 1) * pageSize;
        String request = 'SELECT Id,Name,Description,Picture__c,Price__c,Number_of_product__c FROM Product2 Where Number_of_product__c > 0  ';
        String requestCount = 'SELECT count() FROM Product2 Where Number_of_product__c > 0  ';
        if (min == null || min < 0) {
            min = 0;
        }
        request += ' And Price__c >= ' + min;
        requestCount += ' And Price__c >= ' + min;
        if (max != null && max > 0) {
            request += ' And Price__c <= ' + max;
            requestCount += ' And Price__c <= ' + max;
        }
        if (String.isNotBlank(type) && type != null && type != '' && type != '--- None ---') {
            request += ' And Type__c = \'' + type + '\'';
            requestCount += ' And Type__c = \'' + type + '\'';
        }
        if (String.isNotBlank(subtype) && subtype != null && subtype != '--- None ---' && subtype != '') {
            request += ' And Subtype__c = \'' + subtype + '\'';
            requestCount += ' And Subtype__c = \'' + subtype + '\'';
        }
        request += ' ORDER BY Price__c LIMIT : recordToDisply  OFFSET : offset';
        return productPageWraperCreate(pageSize, pageNumber, requestCount, request);

    }
    private static ProductPagerWrapper productPageWraperCreate(Integer pageSize, Decimal pageNumber, String requestCount, String request) {
        ProductPagerWrapper obj = new ProductPagerWrapper();
        obj.pageSize = pageSize;
        obj.page = (Integer) pageNumber;
        obj.total = Database.countQuery(requestCount);
        obj.products = Database.query(request);
        return obj;
    }
}