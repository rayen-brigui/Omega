import * as sm from 'simplymongo';
<<<<<<< HEAD
new sm.Database('mongodb+srv://rayen:1234@cluster0.i00zm.mongodb.net/?retryWrites=true&w=majority', 'Omega', ['accounts','characters','vehicles']);
=======
new sm.Database('mongodb://127.0.0.1:27017', 'Omega', ['accounts','characters','vehicles','inventory']);



export async function findselectedchar(username2){
    console.log(username2);
    const db=sm.getDatabase();
    let data0=await db.fetchAllByField('username',username2,'characters');
    return data0[0];
  }


export async function ifExist(field,args,Database){
    const db=sm.getDatabase();
    let result=await db.fetchAllByField(field,args.toString(),Database);
    return (result.length>0)
}
export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
  function randomHex(len) {
    var maxlen = 8,
        min = Math.pow(16,Math.min(len,maxlen)-1),
        max = Math.pow(16,Math.min(len,maxlen)) - 1,
        n   = Math.floor( Math.random() * (max-min+1) ) + min,
        r   = n.toString(16);
    while ( r.length < len ) {
       r = r + randomHex( len - maxlen );
    }
    return r;
  };
//new sm.Database('mongodb+srv://rayen:0000@cluster0.xoqzj.mongodb.net/Omega?retryWrites=true&w=majority', 'Omega', ['accounts','characters','vehicles'],'rayen','0000');

/*export async function insert_data(data,collections) {
    
 const  result= await db.insertData(data,collections,true);
    return (result);
}

export async function update_data(field,value,data,collectionName) {
    
    const res = find_data(field,value,collectionName);
    res=res[0]._id;
    await db.updatePartialData(res,data,collectionName);
}
export async function find_data(FieldName,Value) {
    
    const matches = await db.fetchAllByField(FieldName,Value,'accounts');
    return (matches);
}
let x=find_data('username','rayen');
console.log(x);*/
>>>>>>> b8bcb244e9e0d4129bcbb4e781c56aaee452cf8a
