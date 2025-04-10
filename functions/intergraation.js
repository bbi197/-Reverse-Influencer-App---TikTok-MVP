// src/lib/tiktok-integration.js
export const enforceMuteState = async (creatorId) => {
    const muteStatus = await checkMuteStatus(creatorId);
    
    if(muteStatus.active) {
      await tiktokAPI.updatePostingAbility(
        creatorId, 
        'RESTRICTED', 
        muteStatus.until
      );
    }
  };