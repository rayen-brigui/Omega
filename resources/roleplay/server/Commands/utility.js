import * as chat from 'chat';
import alt from 'alt-server';




chat.registerCmd('coords', player => {
    const coords = player.pos;
    player.send(JSON.stringify(coords));                //get player coords
    console.log(coords);
});


chat.registerCmd('sped',(player) => {
    alt.emitClient(player,'spawnped')
})



chat.registerCmd('tp', (player) => {

    alt.emitClient(player,'tpto');
  });                                                     // requesting teleporting the player using the command              


  chat.registerCmd('br',brmsg);
  function brmsg(player,msg) {
      chat.broadcast(msg);
      
  };





  chat.registerCmd('sm',spmodel)
  function spmodel(player,args)
{
    var model1= args[0];
 try                                            //change ped model
    {
       player.model = model1;
       player.send('your model has been set');
       
    } catch(err){
        console.log(err);
    }
};




