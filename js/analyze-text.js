
/* ---------------------------------------------------------------------- */
// analyze textData
function analyze_text(ds) {
	decodeBuffer(ds, 0x8);

	var i;
	var output = {};
	var option;
	var startPosition = 0;
	var p = function() {
		return "_" + (ds.position - startPosition);
	}
	var old = 0;

	// all text datas

	// header
	output["Header"] = {};
	output["Header"]["dataType"] = ds.readUint32();
	output["Header"][p()] = ds.readUint32();

	var dataTypeTable = [
		 "Base",
		 "EquipInfo",
		 "Status",
		 "EquipGroup",
		 "GuildStatus",
		 "JobName",
		 "FieldRegist",
		 "NPCName",
		 "DialogText",
		 "ChatFilter",
		 "HelpInfo",
		 "MonsterRank",
		 "MonsterType",
		 "SubPetName",
		 "ExItemRank",
		 "ServerInfo",
		 "StatusInstruction",
		 "恩寵",
		 "覚醒",
	];

	for (i = 0; i < dataTypeTable.length; i++) {
		var dataName = dataTypeTable[i];
		var Data = output[dataName] = {};
		Data["Header"] = {};
		Data["Header"]["DataLength"] = ds.readUint32();
		Data["TextDatas"] = [];

		for (j = 0; j < Data["Header"]["DataLength"]; j++) {
			option = {};
			startPosition = ds.position;

			option["TextLength"] = ds.readUint16();
			option["TextData"] = ds.readString2(option["TextLength"]).replace(/%0.*/g, "");

			//Data["TextDatas"].push(option);
			Data["TextDatas"].push(option["TextData"]);
		}
	}

	// Long Text
	var longText = output["LongText"] = {};
	longText["TextDatas"] = [];

	for (i = 0; i < 3; i++) {
		option = {};

		option["TextLength"] = ds.readUint32();
		option["TextData"] = ds.readString2(option["TextLength"]).replace(/%0.*/g, "");

		//Data["TextDatas"].push(option);
		longText["TextDatas"].push(option["TextData"]);
	}

	// MSGosick
	var MSGosick = output["MSGosick"] = {};
	MSGosick["TextDatas"] = [];
	MSGosick["TextDatas"].push(ds.readString2(64).replace(/%0.*/g, ""));
	MSGosick["TextDatas"].push(ds.readString2(64).replace(/%0.*/g, ""));
	MSGosick["TextDatas"].push(ds.readString2(64).replace(/%0.*/g, ""));
	MSGosick["TextDatas"].push(ds.readString2(64).replace(/%0.*/g, ""));


	// GMText
	var GMText = output["GMText"] = {};
	GMText["Header"] = {};
	GMText["Header"]["DataLength"] = ds.readUint32();
	GMText["TextDatas"] = [];

	for (i = 0; i < GMText["Header"]["DataLength"]; i++) {
		option = {};

		option["TextId"] = ds.readUint16();
		option["TextData"] = ds.readString2(84).replace(/%0.*/g, "");

		//Data["TextDatas"].push(option);
		GMText["TextDatas"].push(option["TextData"]);
	}

	// OptionProper
	var OptionProper = output["OptionProper"] = {};
	OptionProper["Header"] = {};
	OptionProper["Header"]["DataLength"] = ds.readUint32();
	OptionProper["TextDatas"] = [];

	for (i = 0; i < OptionProper["Header"]["DataLength"]; i++) {
		option = {};

		option["TextId"] = ds.readUint32();
		option["TextData"] = ds.readString2(256).replace(/%0.*/g, "");

		//Data["TextDatas"].push(option);
		OptionProper["TextDatas"].push(option["TextData"]);
	}


	// OptionBasic
	var OptionBasic = output["OptionBasic"] = {};
	OptionBasic["Header"] = {};
	OptionBasic["Header"]["DataLength"] = ds.readUint32();
	OptionBasic["TextDatas"] = [];

	for (i = 0; i < OptionBasic["Header"]["DataLength"]; i++) {
		option = {};

		option["TextId"] = ds.readUint32();
		option["TextData"] = ds.readString2(256).replace(/%0.*/g, "");

		//Data["TextDatas"].push(option);
		OptionBasic["TextDatas"].push(option["TextData"]);
	}

	// Title
	var Title = output["Title"] = {};
	Title["Header"] = {};
	Title["Header"]["DataLength"] = ds.readUint32();
	Title["TextDatas"] = [];

	for (i = 0; i < Title["Header"]["DataLength"]; i++) {
		option = {};

		option["TextId"] = ds.readUint32();
		option["TextData"] = ds.readString2(256).replace(/%0.*/g, "");

		//Data["TextDatas"].push(option);
		Title["TextDatas"].push(option["TextData"]);
	}


	// Nx比較用
	output2 = {};
	output2["OptionProper"] = output["OptionProper"]["TextDatas"];
	output2["OptionBasic"] = output["OptionBasic"]["TextDatas"];

	//return output;
	return output2;
}
