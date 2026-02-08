function getTextFile(encd) {
	var myFile = document.getElementById("targetTextFiles").files[0];
	if (myFile.type.indexOf("text") == 0) {
		var reader = new FileReader();
		reader.onload = function(evt){
			var txt = evt.target.result; //ファイル内容を読み出し
			document.getElementById("textarea_v").value = txt;
			document.getElementById("textarea_h").value = txt;
			textscope = txt;
			henkan();
		}
		reader.readAsText(myFile, encd);
	}else{
		if(encd=="utf-8")alert('読み込めるのは.txt形式のファイルだけです。');		
	}
}

textscope = "";

function getTextFileAuto() {
	getTextFile('utf-8');
	if(!document.getElementById("textarea_v").value.match(/^[ぁ-んー　]*$/)){
		getTextFile('shift-jis');
	}
}

function TextFileTwice(){
	getTextFileAuto();
	$(function(){
		setTimeout(function(){
			getTextFileAuto();
		},10);
	});
}

function filechange(){
	if(document.getElementById("targetTextFiles").files[0]){
		TextFileTwice();
	}
}