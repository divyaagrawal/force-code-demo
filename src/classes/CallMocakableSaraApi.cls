public class CallMocakableSaraApi {

    @InvocableMethod(label='CallMocakableSaraApi')
    public static void postToSlack(List<Id> propertyId) {
        system.debug('propertyId'+propertyId);
    }
}