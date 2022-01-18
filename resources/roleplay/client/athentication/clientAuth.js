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
cam = native.createCamWithParams('DEFAULT_SCRIPTED_CAMERA', 
-1835.3670654296875,
 -1471.5032958984375,
 25.03369140625,
                                 0/*up&down*/, 0/*tilt*/, 305/*sidetoside*/, 75/*fov*/, true, 0);
native.setCamActive(cam, true);
native.renderScriptCams(true, false, 0, true, false, 0);
native.setCamAffectsAiming(cam, false);
alt.showCursor(true);
     
                                         //Display login page
        webViewAuth = new alt.WebView("http://resource/client/athentication/web/index.html");
        webViewAuth.focus();

        webViewAuth.on("client:auth:login:send:data", (account_name, account_password) => {
            alt.emitServer("server:auth:validate:data", account_name, account_password);
        });

        webViewAuth.on("client:auth:register:send:data", (account_name, account_password) => {
            alt.emitServer("server:auth:register:data", account_name, account_password);
        });
		
		alt.onServer("client:auth:success", () => {
			webViewAuth.destroy();
            notify.littleNotification('<center><strong>Welcome Back!</strong></center>',"success");
            
			alt.showCursor(false)
			alt.toggleGameControls(true);
			native.destroyAllCams(true);  

			native.renderScriptCams(false, true,5000, true,true,0);
			native.destroyCam(cam, true);
			native.setFollowPedCamViewMode(1);
			native.clearFocus();
			native.newLoadSceneStop();
			native.displayRadar(true);
            
			//@replaces colors
			native.replaceHudColourWithRgba(142, 255, 255, 33, 255);
			native.replaceHudColourWithRgba(143, 255, 255, 33, 255);
			native.replaceHudColourWithRgba(144, 255, 255, 33, 255);
			native.replaceHudColourWithRgba(145, 255, 255, 33, 255);
		});
    }
});
