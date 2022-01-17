import alt from 'alt-client';
import native from 'natives';

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
cam = native.createCamWithParams('DEFAULT_SCRIPTED_CAMERA', vista.x + 100, vista.y - 300, vista.z + 60,
                                 0/*up&down*/, 0/*tilt*/, 305/*sidetoside*/, 75/*fov*/, true, 0);
native.setCamActive(cam, true);
native.renderScriptCams(true, false, 0, true, false, 0);
native.setCamAffectsAiming(cam, false);
alt.showCursor(true);

        /*const camPosition = { x: 450.718, y: 5566.614, z: 806.183 };
        const webViewAuthCam = native.createCamWithParams('DEFAULT_SCRIPTED_CAMERA', 0, 0, 0, 0, 0, 0, 10, false, 2);
        const getPointAt = (pos, angle) => { const p = {x: 0, y: 0}; let s = Math.sin(angle); let c = Math.cos(angle); p.x -= pos.x; p.y -= pos.y; let xnew = p.x * c - p.y * s; let ynew = p.x * s + p.y * c; p.x = xnew + pos.x; p.y = ynew + pos.y; return p; };
        let angle = 0;
        const interval = alt.setInterval(() => { const np = camPosition; const p  = getPointAt(np, angle); native.setCamCoord(webViewAuthCam, p.x + camPosition.x, p.y + camPosition.x, camPosition.z); native.pointCamAtCoord(webViewAuthCam, camPosition.x, camPosition.y, camPosition.z); angle += 0.00007; }, 16.666667);
        
        native.setCamActive(webViewAuthCam, true);
        native.renderScriptCams(true, true, 16.6667, false, false);
        native.newLoadSceneStartSphere(camPosition.x, camPosition.y, camPosition.z, 500, 0);
        native.displayRadar(false);

        alt.showCursor(true);
        alt.toggleGameControls(false);*/
                                              //Display login page
        webViewAuth = new alt.WebView("file:///C:/Users/rayen/Desktop/Omega/resources/roleplay/client/athentication/web/index.html");
        webViewAuth.focus();

        webViewAuth.on("client:auth:login:send:data", (account_name, account_password) => {
            alt.emitServer("server:auth:validate:data", account_name, account_password);
        });

        webViewAuth.on("client:auth:register:send:data", (account_name, account_password) => {
            alt.emitServer("server:auth:register:data", account_name, account_password);
        });
		
		alt.onServer("client:auth:success", () => {
			webViewAuth.destroy();
            
               
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
