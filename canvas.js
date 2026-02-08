var iframetakasa = 400;

function tategakibutton(){
  document.getElementById("tategaki_area").innerHTML =
    '<button onclick="ttgkhihyouji()" class="dl_button">縦書きプレビューを隠す</button>' +
    '<button onclick="ttgkbig()" class="react_button">＋</button>' +
    '<button onclick="ttgksmall()" class="react_button">－</button>' +
    '<iframe id="ttgkframe" width="800" height="'+iframetakasa+'"></iframe>';
  ttgkkaku();
}

function ttgkhihyouji(){
  document.getElementById("tategaki_area").innerHTML =
    '<button onclick="tategakibutton()" class="dl_button">縦書きプレビューを表示</button>' +
    '<iframe id="ttgkframe" width="800" height="0"></iframe>';
}

let _ttgkObjectUrl = null;

function ttgkkaku(){
  var tatebun = honbun
    .replace(/<span(.)*?>/g,"")
    .replace(/<\/span>/g,"")
    .replace(/<hr(.)*?>/g,"");

  var iframe = document.getElementById('ttgkframe');

  var html =
    '<!doctype html>' +
    '<html lang="ja">' +
    '<head>' +
      '<meta charset="UTF-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
      '<style>' +
        'body{margin:0;padding:10px;height:'+(iframetakasa-35)+'px;}' +
        'div{writing-mode:vertical-rl;}' +
      '</style>' +
    '</head>' +
    '<body>' +
      '<div>' + tatebun + '</div>' +
    '</body>' +
    '</html>';

  // 前のURLを解放（任意だけど推奨）
  if (_ttgkObjectUrl) URL.revokeObjectURL(_ttgkObjectUrl);

  var blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  _ttgkObjectUrl = URL.createObjectURL(blob);
  iframe.src = _ttgkObjectUrl;
}

function ttgkbig(){
	iframetakasa += 10;
	console.log(iframetakasa);
	tategakibutton();	
}

function ttgksmall(){
	iframetakasa -= 10;	
	console.log(iframetakasa);
	tategakibutton();	
}