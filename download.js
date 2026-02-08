function filedownload(){
	const a = document.createElement('a');
	var dlhonbun = honbun.replace(/<br>/g,"\r\n").replace(/<span(.)*?>/g,"").replace(/<\/span>/g,"").replace(/<hr(.)*?>/g,"");
	a.href = 'data:text/plain;charset=UTF-8,' + encodeURIComponent(dlhonbun);

	var today = new Date();
	a.download = 'sentence_fixed_'+today.getFullYear()+(today.getMonth()+1)+today.getDate()+'.txt';
	
	a.style.display = 'none';
	document.body.appendChild(a); // ※ DOM が構築されてからでないとエラーになる
	a.click();
	document.body.removeChild(a);
}