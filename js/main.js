/* ---------------------------------------------------------------------- */
// extend DataStream
DataStream.prototype.seekOffset = function(offset) {
	var npos = this.position + offset;
	this.seek(npos);
	return offset;
};

DataStream.prototype.readString2 = function(length) {
	return arrayToString(this.readUint8Array(length));
};

/* ---------------------------------------------------------------------- */
// Main
$(document).ready(function Main() {
	$("#file-input").on("change", function(e) {
		var filereader = new FileReader();
		var loadedFile = this.files[0];

		filereader.onload = function() {
			analyzeData.call(this, loadedFile);
		};
		filereader.readAsArrayBuffer(loadedFile);
	});
});

/* ---------------------------------------------------------------------- */
// fn
function arrayToString(unitArr) {
	var myString = "";

	for (var i = 0; i < unitArr.byteLength; i++) {
		myString += "%" + unitArr[i].toString(16);
	}

	return my_unescape(myString, "shift-jis");
}

function r() {
	return (Math.random() * 1000000) | 0;
}

function decodeBuffer(ds, startAddress, endAddress) {
	var ENCODE_KEY_LENGTH = 326;
	var xorKey = new Int16Array(ENCODE_KEY_LENGTH);
	var numCounts = [];
	var i, j, k;
	var value;

	startAddress = startAddress || 0;
	endAddress = endAddress || ds._byteLength;

	// 初期化
	for (i = 0; i < ENCODE_KEY_LENGTH; i++) {
		numCounts[i] = new Array(256);

		for (j = 0; j < 256; j++) {
			numCounts[i][j] = 0;
		}
	}

	// 出現回数のカウント
	for (i = startAddress; i < endAddress; i++) {
		j = (i - startAddress) % ENCODE_KEY_LENGTH;
		ds.seek(i);
		numCounts[j][ds.readUint8()]++;
	}

	// 出現回数の最も多い値をkeyとする
	for (i = 0; i < ENCODE_KEY_LENGTH; i++) {
		xorKey[i] = numCounts[i].indexOf(Math.max.apply(null, numCounts[i]));
	}

	// デコード
	for (i = startAddress; i < endAddress; i++) {
		j = (i - startAddress) % ENCODE_KEY_LENGTH;
		ds.seek(i);
		value = ds.readUint8();
		ds.seek(i);
		ds.writeUint8(value ^ xorKey[j]);
	}

	ds.seek(0);
}

function downloadFile(ds, loadedFile) {

	var fileHref = window.URL.createObjectURL(new Blob([ds._buffer]));
	var fileName = loadedFile.name;

	var downloadTag = $("<a />").attr({
		target: "_blank",
		href: fileHref,
		download: fileName
	}).hide();

	var downloadInput = $("<input />").bind("click", function() {
		var ev;

		if (document.createEvent && window.dispatchEvent) {
			ev = document.createEvent('MouseEvents');
			ev.initEvent("click", true, true);
			downloadTag[0].dispatchEvent(ev);
		} else {
			downloadTag[0].click();
		}
	}).attr("type", "button").val(fileName).addClass("downloadButton");

	$("#output-file").append(downloadTag, downloadInput);
}

/* ---------------------------------------------------------------------- */
// analyze
function analyzeData(loadedFile) {
	var ds = new DataStream(this.result);
	ds.endianness = DataStream.LITTLE_ENDIAN;

	switch (loadedFile.name) {
		// NOTE: アイテムデータを更新するときはanalyze_itemのほうをコメントアウトする
		//case "item.dat": output = analyze_item(ds); break;
		// case "senario_item.dat": output = analyze_scenario_item(ds, 1000000, 1); break;
		case "test.ud8": output = analyze_ud8(ds); break;
		case "senario_item.dat":
		case "senario_item-en.dat": output = create_ItemData(ds, 100, 1); break;
		case "skill.dat": output = analyze_skill(ds); break;
		case "skill2.dat": output = analyze_skill2(ds); break;
		case "job.dat": output = analyze_job(ds); break;
		case "job2.dat": output = analyze_job2(ds); break;
		case "textData.dat":
		case "textData-en.dat": output = analyze_text(ds); break;
		case "MonsterList.xml": output = analyze_monster(); break;
		default : output = "まだ手を付けていません。"; break;
	};

	// output data
	if ($("#check-compress").is(":checked")) {
		$("#output-area").text(JSON.stringify(output).replace(/(.{100}.*?,)/g, "$1\n"));
	} else {
		$("#output-area").text(JSON.stringify(output, null, "\t"));
	}

	// output file
	downloadFile(ds, loadedFile);
}

// ビットに変換
function convertToBitsArray(num, bitLength) {
	var strNum = ((0x100000000).toString(2) + num.toString(2)).slice(-bitLength);
	return strNum;
	return strNum.toString(2).split("").map(function(val, index) {
		return parseInt(val);
	});
}
