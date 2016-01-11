// event.js v3.4.1

(function(){
//---------------------------------------------------------------
// 起動時関連関数
//---------------------------------------------------------------
pzpr.addLoadListener = function(func){
	if(preinit){ loadfun.push(func);}
	else{ func();}
};

//----------------------------------------------------------------------
// 起動時処理実行処理
//----------------------------------------------------------------------
var preinit = true;
var loadfun = [];
function postload(e){
	if(preinit){
		preinit = false;
		for(var i=0;i<loadfun.length;i++){ loadfun[i]();}
		loadfun = [];
	}
}

if(pzpr.env.node){}
else if(document.readyState==='complete'){
	setTimeout(postload,10);
}
else if(!!document.addEventListener){
	document.addEventListener('DOMContentLoaded', postload, false);
	window.addEventListener('load', postload, false);
}
else{
	window.attachEvent('onload', postload);
}

//---------------------------------------------------------------------------
// addKeyEvents()  キーボード入力発生時に指定されたパズルへ通知する準備を行う
// exec????()      各パズルのキー入力へ分岐する
//---------------------------------------------------------------------------
var keytarget = null;
pzpr.addLoadListener(function addKeyEvents(){
	// キー入力イベントの設定
	pzpr.util.addEvent(document, 'keydown', pzpr, execKeyDown);
	pzpr.util.addEvent(document, 'keyup',   pzpr, execKeyUp);
});
function execKeyDown(e){
	if(!!keytarget && !!keytarget.key){ keytarget.key.e_keydown(e);}
}
function execKeyUp(e){
	if(!!keytarget && !!keytarget.key){ keytarget.key.e_keyup(e);}
}

//---------------------------------------------------------------------------
// connectKeyEvents()  キーボード入力に関するイベントを指定したパズルへ通知する準備を行う
//---------------------------------------------------------------------------
pzpr.connectKeyEvents = function(puzzle){
	keytarget = puzzle;
};

})();
