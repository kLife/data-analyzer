
/* ---------------------------------------------------------------------- */
// analyze item2
function create_ItemData(ds) {
	decodeBuffer(ds, 0x48);
	//downloadFile(ds);

	var output = analyze_scenario_item(ds, 100000, 1);
	var output2 = [];
	var iData = output["ItemDatas"];
	var i, j, k;

	function n(key) {
		var data = iData[i][key];
		if (data !== 0 && data !== -1) {
			return data;
		} else {
			return null
		}
	}

	function n0(key) {
		var data = iData[i][key];
		if (data !== -1) {
			return data;
		} else {
			return null
		}
	}

	// マージ
	var jsonData = null;

	$.ajax({
		type: "GET",
		dataType: "json",
		async: false,
		url: "./data/ItemList.json"
	}).done(function(data) {
		jsonData = data;
	});

	console.log("a");
	console.log(iData);
	console.log(jsonData);


	if (iData.length !== jsonData.length) {
		console.log("dat %d, json %d", iData.length, jsonData.length);
	}

	// 追加
	for (i = 0; i < iData.length; i++) {

		if (i >= jsonData.length) {
			break;
		}

		var item = {};
		var d = iData[i];

		item["Id"] = d["Id"];
		item["ImageId"] = d["ItemImageId"];
		item["NxId"] = d["NxId"];
		item["Type"] = d["itemType"];
		item["Name"] = d["Name"];

		// Name Replace
		var r_tag = /\<c:(LTYELLOW|GOLDYELLOW|CTPURPLE|CYAN|LTRED|WHITE|LTORANGE|LTGREEN|BTBLUE|GREEN|GRAY)\>/
		var repcol = {
			"LTYELLOW": "#F8F800",
			"GOLDYELLOW": "#E8C898",
			"CTPURPLE": "#D080F8",
			"CYAN": "#00B8B8",
			"LTRED": "#F80000",
			"WHITE": "#FFFFFF",
			"LTORANGE": "#F8B000",
			"LTGREEN": "#00F800",
			"BTBLUE": "#50A0F8",
			"GREEN": "#00B800",
			"GRAY": "#808080",
		};

		//item["Name"] = item["Name"].replace(r_tag, function(s, s1) {
		//	return "<font color='" + repcol[s1] + "'>"
		//}).replace("<n>", "</font>");

		// Name Check
		var r_namecheck = /<("[^"]*"|'[^']*'|[^'">])*>/g;
		if (item["Name"].replace(r_namecheck, "") != jsonData[i]["itemName"].replace(r_namecheck, "")) {
			//console.log(i, item["Name"], jsonData[i]["itemName"]);
		}

		// Rank
		item["Rank"] = "N";

		const isDX = d["Flags1-2"][7] == 1;
		const isUM = d["Flags2-1"][0] == 1;
		const isNx = d["Flags3-2"][0] == 1;
		const isNxable =  d["Flags3-2"][1] == 1; // 錬成可能フラグ

		// console.log(d["Flags1-1"], d["Flags1-2"], jsonData[i].isU)
		if (jsonData[i].isU && !jsonData[i].isNX) {
			item["Rank"] = "U";
		}
		if (jsonData[i].isNX) {
			item["Rank"] = "NX";
		}
		if (jsonData[i].isT) {
			item["Rank"] = "T";
		}
		if (jsonData[i].itemType == 49) {
			item["Rank"] = "Q";
		}

		// Grade
		item["Grade"] = "N";
		if (jsonData[i].isDX) {
			item["Grade"] = "DX";
		}
		if (jsonData[i].isUM) {
			item["Grade"] = "UM";
		}

		// At Pram
		item["AtParam"] = {
			"Range": d["AtRange"] || undefined,
			"Speed": d["AtSpeed"] || undefined,
			"Min": d["AtMinValue"] || undefined,
			"Max": d["AtMaxValue"] || undefined,
		};

		// Mini Pet
		var food = {
			"精霊型": 1,
			"自然型": 2,
			"神霊型": 3,
		}

		if (jsonData[i].OpParameter.MiniPetFoodType) {
			item["Food"] = food[jsonData[i].OpParameter.MiniPetFoodType]
		} else {
			item["Food"] = 0;
		}

		// Value Table
		item["ValueTable"] = []

		for (j = 0; j < 5; j++) {
			var value = null;
			if (n("#" + j + ": min") !== null || n("#" + j + ": max") !== null) {
				value = [
					n0("#" + j + ": min"),
					n0("#" + j + ": max")
				];
				item["ValueTable"][j] = value;
			}
		}

		for (j = 0; j < item["ValueTable"].length - 1; j++) {
			if (item["ValueTable"][j] == null) {
				item["ValueTable"][j] = [0, 0];
			}
		}

		// Option Prt
		item["OpPrt"] = [];
		for (j = 1; j <= 4; j++) {
			var opbit = null;
			if (n0("Option" + j + " TextId") !== null) {
				opbit = {
					"Id": n0("Option" + j + " TextId"),
					"ValueIndex": [
						d["Option" + j + " ValueIndex1"],
						d["Option" + j + " ValueIndex2"],
					]
				}
				item["OpPrt"][j-1] = opbit;
			}
		}

		item["OpBit"] = [];
		for (j = 1; j <= 6; j++) {
			var opbit = null;
			if (n0("OpBit" + j + " TextId") !== null) {
				opbit = {
					"Id": n0("OpBit" + j + " TextId"),
					"Value": []
				}

				for (k = 0; k < 8; k++) {
					if (n("OpBit" + j + " Value" + k) !== null) {
						opbit["Value"][k] = n0("OpBit" + j + " Value" + k);
					}
				}

				item["OpBit"][j-1] = opbit;
			}
		}

		item["OpNxt"] = [];
		for (j = 1; j <= 4; j++) {
			var opbit = null;
			if (n0("OpNx" + j + " TextId") !== null) {
				opbit = {
					"Id": n0("OpNx" + j + " TextId"),
					"Value": []
				}

				for (k = 1; k <= 8; k++) {
					if (n("OpNx" + j + " Value" + k) !== null) {
						opbit["Value"][k-1] = n0("OpNx" + j + " Value" + k);
					}
				}

				item["OpNxt"][j-1] = opbit;
			}
		}

		item["Require"] = {
			"0": n0("Status_Lv") || undefined,
			"1": n0("Status_Str") || undefined,
			"2": n0("Status_Agi") || undefined,
			"3": n0("Status_Con") || undefined,
			"4": n0("Status_Wiz") || undefined,
			"5": n0("Status_Int") || undefined,
			"6": n0("Status_Chs") || undefined,
			"7": n0("Status_Luc") || undefined,
			"Extra": n("Status_Extra_Type") !== null ? {
				"StatusType": n0("Status_Extra_Type"),
				"MulValue":  n0("Status_Extra_Mul"),
				"ValueIndex": n0("Status_Extra_ValueIndex"),
			} : undefined
		};

		// Jobs
		item["Job"] = [];

		var key;
		var jobName = "";
		var JobTable = {
			"剣士": 0,
			"戦士": 1,
			"ウィザード": 2,
			"ウルフマン": 3,
			"ビショップ": 4,
			"追放天使": 5,
			"シーフ": 6,
			"武道家": 7,
			"ランサー": 8,
			"アーチャー": 9,
			"ビーストテイマー": 10,
			"サマナー": 11,
			"プリンセス": 12,
			"リトルウィッチ": 13,
			"ネクロマンサー": 14,
			"悪魔": 15,
			"霊術師": 16,
			"闘士": 17,
			"光奏師": 18,
			"獣人": 19,
			"メイド": 20,
			"黒魔術師": 21,
			"マスケッティア": 22,
			"男性キャラクター専用": 40,
			"女性キャラクター専用": 41
		};

		for (key in jsonData[i]["JobAvailable"]) {
			jobName = jsonData[i]["JobAvailable"][key];
			if (JobTable[jobName] !== undefined) {
				item["Job"].push(JobTable[jobName]);
			} else {
				console.log(i + ": JobTalbeにありません。JobTableを更新してください");
			}
		}

		// NxIdがあったら追加する
		if (item["Rank"] == "U" || item["Rank"] == "NX" || item["NxId"] !== 0) {
			output2.push(item);
		}
	}

	return output2;
}
