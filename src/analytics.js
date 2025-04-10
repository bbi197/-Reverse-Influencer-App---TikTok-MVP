// functions/analytics.js
exports.trackMuteEconomics = functions.firestore
  .document('mutes/{creatorId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    
    await bigquery.dataset('mute_analytics')
      .table('transactions')
      .insert({
        creator_id: context.params.creatorId,
        duration_hours: data.hours,
        revenue_share: data.platformFee,
        timestamp: admin.firestore.Timestamp.now()
      });
  });