/**
 * Created by Master on 22.11.2019.
 */

public with sharing class LoginController {

    @AuraEnabled
    public static Boolean login(String name, String email) {
        Contact contact;
        List< Contact> contacts = [
                SELECT Id,LastName,Email,Activ__c,Active_Code__c
                FROM Contact
                WHERE LastName = :name AND Email = :email
        ];
        if (contacts.size() > 0) {
            contact = contacts.get(0);
        }
        if (contact == null) {
            throw new ShopException('You did not register or wrong name or email');
        }
        if (contact.Activ__c) {
            return true;
        } else {
            throw new ShopException('You did not activate your account');
        }
    }

    @AuraEnabled
    public static Boolean applyCodeController(String name, String email, String codeFromEmail) {
        Contact contact;
        List<Contact> contacts = [
                SELECT Id,LastName,Email,Activ__c,Active_Code__c
                FROM Contact
                WHERE LastName = :name AND Email = :email
                LIMIT 1
        ];
        if (contacts.size() > 0) {
            contact = contacts.get(0);
        } else {
            throw new ShopException('You do not register or wrong name or email');
        }
        if (contact.Active_Code__c == codeFromEmail) {
            contact.Activ__c = true;
            update contact;
            return true;
        } else {
            throw new ShopException('You code is wrong');
        }

    }

    @AuraEnabled
    public static Boolean sendCodeController( String name, String email ) {
        Contact contact = new Contact(
                LastName = name, Email = email
        );
        try {
            insert contact;
            sendMessage( contact.Id );
            return true;
        } catch (DmlException e) {
            throw new ShopException(e.getCause());
        } catch (EmailException e) {
            throw new ShopException(e.getCause());
        }

/*Boolean isActivate;
Contact contactFromDb = new Contact();
List<Contact> contacts =[
        SELECT Id
        FROM Contact
        WHERE LastName = :name AND Email = :email
        LIMIT 1];
if (contacts.size()>0){
contactFromDb=contacts.get(0);}


if (contactFromDb != null && contactFromDb.Activ__c) {
    isActivate = true;
}
if (contactFromDb != null && !contactFromDb.Activ__c) {
    try {
        sendMessage(contactFromDb);
        isActivate = false;
    } catch (Exception e) {
        throw e;
    }

}

if (contactFromDb == null) {
    try {
        Contact contact = new Contact(LastName = name, Email = email);
        insert contact;
        sendMessage(contact);
        isActivate = false;
    } catch (Exception e) {
        throw e;
    }

}
return isActivate;*/
    }

    private static void sendMessage(Id contactId) {
        Contact contact = [SELECT Active_Code__c,Email FROM Contact WHERE Id = :contactId];
        Messaging.SingleEmailMessage emailMessage = new Messaging.SingleEmailMessage();
        List<String> address = new List<String>();
        address.add(contact.Email);
        emailMessage.setToAddresses(address);
        emailMessage.setSubject('Code');
        emailMessage.setPlainTextBody('Your code is ' + (contact.Active_Code__c));
        try {
            Messaging.sendEmail(new Messaging.SingleEmailMessage[]{
                    emailMessage
            });
        } catch (EmailException e) {
            throw e;
        }
    }

    @AuraEnabled
    public static void orderProductsController(List<Product2> basket){

        System.debug('Basket');
        System.debug(basket);
    }


}