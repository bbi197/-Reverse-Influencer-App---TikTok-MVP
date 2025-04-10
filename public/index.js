// functions/index.js
exports.processMutePayment = functions.https.onCall(async (data, context) => {
    const {creatorId, hours, paymentMethod} = data;
    
    const db = admin.firestore();
    const batch = db.batch();
    
    const muteRef = db.collection('mutes').doc(creatorId);
    const creatorRef = db.collection('creators').doc(creatorId);
    
    batch.set(muteRef, {
      until: admin.firestore.Timestamp.fromDate(
        new Date(Date.now() + hours * 60 * 60 * 1000)
      ),
      paidAmount: calculateFee(hours),
      paymentMethod
    }, {merge: true});
    
    batch.update(creatorRef, {
      balance: admin.firestore.FieldValue.increment(calculatePayout(hours)),
      muteCount: admin.firestore.FieldValue.increment(1)
    });
    
    await batch.commit();
    
    return {status: 'success', mutedUntil: muteRef.until};
  });