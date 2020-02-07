/**
 * Created by Master on 22.11.2019.
 */

public class LoginController {

    @AuraEnabled
    public static Id login(String name, String email) {
        Contact contact;
        List<Contact> contacts = getContacts(name, email);
        if (!contacts.isEmpty()) {
            contact = contacts.get(0);
        }
        if (contact == null) {
            throw new ShopException('You did not register or wrong name or email');
        }
        if (contact.Activ__c) {
            return contact.Id;
        } else {
            throw new ShopException('You did not activate your account');
        }
    }
    private static List<Contact> getContacts(String name, String email) {
        return [
                SELECT Id,Name__c,Email__c,Activ__c,Active_Code__c
                FROM Contact
                WHERE Name__c = :name AND Email__c = :email
                LIMIT 1
        ];
    }

    @AuraEnabled
    public static Id applyCodeController(String name, String email, String codeFromEmail) {
        Contact contact;
        List<Contact> contacts = getContacts(name, email);
        if (contacts.size() > 0) {
            contact = contacts.get(0);
        } else {
            throw new ShopException('You do not register or wrong name or email');
        }
        if (contact.Active_Code__c == codeFromEmail) {
            contact.Activ__c = true;
            update contact;
            return contact.Id;
        } else {
            throw new ShopException('You code is wrong');
        }

    }

    @AuraEnabled
    public static Boolean sendCodeController(String name, String email) {
        Contact contact = new Contact();
        contact.LastName = name;
        contact.Name__c = name;
        contact.Email__c = email;
        try {
            insert contact;
            contact = [
                    SELECT Id,Active_Code__c,Email__c
                    FROM Contact
                    WHERE Id = :contact.Id
            ];
            sendMessage(contact.Email__c, 'Code', 'Your code is ' + contact.Active_Code__c);
            return true;
        } catch (DmlException e) {
            String dmlExceString = '';
            for (Integer i = 0; i < e.getNumDml(); i++) {
                dmlExceString += e.getDmlMessage(i);
            }
            if (dmlExceString.containsIgnoreCase('duplicate value found')) {
                dmlExceString = 'This name or email is busy';
            }
            throw new ShopException(dmlExceString);
        } catch (EmailException e) {
            throw new ShopException(e.getCause());
        }
    }

    private static void sendMessage(String email, String subject, String textMessage) {
        Messaging.SingleEmailMessage emailMessage = new Messaging.SingleEmailMessage();
        List<String> address = new List<String>();
        address.add(email);
        emailMessage.setToAddresses(address);
        emailMessage.setSubject(subject);
        emailMessage.setPlainTextBody(textMessage);
        try {
            Messaging.sendEmail(new Messaging.SingleEmailMessage[]{
                    emailMessage
            });
        } catch (EmailException e) {
            throw e;
        }
    }

    @AuraEnabled
    public static void orderProductsController(Map<Id, Integer> basket, Id contactId, Datetime timeOfDispatch, Integer totalCount) {
        List <Order_from_shop_item__c> orderItems = new List <Order_from_shop_item__c>();
        Contact contact = [
                SELECT Id,Email__c,Name__c
                FROM Contact
                WHERE Id = :contactId
                LIMIT 1
        ];
        Order_from_shop__c orderFromShop = new Order_from_shop__c();
        orderFromShop.ContactId__c = contactId;
        orderFromShop.Dispatch_time__c = timeOfDispatch;
        orderFromShop.Total_cost__c = totalCount;
        insert orderFromShop;

        String orderItem = 'Dear ' + contact.Name__c + ' your order includes:\n';
        for (Id id : basket.keySet()) {
            orderItems.add(new Order_from_shop_item__c(
                    ProdId__c = id,
                    Quantity__c = basket.get(id),
                    Order_from_shop__c = orderFromShop.Id)
            );
        }
        insert orderItems;
        List<Product2>products = [
                SELECT Id,Name
                FROM Product2
                WHERE Id IN :basket.keySet()
        ];
        for (Product2 product : products) {
            orderItem += product.Name + '*' + basket.get(product.Id) + ';\n';
        }

        orderItem += '\n' + 'Total cost: ' + totalCount + '$' + '\nDate of dispatch: ' + timeOfDispatch;
        sendMessage(contact.Email__c, 'Order', orderItem);

    }


}