import alt from 'alt-client';
import native from 'natives';
import * as chat from 'chat';
import * as notify from '../system/notification/notification';

let webViewAuth = null;
let webViewAuthCam = null;
let cam;

let vista = {
    x:-1850.127,
    y:-1231.751,
    z:13.017
}


alt.onServer("client:auth:load", () => {
    if (webViewAuth == null) {
       alt.toggleGameControls(false);
//Hide HUD and Radar
native.displayHud(false);
native.displayRadar(false);

//Setup vista camera
native.destroyAllCams(true);                                                                          
cam = native.createCamWithParams('DEFAULT_SCRIPTED_CAMERA',-2031.91650390625,
-1194.5010986328125,
49.904052734375,0/*up&down*/, 0/*tilt*/,325/*sidetoside*/, 75/*fov*/, true, 0);
native.setCamActive(cam, true);
native.renderScriptCams(true, false, 0, true, false, 0);
native.setCamAffectsAiming(cam, false);
alt.showCursor(true);
     
                                         //Display login page
        webViewAuth = new alt.WebView("http://resource/client/athentication/web/index.html");
        webViewAuth.focus();
        console.log(alt.LocalStorage.get('username'),alt.LocalStorage.get('password'));
        webViewAuth.emit('savedData',alt.LocalStorage.get('username'),alt.LocalStorage.get('password'))
            
        webViewAuth.on("client:auth:login:send:data", (account_name, account_password,rememberMe) => {
            console.log(account_name, account_password,rememberMe);
           if (rememberMe){
                    alt.LocalStorage.set('username', account_name);
                    alt.LocalStorage.set('password', account_password);
                    alt.LocalStorage.save;
                alt.log(rememberMe);    
            }
            
            alt.emitServer("server:auth:validate:data", account_name, account_password);
            alt.setMeta('sessionUsername',account_name);
            
        });

        webViewAuth.on("client:auth:register:send:data", (account_name,account_email, account_password,pass2) => {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(account_email)) {
              if (account_name.length<4) 
              {
                notify.littleNotification('<center><strong>Username must be longer!</strong></center>',"danger");
                
              } else {
                  if (!(pass2=account_password)){  notify.littleNotification('<center><strong>Passwords do not Match </strong></center>',"danger");
                  }else {
                        alt.emitServer("server:auth:register:data", account_name,account_email, account_password);
                  } }
            } else{
                notify.littleNotification('<center><strong>You have entered an invalid email address!</strong></center>',"danger"); }
        });

	
		alt.onServer("client:auth:success", () => {
			webViewAuth.destroy();
            notify.littleNotification('<center><strong>Welcome Back!</strong></center>',"success");
            
			//alt.showCursor(false)
			//alt.toggleGameControls(true);
			//native.destroyAllCams(true);  
			//native.renderScriptCams(false, true,5000, true,true,0);
			native.destroyCam(cam, true);
			//native.setFollowPedCamViewMode(1);
			native.clearFocus();
			//native.newLoadSceneStop();
			//native.displayRadar(true);
           // native.displayHud(true);
		//@replaces colors
			native.replaceHudColourWithRgba(142,255, 125, 0, 255);
			native.replaceHudColourWithRgba(143, 255, 125, 0, 255);
			native.replaceHudColourWithRgba(144, 255, 125, 0, 255);
			native.replaceHudColourWithRgba(145, 255, 125, 0, 255);
            alt.emit('islogin');
		});

        alt.on('changecam',()=>{
            alt.toggleGameControls(true);
            native.destroyAllCams(true);  
			native.renderScriptCams(false, true,3000, true,true,0);
			//native.destroyCam(cam, true);
			native.setFollowPedCamViewMode(1);
			native.clearFocus();
            alt.showCursor(false)
			native.newLoadSceneStop();
            native.displayRadar(true);
            native.displayHud(true);
        });
    }
});
