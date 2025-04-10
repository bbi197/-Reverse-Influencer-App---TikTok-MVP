// src/lib/payment-processors/mpesa.js
export const initiateSTKPush = async (phone, amount) => {
    const response = await fetch(
      `https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getMpesaToken()}`
        },
        body: JSON.stringify({
          BusinessShortCode: '174379',
          Password: btoa(`174379${process.env.MPESA_PASSKEY}${timestamp}`),
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: amount,
          PartyA: phone,
          PartyB: '174379',
          PhoneNumber: phone,
          CallBackURL: `${process.env.FIREBASE_FUNCTIONS_URL}/mpesa-callback`,
          AccountReference: 'QuietCoin',
          TransactionDesc: 'Mute Payment' 
        })
      }
    );
    return response.json();
  };