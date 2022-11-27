const sampleInput = [
  {
    "id": 3,
    "sourceAccount": "A",
    "targetAccount": "B",
    "amount": 100,
    "category": "eating_out",
    "time": "2018-03-02T10:34:30.000Z"
  },
  {
    "id": 1,
    "sourceAccount": "A",
    "targetAccount": "B",
    "amount": 100,
    "category": "eating_out",
    "time": "2018-03-02T10:33:00.000Z"
  },
  {
    "id": 6,
    "sourceAccount": "A",
    "targetAccount": "C",
    "amount": 250,
    "category": "other",
    "time": "2018-03-02T10:33:05.000Z"
  },
  {
    "id": 4,
    "sourceAccount": "A",
    "targetAccount": "B",
    "amount": 100,
    "category": "eating_out",
    "time": "2018-03-02T10:36:00.000Z"
  },
  {
    "id": 2,
    "sourceAccount": "A",
    "targetAccount": "B",
    "amount": 100,
    "category": "eating_out",
    "time": "2018-03-02T10:33:50.000Z"
  },
  {
    "id": 5,
    "sourceAccount": "A",
    "targetAccount": "C",
    "amount": 250,
    "category": "other",
    "time": "2018-03-02T10:33:00.000Z"
  }
];

function findDuplicateTransactions (transactions = []) {
  var duplicatedTrans = [];
  //just for the duplicatedTrans should be in ascending order
    duplicatedTrans = transactions.sort((a,b)=> a.time.localeCompare(b.time));
    
    duplicatedTrans = duplicatedTransactions(duplicatedTrans);
    duplicatedTrans = groupTransaction(duplicatedTrans);

    return duplicatedTrans;
}
function duplicatedTransactions (transactions = []) {
  var result = [];
  for (const item of transactions) {
    let lengthOfcheckInArray = 0;
    for(const item2 of transactions) {

      if(item.id !== item2.id) {
        if(
          Math.abs(new Date(item.time) - new Date(item2.time)) <= 60000 && 
          item.amount === item2.amount && 
          item.sourceAccount === item2.sourceAccount && 
          item.targetAccount === item2.targetAccount && 
          item.category === item2.category
          ) {
            break;
        }else{
          lengthOfcheckInArray ++;
        }
      }
    }
    if (lengthOfcheckInArray === transactions.length - 1) {
      result.push(item);
    }
  }
  // duplicated transactions that are not unique
  return transactions.filter(trans => !result.includes(trans));
}
function groupTransaction (transactions = []) {
  var result = [];

  var group = transactions.reduce((r, a) => {
    r[a.category] = [...r[a.category] || [], a];
    return r;
  }, {});

  result = Object.values(group);

  return result;
}

console.log(findDuplicateTransactions(sampleInput));