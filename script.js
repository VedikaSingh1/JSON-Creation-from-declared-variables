const bankIdArray = [{ "bankId": "a", "bankName": "aaaaaaaaa" }, { "bankId": "b", "bankName": "bbbbbbbbb" }, { "bankId": "c", "bankName": "cccccc" }];
const bankUserArrayOfObject = [{ "bankUserId": "1", "bankId": "a", "registrationCode": "x", "userId": "1.1" }, { "bankUserId": "2", "bankId": "b", "registrationCode": "y", "userId": "1.2" }, { "bankUserId": "3", "bankId": "c", "registrationCode": "z", "userId": "1.3" }];
const userArrayOfObject = [{ "userId": "1.1", "country": "IN", "language": "en", "emailId": "1@gmail.com", "federatedUserId": "ddd" }, { "userId": "1.2", "country": "FR", "language": "fr", "emailId": "2@gmail.com", "federatedUserId": "ffff" }, { "userId": "1.3", "country": "SP", "language": "it", "emailId": "3@gmail.com", "federatedUserId": "ggg" }];

function generateNotificationData(bankIdArray, bankUserArrayOfObject, userArrayOfObject) {
    const userMap = userArrayOfObject.reduce((acc, user) => {
        acc[user.userId] = user;
        return acc;
    }, {});

    return bankUserArrayOfObject.map(bankUser => {
        const bank = bankIdArray.find(bank => bank.bankId == bankUser.bankId);
        const user = userMap[bankUser.userId];

        return {
            sourceTrackingId: bankUser.userId,
            notificationName: "DE-Welcome User",
            data:{
                bankId: bank.bankId,
                bankName: bank.bankName,
                bank_user_id: bankUser.bankUserId,
                registrationCode: bankUser.registrationCode
            },
            receiverDetails: [
                {
                    language: user.language,
                    country: user.country,
                    emailId: user.emailId,
                    federatedUserId: user.federatedUserId
                }
            ]
        };
    });
}

const result = generateNotificationData(bankIdArray, bankUserArrayOfObject, userArrayOfObject);
const result2 = JSON.stringify(result, null, 4);
console.log(result2);

//console.log(JSON.stringify(result, null, 4));

/*
SAMPLE INPUT:
const bankIdArray = [{ "bankId": "a", "bankName": "aaaaaaaaa" }, { "bankId": "b", "bankName": "bbbbbbbbb" }, { "bankId": "c", "bankName": "cccccc" }];
const bankUserArrayOfObject = [{ "bankUserId": "1", "bankId": "a", "registrationCode": "x", "userId": "1.1" }, { "bankUserId": "2", "bankId": "b", "registrationCode": "y", "userId": "1.2" }, { "bankUserId": "3", "bankId": "c", "registrationCode": "z", "userId": "1.3" }];
const userArrayOfObject = [{ "userId": "1.1", "country": "IN", "language": "en", "emailId": "1@gmail.com", "federatedUserId": "ddd" }, { "userId": "1.2", "country": "FR", "language": "fr", "emailId": "2@gmail.com", "federatedUserId": "ffff" }, { "userId": "1.3", "country": "SP", "language": "it", "emailId": "3@gmail.com", "federatedUserId": "ggg" }];


Expected Output:

[
    {
        "sourceTrackingId": "1.1",
        "notificationName": "DE-Welcome User",
        "data": {
            "bankId": "a",
            "bankName": "aaaaaaaaa",
            "bank_user_id": "1",
            "registrationCode": "x"
        },
        "receiverDetails": [
            {
                "language": "en",
                "country": "IN",
                "emailId": "1@gmail.com",
                "federatedUserId": "ddd"
            }
        ]
    },
    {
        "sourceTrackingId": "1.2",
        "notificationName": "DE-Welcome User",
        "data": {
            "bankId": "b",
            "bankName": "bbbbbbbbb",
            "bank_user_id": "2",
            "registrationCode": "y"
        },
        "receiverDetails": [
            {
                "language": "fr",
                "country": "FR",
                "emailId": "2@gmail.com",
                "federatedUserId": "ffff"
            }
        ]
    },
    {
        "sourceTrackingId": "1.3",
        "notificationName": "DE-Welcome User",
        "data": {
            "bankId": "c",
            "bankName": "cccccc",
            "bank_user_id": "3",
            "registrationCode": "z"
        },
        "receiverDetails": [
            {
                "language": "it",
                "country": "SP",
                "emailId": "3@gmail.com",
                "federatedUserId": "ggg"
            }
        ]
    }
]

*/