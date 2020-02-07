/**
 * Created by Master on 27.11.2019.
 */

public with sharing class DependentPicklist {
    @AuraEnabled
    public static Map<String, List<String>> getDependentMap(sObject objDetail, string contrfieldApiName, string depfieldApiName) {
        String controllingField = contrfieldApiName.toLowerCase();
        String dependentField = depfieldApiName.toLowerCase();

        Map<String, List<String>> objResults = new Map<String, List<String>>();

        Schema.sObjectType objType = objDetail.getSObjectType();
        if (objType == null) {
            return objResults;
        }

        Map<String, Schema.SObjectField> objFieldMap = objType.getDescribe().fields.getMap();
        Boolean isContainKey = !objFieldMap.containsKey(controllingField) || !objFieldMap.containsKey(dependentField);
        if (isContainKey) {
            return objResults;
        }

        Schema.SObjectField theField = objFieldMap.get(dependentField);
        Schema.SObjectField ctrlField = objFieldMap.get(controllingField);

        List<Schema.PicklistEntry> contrEntries = ctrlField.getDescribe().getPicklistValues();
        List<PicklistEntryWrapper> depEntries = wrapPicklistEntries(theField.getDescribe().getPicklistValues());
        List<String> controllingValues = new List<String>();

        for (Schema.PicklistEntry picklistEntry : contrEntries) {
            String label = picklistEntry.getLabel();
            objResults.put(label, new List<String>());
            controllingValues.add(label);
        }

        for (PicklistEntryWrapper picklistEntryWrapper : depEntries) {
            String label = picklistEntryWrapper.label;
            String validForBits = base64ToBits(picklistEntryWrapper.validFor);
            for (Integer i = 0; i < validForBits.length(); i++) {
                String bit = validForBits.mid(i, 1);
                if (bit == '1') {
                    objResults.get(controllingValues.get(i)).add(label);
                }
            }
        }
        return objResults;
    }

    public static String decimalToBinary(Integer val) {
        String bits = '';
        while (val > 0) {
            Integer remainder = Math.mod(val, 2);
            val = Integer.valueOf(Math.floor(val / 2));
            bits = String.valueOf(remainder) + bits;
        }
        return bits;
    }

    public static String base64ToBits(String validFor) {
        String validForBits;
        if (String.isEmpty(validFor)) {
            validForBits = '';
        } else {
            for (Integer i = 0; i < validFor.length(); i++) {
                String thisChar = validFor.mid(i, 1);
                Integer val = BASE_CHARS.indexOf(thisChar);
                String bits = decimalToBinary(val).leftPad(6, '0');
                validForBits += bits;
            }
        }
        return validForBits;
    }

    private static final String BASE_CHARS = '' +
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
            'abcdefghijklmnopqrstuvwxyz' +
            '0123456789+/';


    private static List<PicklistEntryWrapper> wrapPicklistEntries(List<Schema.PicklistEntry> PLEs) {
        return (List<PicklistEntryWrapper>)
                JSON.deserialize(JSON.serialize(PLEs), List<PicklistEntryWrapper>.class);
    }

    public class PicklistEntryWrapper {
        public String active { get; set; }
        public String defaultValue { get; set; }
        public String label { get; set; }
        public String value { get; set; }
        public String validFor { get; set; }
        public PicklistEntryWrapper() {
        }

    }
}