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

function filechange() {
  const input = document.getElementById("targetTextFiles");
  const file = input && input.files && input.files[0];
  if (!file) return;

  const encSel = document.getElementById("fileEncoding");
  const encMode = encSel ? encSel.value : "auto";

  const reader = new FileReader();

  reader.onload = function () {
    try {
      const buf = reader.result; // ArrayBuffer
      const uint8 = new Uint8Array(buf);

      // ---- 1) encoding-japanese 用に配列化 ----
      const bytes = Array.from(uint8);

      // ---- 2) 文字コード決定 ----
      let enc = encMode;

      // BOMチェック（UTF-8 BOM: EF BB BF）
      const hasUtf8Bom = uint8.length >= 3 && uint8[0] === 0xef && uint8[1] === 0xbb && uint8[2] === 0xbf;

      if (encMode === "auto") {
        if (hasUtf8Bom) {
          enc = "utf-8";
        } else {
          // Encoding.detect は 'UTF8', 'SJIS', 'EUCJP' などで返ることがある
          const detected = Encoding.detect(bytes);

          // 正規化
          if (detected === "UTF8") enc = "utf-8";
          else if (detected === "SJIS") enc = "shift_jis";
          else if (detected === "EUCJP") enc = "euc-jp";
          else enc = "utf-8"; // 迷ったらUTF-8に倒す（現代はこれが一番事故が少ない）
        }
      } else if (encMode === "utf-8-bom") {
        enc = "utf-8";
      }

      // ---- 3) decode ----
      let text = "";

      // UTF-8はTextDecoderの方が確実（絵文字や結合文字など）
      if (enc === "utf-8") {
        // BOM付きでも TextDecoder はうまくやってくれるが、念のため除去
        const u = hasUtf8Bom ? uint8.slice(3) : uint8;
        text = new TextDecoder("utf-8").decode(u);
      } else {
        // shift_jis / euc-jp は encoding-japanese で変換
        const unicodeArray = Encoding.convert(bytes, {
          to: "UNICODE",
          from: enc,
          type: "array",
        });
        text = Encoding.codeToString(unicodeArray);
      }

      // ---- 4) テキストエリアに流し込む（縦横両方） ----
      const tv = document.getElementById("textarea_v");
      const th = document.getElementById("textarea_h");
      if (tv) tv.value = text;
      if (th) th.value = text;

      // 読み込み表示
      const yomikomi = document.getElementById("yomikomi");
      if (yomikomi) {
        const shownEnc = (encMode === "auto") ? `自動判定：${enc}` : encMode;
        yomikomi.textContent = `（読み込み完了 / ${shownEnc}）`;
      }

      // 変換実行
      if (typeof henkan === "function") henkan();
    } catch (e) {
      console.error(e);
      alert("テキストの読み込みに失敗しました。文字コードを切り替えて再試行してください。");
    }
  };

  // ArrayBufferで読む（文字コード処理の自由度が高い）
  reader.readAsArrayBuffer(file);
}
