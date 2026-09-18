(function(){
  const mk=(arr)=>arr.map(([id,name])=>({id,name}));
  const corePrimary=mk([['mathematics','Mathematics'],['english','English Studies'],['basic-science','Basic Science']]);
  const upperPrimary=mk([['mathematics','Mathematics'],['english','English Studies'],['basic-science-tech','Basic Science & Technology'],['digital-literacy','Basic Digital Literacy']]);
  const jss=mk([['mathematics','Mathematics'],['english','English Studies'],['intermediate-science','Intermediate Science'],['digital-technologies','Digital Technologies'],['business-studies','Business Studies']]);
  const ssCore=mk([['mathematics','General Mathematics'],['english','English Language'],['digital-technologies','Digital Technologies']]);
  const ssScience=mk([['biology','Biology'],['chemistry','Chemistry'],['physics','Physics'],['further-maths','Further Mathematics']]);
  const ssBusiness=mk([['economics','Economics'],['accounting','Financial Accounting'],['commerce','Commerce'],['marketing','Marketing']]);
  const ssHumanities=mk([['government','Government'],['literature','Literature in English'],['history','Nigerian History']]);
  window.ETHAN_CURRICULUM={classes:[
    ...[1,2,3].map(n=>({id:`basic-${n}`,name:`Basic ${n}`,stage:'Basic School',subjects:corePrimary})),
    ...[4,5].map(n=>({id:`basic-${n}`,name:`Basic ${n}`,stage:'Basic School',subjects:upperPrimary})),
    ...[1,2,3].map(n=>({id:`jss-${n}`,name:`JSS ${n}`,stage:'Junior Secondary',subjects:jss})),
    ...[1,2,3].map(n=>({id:`ss-${n}`,name:`SS ${n}`,stage:'Senior Secondary',core:ssCore,pathways:{Science:ssScience,Business:ssBusiness,Humanities:ssHumanities}}))
  ]};
  window.ETHAN_SUBJECTS=[];
})();
