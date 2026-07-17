export const modQueue = [
  {id:'MOD-901',content:'"Everyone from that place is..."',type:'Comment',user:'@kabirm',flag:'Hate speech',confidence:92,status:'Pending',claimedBy:null,scores:{Hate:92,Harassment:41,Spam:3,Violence:2},history:{strikes:2,lastAction:'Warned on Jun 12 for hate speech'},media:null},
  {id:'MOD-902',content:'[Image] Promotional crypto scheme',type:'Post',user:'@spammer99',flag:'Scam/Fraud',confidence:87,status:'Pending',claimedBy:null,scores:{Scam:87,Spam:76,Hate:2,Violence:1},history:{strikes:5,lastAction:'Suspended on May 30 for spam'},media:'https://picsum.photos/seed/crypto1/480/320'},
  {id:'MOD-903',content:'"Reply to this or I will..."',type:'Message',user:'@priya.n',flag:'Threat',confidence:95,status:'Escalated',claimedBy:'Sam Torres',scores:{Threat:95,Harassment:88,Hate:12,Violence:34},history:{strikes:3,lastAction:'Banned on Jul 08 for harassment (appeal pending)'},media:null},
  {id:'MOD-904',content:'[Video] Graphic content flagged',type:'Reel',user:'@weiz',flag:'Violence',confidence:78,status:'Pending',claimedBy:null,scores:{Violence:78,Hate:9,Spam:1,Scam:0},history:{strikes:1,lastAction:'No prior actions'},media:'https://picsum.photos/seed/reel1/480/320'},
  {id:'MOD-905',content:'"DM me for followers fast"',type:'Comment',user:'@growthbot1',flag:'Spam',confidence:99,status:'Auto-hidden',claimedBy:null,scores:{Spam:99,Scam:44,Hate:0,Violence:0},history:{strikes:8,lastAction:'Auto-hidden 12 times in past month'},media:null},
  {id:'MOD-906',content:'[Image] Suspicious nudity flag on art post',type:'Post',user:'@sofia.r',flag:'Nudity',confidence:58,status:'Pending',claimedBy:null,scores:{Nudity:58,Violence:3,Hate:1,Spam:2},history:{strikes:0,lastAction:'No prior actions'},media:'https://picsum.photos/seed/art2/480/320'},
];

export const appeals = [
  {id:'APL-201',user:'@priya.n',originalAction:'Banned for harassment',submitted:'Jul 08',reason:'"I was defending myself, the other user started it."',status:'Under review'},
  {id:'APL-200',user:'@growthbot1',originalAction:'Content auto-hidden repeatedly',submitted:'Jul 06',reason:'"This is a legit business account, not spam."',status:'Denied'},
  {id:'APL-199',user:'@weiz',originalAction:'Post removed for violence',submitted:'Jul 05',reason:'"This was educational self-defense content."',status:'Approved'},
];

export const reviewers = [
  {name:'Sam Torres',active:3,capacity:8,online:true},
  {name:'Nadia Khan',active:5,capacity:8,online:true},
  {name:'You (Riya Kapoor)',active:1,capacity:6,online:true},
];
