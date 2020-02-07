/**
 * Created by Master on 29.11.2019.
 */

trigger OrderItemTrigger on Order_from_shop_item__c (after insert) {

    if (Trigger.isInsert){
        if (Trigger.isAfter){
            OrderItemTriggerHandler.afterInsert(Trigger.new);
        }
    }

}