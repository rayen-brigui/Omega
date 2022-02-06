import * as sm from 'simplymongo';
new sm.Database('mongodb://127.0.0.1:27017', 'Omega', ['accounts','characters','vehicles']);

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