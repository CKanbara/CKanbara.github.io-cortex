var honbun = '';
var c_for1,c_for2,c_for3,c_for4,c_for5,c_for6,c_for7,c_for8,c_for9,c_for10,c_for11,c_for12;
function henkan(){
	var tgplace = currenttab;
	var omitted = "";
	if(tgplace=="v"){
		honbun = document.forms.convert_v.before_v.value;
	}else if(tgplace=="h"){
		honbun = document.forms.convert_h.before_h.value;
	}
	//文字数表示
	if(honbun.length>=freeseigen+1){
		document.getElementById("mojisu1").innerHTML = "<span style='color:#FF0000'>"+honbun.length+'</span>';
		document.getElementById("mojisu2").innerHTML = "<span style='color:#FF0000'>"+honbun.length+'</span>';
		honbun = honbun.slice(0,freeseigen);
		if(freeseigen == 5000){
			omitted = '<div style="width:60%;padding:30px;margin:20px auto;border:solid 2px #DDD;">'+freeseigen+'字を超える文章の編集には<a href="howto.php" style="text-decoration: underline">サポーター会員</a>になる必要があります</div>';
		}else if(freeseigen == 3000){
			omitted = '<div style="width:60%;padding:30px;margin:20px auto;border:solid 2px #DDD;">'+freeseigen+'字を超える文章の編集には<a href="login.php" style="text-decoration: underline">Twitterと連携</a>するか<a href="howto.php" style="text-decoration: underline">サポーター会員</a>になる必要があります</div>';
		}
	}else{
		document.getElementById("mojisu1").innerHTML = honbun.length;
		document.getElementById("mojisu2").innerHTML = honbun.length;
	}
	//--------------------色の取得--------------------
	if(document.jouken.ColorForCheckbox1.value.length == 6) c_for1 = document.jouken.ColorForCheckbox1.value;
	if(document.jouken.ColorForCheckbox2.value.length == 6) c_for2 = document.jouken.ColorForCheckbox2.value;
	if(document.jouken.ColorForCheckbox3.value.length == 6) c_for3 = document.jouken.ColorForCheckbox3.value;
	if(document.jouken.ColorForCheckbox4.value.length == 6) c_for4 = document.jouken.ColorForCheckbox4.value;
	if(document.jouken.ColorForCheckbox5.value.length == 6) c_for5 = document.jouken.ColorForCheckbox5.value;
	if(document.jouken.ColorForCheckbox6.value.length == 6) c_for6 = document.jouken.ColorForCheckbox6.value;
	if(document.jouken.ColorForCheckbox7.value.length == 6) c_for7 = document.jouken.ColorForCheckbox7.value;
	if(document.jouken.ColorForCheckbox8.value.length == 6) c_for8 = document.jouken.ColorForCheckbox8.value;
	if(document.jouken.ColorForCheckbox9.value.length == 6) c_for9 = document.jouken.ColorForCheckbox9.value;
	if(document.jouken.ColorForCheckbox10.value.length == 6) c_for10 = document.jouken.ColorForCheckbox10.value;
	if(document.jouken.ColorForCheckbox11.value.length == 6) c_for11 = document.jouken.ColorForCheckbox11.value;
	if(document.jouken.ColorForCheckbox12.value.length == 6) c_for12 = document.jouken.ColorForCheckbox12.value;
	//--------------------URLを回避--------------------
	if(document.jouken.Checkbox13.checked){
		var urlarray = [];
		var i = -1;
		var regexp_url = /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g; // ']))/;
		var regexp_makeLink = function(all, url, h, href) {
			urlarray.push(url);
			i++;
			return '＆ｕｒｌｓｔ；' + String.fromCharCode(i.toString(10).charCodeAt(0) + 0xFEE0) + '＆ｕｒｌｅｎｄ；';
		}
	 
		honbun = honbun.replace(regexp_url, regexp_makeLink);
	}
	
	//--------------------英数を全角化--------------------
	if(document.jouken.Checkbox10.checked){
		honbun = honbun.replace(/[0-9]/g, function(s) {
			return "＆ｓｐｓｔｎ；"+String.fromCharCode(s.charCodeAt(0) + 0xFEE0)+"＆ｓｐｅｎｄ；";
		});
	}
	if(document.jouken.Checkbox11.checked){
		honbun = honbun.replace(/[a-zA-Z]/g, function(s) {
			return "＆ｓｐｓｔａ；"+String.fromCharCode(s.charCodeAt(0) + 0xFEE0)+"＆ｓｐｅｎｄ；";
		});
	}
	
	//--------------------エスケープ--------------------
	honbun = escapeHtml(honbun);
	
	//--------------------コードを処理--------------------
	if(document.jouken.Checkbox10.checked||document.jouken.Checkbox11.checked){
		honbun = honbun.replace(/(＆ｓｐｅｎｄ；＆ｓｐｓｔｎ；)|(＆ｓｐｅｎｄ；＆ｓｐｓｔａ；)/g,"");
		honbun = honbun.replace(/＆ｓｐｓｔｎ；/g,"<span style='background-color:#"+c_for10+"'>").replace(/＆ｓｐｅｎｄ；/g,"</span>");
		honbun = honbun.replace(/＆ｓｐｓｔａ；/g,"<span style='background-color:#"+c_for11+"'>").replace(/＆ｓｐｅｎｄ；/g,"</span>");
	}
	
	//--------------------形式段落の字下げ--------------------
	if(document.jouken.Checkbox1.checked==true){
		//本文を行ごとにスプリット
		var lines = honbun.split('\n');
		//一行ずつ見ていく
		for ( var i = 0; i < lines.length; i++ ) {
			if(lines[i] == '' ){
				//もし空行なら飛ばす
				continue;
			}else if(lines[i].charAt(0)!="　"){
				//空行以外で、一文字目がスペースでない
				if(document.jouken.Checkbox1_2.checked==true){
					//台詞にすら適用するとき
					lines[i] = "<span style='background-color:#"+c_for1+"'>　</span>"+lines[i];
				}else{
					//台詞には適用しないとき
					if(lines[i].charAt(0)!="「" && lines[i].charAt(0)!="（"&& lines[i].charAt(0)!="〝" && lines[i].slice(0,6)!='&quot;'&& lines[i].slice(0,4)!='<span'){
						lines[i] = "<span style='background-color:#"+c_for1+"'>　</span>"+lines[i];
					}
				}
			}
		}
		//終わったら全部をまとめる
		honbun = lines.join("\n");
	}
	
	//--------------------三点リーダの個数修正--------------------
	if(document.jouken.Checkbox2.checked==true){			
		honbun = honbun.replace(/…{3,}/g,"dotkarioki1");
		honbun = honbun.replace(/…{2}/g,"dotkarioki2");
		honbun = honbun.replace(/…{1}/g,"<span style='background-color:#"+c_for2+"'>……</span>");
		honbun = honbun.replace(/dotkarioki2/g,"……");
		honbun = honbun.replace(/dotkarioki1/g,"<span style='background-color:#"+c_for2+"'>……</span>");
	}
	
	//--------------------伸ばし棒をダッシュに--------------------
	if(document.jouken.Checkbox3.checked==true){			
		honbun = honbun.replace(/ー{2,}/g,"<span style='background-color:#"+c_for3+"'>――</span>");
	}
	
	//--------------------連続した空行を解消--------------------
	if(document.jouken.Checkbox4.checked==true){			
		honbun = honbun.replace(/\n{2,}/g,"\n<hr style='border:none;background-color:#"+c_for4+";height:3px;'>");
	}
	
	//--------------------疑問符や感嘆符の後にスペースを入れる--------------------
	if(document.jouken.Checkbox5.checked==true){		
		honbun = honbun.replace(/！(<\/span>)*([0-9]|[a-zA-Z]|[ぁ-ん]|[ァ-ヴ]|[ｦ-ﾟ]|[一-龥])/g,"！<span style='background-color:#"+c_for5+"'>　</span>$2");
		honbun = honbun.replace(/？(<\/span>)*([0-9]|[a-zA-Z]|[ぁ-ん]|[ァ-ヴ]|[ｦ-ﾟ]|[一-龥])/g,"？<span style='background-color:#"+c_for5+"'>　</span>$2");
		honbun = honbun.replace(/\?(<\/span>)*([0-9]|[a-zA-Z]|[ぁ-ん]|[ァ-ヴ]|[ｦ-ﾟ]|[一-龥])/g,"?<span style='background-color:#"+c_for5+"'>　</span>$2");
		honbun = honbun.replace(/!(<\/span>)*([0-9]|[a-zA-Z]|[ぁ-ん]|[ァ-ヴ]|[ｦ-ﾟ]|[一-龥])/g,"!<span style='background-color:#"+c_for5+"'>　</span>$2");
	}
	
	//--------------------疑問符や感嘆符を全角に修正--------------------
	if(document.jouken.Checkbox8.checked==true){			
		honbun = honbun.replace(/\!/g,"<span style='background-color:#"+c_for8+"'>！</span>");
		honbun = honbun.replace(/\?/g,"<span style='background-color:#"+c_for8+"'>？</span>");
	}
	
	//--------------------。。。や・・・や...を三点リーダに修正--------------------
	if(document.jouken.Checkbox6.checked==true){			
		honbun = honbun.replace(/。{2,}。/g,"<span style='background-color:#"+c_for6+"'>……。</span>");
		honbun = honbun.replace(/・{1,}・/g,"<span style='background-color:#"+c_for6+"'>……</span>");
		honbun = honbun.replace(/\.{1,}\./g,"<span style='background-color:#"+c_for6+"'>……</span>");
	}
	
	//--------------------""を“”に修正--------------------
	if(document.jouken.Checkbox7.checked==true){
			honbun = honbun.replace(/”(.*?)”/g,"<span style='background-color:#"+c_for7+"'>“</span>$1<span style='background-color:#"+c_for7+"'>”</span>");
			honbun = honbun.replace(/&quot;(.*?)&quot;/g,"<span style='background-color:#"+c_for7+"'>“</span>$1<span style='background-color:#"+c_for7+"'>”</span>");
			honbun = honbun.replace(/“(.*?)“/g,"<span style='background-color:#"+c_for7+"'>“</span>$1<span style='background-color:#"+c_for7+"'>”</span>");
			honbun = honbun.replace(/(&#x27;){2,}(.*?)(&#x27;){2,}/g,"<span style='background-color:#"+c_for7+"'>“</span>$2<span style='background-color:#"+c_for7+"'>”</span>");
	}
	
	//--------------------“”を〝〟に修正--------------------
	if(document.jouken.Checkbox9.checked==true){
			honbun = honbun.replace(/“(.*?)”/g,"<span style='background-color:#"+c_for9+"'>〝</span>$1<span style='background-color:#"+c_for9+"'>〟</span>");
	}
	
	//--------------------。」を」に修正--------------------
	if(document.jouken.Checkbox12.checked==true){
			honbun = honbun.replace(/。」/g,"<span style='background-color:#"+c_for12+"'>」</span>");
	}
	
	//--------------------URLを回避後半--------------------
	if(document.jouken.Checkbox13.checked){
		var matchkaisuu = ( honbun.match(/＆ｕｒｌｓｔ；([０-９]+)＆ｕｒｌｅｎｄ；/g) || [] ).length;
		for (var i = 0; i < matchkaisuu; i++) {
			zenkaku = String.fromCharCode(i.toString(10).charCodeAt(0) + 0xFEE0)
			honbun = honbun.replace("＆ｕｒｌｓｔ；"+zenkaku+"＆ｕｒｌｅｎｄ；",urlarray[i]);
		}
	}
	
	//--------------------ディスプレイの表示色を変更--------------------
	document.getElementById('Checkbox_div1').style.borderColor = '#'+c_for1;
	document.getElementById('Checkbox_div2').style.borderColor = '#'+c_for2;
	document.getElementById('Checkbox_div3').style.borderColor = '#'+c_for3;
	document.getElementById('Checkbox_div4').style.borderColor = '#'+c_for4;
	document.getElementById('Checkbox_div5').style.borderColor = '#'+c_for5;
	document.getElementById('Checkbox_div6').style.borderColor = '#'+c_for6;
	document.getElementById('Checkbox_div7').style.borderColor = '#'+c_for7;
	document.getElementById('Checkbox_div8').style.borderColor = '#'+c_for8;
	document.getElementById('Checkbox_div9').style.borderColor = '#'+c_for9;
	document.getElementById('Checkbox_div10').style.borderColor = '#'+c_for10;
	document.getElementById('Checkbox_div11').style.borderColor = '#'+c_for11;
	document.getElementById('Checkbox_div12').style.borderColor = '#'+c_for12;
	
	//--------------------最後の仕上げ--------------------
	//改行をHTMLに対応させる
	honbun = honbun.replace(/\n/g, '<br>');
	//テキストボックス風の空間に書き込み
	if(tgplace == "v"){
		target = document.getElementById("after_v");
	}else if(tgplace == "h"){
		target = document.getElementById("after_h");
	}

	target.innerHTML = honbun + omitted;
	ttgkkaku();
	
	//--------------------テキストボックスの大きさ修正--------------------
	document.forms.convert_h.before_h.style.height = 180+"px";
	if(honbun.length > 120){
		document.forms.convert_h.before_h.style.height = document.getElementById("after_h").clientHeight+50+"px";
	}
}

function escapeHtml(str){
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/>/g, '&gt;');
  str = str.replace(/</g, '&lt;');
  str = str.replace(/"/g, '&quot;');
  str = str.replace(/'/g, '&#x27;');
  str = str.replace(/`/g, '&#x60;');
  return str;
}

function copyToClipboard(){
  if(execCopy()){
    alert('コピーできました\r\n(Android等一部環境で改行が反映されない場合があります。\r\nその場合は「結果をテキストボックスにフィードバック」を押し、テキストボックスからコピー&ペーストすることをお勧めします。)');
  }
  else {
    alert('このブラウザでは対応していません');
  }
}

function execCopy(){
  // 空div 生成
  var tmp = document.createElement("div");
  // 選択用のタグ生成
  var pre = document.createElement('pre');
  // 親要素のCSSで user-select: none だとコピーできないので書き換える
  pre.style.webkitUserSelect = 'auto';
  pre.style.userSelect = 'auto';
  tmp.appendChild(pre).textContent = honbun.replace(/<br>/g,"\n").replace(/<span(.)*?>/g,"").replace(/<\/span>/g,"").replace(/<hr(.)*?>/g,"");
  // 要素を画面外へ
  var s = tmp.style;
  s.position = 'fixed';
  s.right = '200%';
  // body に追加
  document.body.appendChild(tmp);
  // 要素を選択
  document.getSelection().selectAllChildren(tmp);
  // クリップボードにコピー
  var result = document.execCommand("copy");
  // 要素削除
  return result;
}

function kakikomi(){
	//改行をHTMLに対応させる
	honbun = honbun.replace(/\n/g, '<br>');
	//テキストボックス風の空間に書き込み
	target = document.getElementById("after");
	target.innerHTML = honbun;
}

var currenttab = "v";

function dataikou(tgplace){
	if(tgplace == "v" && currenttab == "h"){
		document.getElementById("textarea_v").value = document.getElementById("textarea_h").value;
		currenttab = "v";
	}else if(tgplace == "h" && currenttab == "v"){
		document.getElementById("textarea_h").value = document.getElementById("textarea_v").value;
		currenttab = "h";
	}
	henkan();
}

function backToTextbox(){
	var res = confirm("テキストボックスの内容を書き換えてもよろしいですか？\r\n(元の文章データが消えるおそれがあります)");
	if(res == true){
		document.getElementById("textarea_v").value = honbun.replace(/<br>/g,"\n").replace(/<span(.)*?>/g,"").replace(/<\/span>/g,"").replace(/<hr(.)*?>/g,"").replace(/(&amp;)/g, '&').replace(/(&gt;)/g, '>').replace(/(&lt;)/g, '<').replace(/(&quot);/g, '"').replace(/(&#x27;)/g, "'").replace(/(&#x60;)/g, '`');
		document.getElementById("textarea_h").value = honbun.replace(/<br>/g,"\n").replace(/<span(.)*?>/g,"").replace(/<\/span>/g,"").replace(/<hr(.)*?>/g,"").replace(/(&amp;)/g, '&').replace(/(&gt;)/g, '>').replace(/(&lt;)/g, '<').replace(/(&quot);/g, '"').replace(/(&#x27;)/g, "'").replace(/(&#x60;)/g, '`');
	}
	henkan();
}

function clearinputs(){
	var res = confirm("テキストボックスの内容をクリアしてもよろしいですか？\r\n(文章データが消えるおそれがあります)");
	if(res == true){
		document.getElementById("textarea_v").value = "";
		document.getElementById("textarea_h").value = ""; 
		document.forms.convert_v.before_v.value = "";
		document.forms.convert_h.before_h.value = "";
		alert("クリアしました。");
	}
	henkan();
}