
/* ---------------------------------------------------------------------- */
// analyze scenario item
function analyze_scenario_item(ds, max, skip) {
	decodeBuffer(ds, 0x48);

	var i;
	var output = {};
	var option;
	var startPosition = 0;
	var isAnalizeMode = true;

	var p = function() {
		if (!isAnalizeMode) {
			return "_";
		}
		return "_" + (ds.position - startPosition);
	}
	var old = 0;

	// header
	output["Header"] = {};
	output["Header"]["dataType"] = arrayToString(ds.readUint8Array(64)).replace(/(%0|ÿ)+/g, "_");
	output["Header"][p()] = ds.readUint32();
	output["Header"][p()] = ds.readUint32();
	output["Header"]["itemDataLength"] = ds.readUint32();
	output["Header"][p()] = ds.readUint32();

	// item datas
	output["ItemDatas"] = [];

	for (i = 0; i < output["Header"]["itemDataLength"]; i += skip) {
		option = {};
		startPosition = ds.position;

		option["Id"] = ds.readUint32();
		option["Name"] = arrayToString(ds.readUint8Array(68)).replace(/%0.*/g, "");

		option["AddressData"] = ds.readUint32();
		option["itemType"] = ds.readUint32();

		option["__null"] = ds.readUint16();
		option["__null"] = ds.readUint16();
		option["__null"] = ds.readUint16();
		option["__null"] = ds.readUint16();
		option["__null"] = ds.readUint16();
		option["__null"] = ds.readUint16();
		option["__null"] = ds.readUint16();
		option["__null"] = ds.readUint16();

		option["Price"] = ds.readUint32();
		option["PriceFormatType"] = ds.readUint16();
		option["AtRange"] = ds.readUint16();
		option["AtRangeBonus??"] = ds.readUint16();
		option["AtSpeed"] = ds.readUint16();
		option["AtMinValue"] = ds.readUint16();
		option["AtMaxValue"] = ds.readUint16();

		option["DurabilityDecreaseFormat"] = ds.readUint16();
		option["Status_Extra_Mul"] = ds.readInt16();
		option["Status_Extra_Type"] = ds.readInt16();
		option["Status_Extra_ValueIndex"] = ds.readInt16();
		option["Status_Lv"] = ds.readInt16();
		option["Status_Str"] = ds.readInt16();
		option["Status_Agi"] = ds.readInt16();
		option["Status_Con"] = ds.readInt16();

		option["Status_Wiz"] = ds.readInt16();
		option["Status_Int"] = ds.readInt16();
		option["Status_Chs"] = ds.readInt16();
		option["Status_Luc"] = ds.readInt16();
		option["Status_予備??"] = ds.readInt16();
		option["ItemImageId"] = ds.readInt16();
		option["ItemFieldImageId"] = ds.readInt16();
		option["EquipEffectNumber"] = ds.readInt16();

		option["QuestId??"] = ds.readUint16();
		option["StackSize"] = ds.readInt16();
		option["DropLevel"] = ds.readInt16();
		option["#0: min"] = ds.readInt16();
		option["#0: max"] = ds.readInt16();
		option["#1: min"] = ds.readInt16();
		option["#1: max"] = ds.readInt16();
		option["Option1 TextId"] = ds.readInt16();
		option["Option1 ValueIndex1"] = ds.readInt16();

		option["Option1 ValueIndex2"] = ds.readInt16();
		option["#2: min"] = ds.readInt16();
		option["#2: max"] = ds.readInt16();
		option["Option2 TextId"] = ds.readInt16();
		option["Option2 ValueIndex1"] = ds.readInt16();
		option["Option2 ValueIndex2"] = ds.readInt16();
		option["#3: min"] = ds.readInt16();
		option["#3: max"] = ds.readInt16();

		option["Option3 TextId"] = ds.readInt16();
		option["Option3 ValueIndex1"] = ds.readInt16();
		option["Option3 ValueIndex2"] = ds.readInt16();
		option["#4: min"] = ds.readInt16();
		option["#4: max"] = ds.readInt16();
		option["Option4 TextId"] = ds.readInt16();
		option["Option4 ValueIndex1"] = ds.readInt16();
		option["Option4 ValueIndex2"] = ds.readInt16();

		option["__??"] = ds.readInt16(); // [00, FF]
		option["__??"] = ds.readInt16(); // [00, FF]
		option["OpBit1 TextId"] = ds.readInt16();
		option["OpBit1 Value0"] = ds.readInt16();
		option["OpBit1 Value1"] = ds.readInt16();
		option["OpBit1 Value2"] = ds.readInt16();
		option["OpBit1 Value3"] = ds.readInt16();
		option["OpBit1 Value4"] = ds.readInt16();

		option["OpBit1 Value5"] = ds.readInt16();
		option["OpBit1 Value6"] = ds.readInt16();
		option["OpBit1 Value7"] = ds.readInt16();
		option["OpBit2 TextId"] = ds.readInt16();
		option["OpBit2 Value0"] = ds.readInt16();
		option["OpBit2 Value1"] = ds.readInt16();
		option["OpBit2 Value2"] = ds.readInt16();
		option["OpBit2 Value3"] = ds.readInt16();

		option["OpBit2 Value4"] = ds.readInt16();
		option["OpBit2 Value5"] = ds.readInt16();
		option["OpBit2 Value6"] = ds.readInt16();
		option["OpBit2 Value7"] = ds.readInt16();
		option["OpBit3 TextId"] = ds.readInt16();
		option["OpBit3 Value0"] = ds.readInt16();
		option["OpBit3 Value1"] = ds.readInt16();
		option["OpBit3 Value2"] = ds.readInt16();

		option["OpBit3 Value3"] = ds.readInt16();
		option["OpBit3 Value4"] = ds.readInt16();
		option["OpBit3 Value5"] = ds.readInt16();
		option["OpBit3 Value6"] = ds.readInt16();
		option["OpBit3 Value7"] = ds.readInt16();
		option["OpBit4 TextId"] = ds.readInt16();
		option["OpBit4 Value0"] = ds.readInt16();
		option["OpBit4 Value1"] = ds.readInt16();

		option["OpBit4 Value2"] = ds.readInt16();
		option["OpBit4 Value3"] = ds.readInt16();
		option["OpBit4 Value4"] = ds.readInt16();
		option["OpBit4 Value5"] = ds.readInt16();
		option["OpBit4 Value6"] = ds.readInt16();
		option["OpBit4 Value7"] = ds.readInt16();
		option["OpBit5 TextId"] = ds.readInt16();
		option["OpBit5 Value0"] = ds.readInt16();

		option["OpBit5 Value1"] = ds.readInt16();
		option["OpBit5 Value2"] = ds.readInt16();
		option["OpBit5 Value3"] = ds.readInt16();
		option["OpBit5 Value4"] = ds.readInt16();
		option["OpBit5 Value5"] = ds.readInt16();
		option["OpBit5 Value6"] = ds.readInt16();
		option["OpBit5 Value7"] = ds.readInt16();
		option["OpBit6 TextId"] = ds.readInt16();

		option["OpBit6 Value0"] = ds.readInt16();
		option["OpBit6 Value1"] = ds.readInt16();
		option["OpBit6 Value2"] = ds.readInt16();
		option["OpBit6 Value3"] = ds.readInt16();
		option["OpBit6 Value4"] = ds.readInt16();
		option["OpBit6 Value5"] = ds.readInt16();
		option["OpBit6 Value6"] = ds.readInt16();
		option["OpBit6 Value7"] = ds.readInt16();

		option["PriceFactor"] = ds.readInt16();
		option["itemPropertyFlags"] = ds.readUint16(); // 使用不可/ベルト可
		option["RankFlags1"] = convertToBitsArray(ds.readInt8(), 8);
		option["RankFlags2"] = convertToBitsArray(ds.readInt8(), 8);
		option["ExpirationDateYear"] = ds.readInt16(); // 有効期限
		option["ExpirationDateMonth"] = ds.readInt16(); // 有効期限
		option["ExpirationDateDay"] = ds.readInt16();
		option["ExpirationDateHour"] = ds.readInt16();

		option["__??"] = ds.readInt16();	// エンチャント系の何かの値
		option["__??"] = ds.readInt16();	// エンチャント系の何かの値
		option["__??"] = ds.readInt16();	// エンチャの種類に関する何か
		option["EquipColorType??"] = ds.readInt16();
		option["__??"] = ds.readInt16();	// 常に100
		option["DropFactor"] = ds.readInt16();
		option["__??"] = ds.readInt16();	// アイテム画像に関するグループ？
		option["RankItemGroup"] = ds.readInt16();	// ランクアイテムのグループ

		option["PortalSphereGroup"] = ds.readInt16();	// ポタの種類
		option["isPortalSpher"] = ds.readInt16();
		option["__??"] = ds.readInt16();	// 何かのフラグ
		option["__??"] = ds.readInt16();	// 何かのフラグ
		option["isNotSell"] = ds.readInt16(); // NPC売却禁止？
		option["__null"] = ds.readInt16();
		option["__??"] = ds.readInt16();	// ポタのグレード？
		option["__??"] = ds.readInt8();	// インフィニに関する何か
		option["__??"] = ds.readInt8();	// 転生指輪などに関する何か

		option["__??"] = ds.readInt16();	// 転生指輪などに関する何か
		option["__??"] = ds.readInt16();	// IFに関する何か
		option["__??"] = convertToBitsArray(ds.readInt8(), 8);	// 何かのフラグ、IFのレベル？
		option["__??"] = convertToBitsArray(ds.readInt8(), 8);	// IFの何か
		option["JobFlags"] = convertToBitsArray(ds.readUint32(), 32);
		option["__??"] = ds.readInt16();	// IFの細かな種類のフラグ
		option["__??"] = ds.readInt16(); // 何か、ポタに関する何か
		option["__??"] = convertToBitsArray(ds.readUint8(), 8);	// 不明、記憶の指輪的な何か
		option["__??"] = convertToBitsArray(ds.readUint8(), 8); //　不明

		option[p()] = ds.readInt16();
		option[p()] = ds.readInt16();
		option[p()] = ds.readInt16();
		option[p()] = ds.readInt16();
		option[p()] = ds.readInt16();
		option[p()] = ds.readInt16();
		option["__??"] = ds.readInt16();	// 植木鉢に関するなにか
		option["RankFlags1"] = convertToBitsArray(ds.readUint8(), 8);
		option["RankFlags2"] = convertToBitsArray(ds.readUint8(), 8);

		option["__??"] = ds.readInt16(); // ふいごのなにか
		option["__??"] = ds.readInt16(); // ふいごとかの何か
		option["__??"] = ds.readInt16(); // 課金アイテムなどのフラグ？
		option["NxId"] = ds.readInt16();
		option["__??"] = ds.readInt16(); // 冒険家協会の羅針盤‘初心者専用 のなにか 70
		option["__??"] = ds.readInt16();	// 冒険家協会の羅針盤‘初心者専用　のなにか 157
		option["__??"] = ds.readInt16();	// 交換チケットのなにか
		option["__??"] = ds.readInt16();	// クエストかどうか、コスチュームかどうか

		option["__??"] = ds.readInt16();	// コスチュームのなにか、なにか
		option[p()] = ds.readInt16();
		option[p()] = ds.readInt16();
		option[p()] = ds.readInt16();
		option[p()] = ds.readInt16();
		option[p()] = ds.readInt16();
		option["__null"] = ds.readInt16();
		option["__null"] = ds.readInt16();

		option["__null"] = ds.readInt16();
		option["__null"] = ds.readInt16();
		option["__null"] = ds.readInt16();
		option["__null"] = ds.readInt16();
		option["__null"] = ds.readInt16();
		option["OpNx1 TextId"] = ds.readInt16();
		option["OpNx1 Value1"] = ds.readInt16();
		option["OpNx1 Value2"] = ds.readInt16();

		option["OpNx1 Value3"] = ds.readInt16();
		option["OpNx1 Value4"] = ds.readInt16();
		option["OpNx1 Value5"] = ds.readInt16();
		option["OpNx1 Value6"] = ds.readInt16();
		option["OpNx1 Value7"] = ds.readInt16();
		option["OpNx1 Value8"] = ds.readInt16();
		option["OpNx2 TextId"] = ds.readInt16();
		option["OpNx2 Value1"] = ds.readInt16();

		option["OpNx2 Value2"] = ds.readInt16();
		option["OpNx2 Value3"] = ds.readInt16();
		option["OpNx2 Value4"] = ds.readInt16();
		option["OpNx2 Value5"] = ds.readInt16();
		option["OpNx2 Value6"] = ds.readInt16();
		option["OpNx2 Value7"] = ds.readInt16();
		option["OpNx2 Value8"] = ds.readInt16();
		option["OpNx3 TextId"] = ds.readInt16();

		option["OpNx3 Value1"] = ds.readInt16();
		option["OpNx3 Value2"] = ds.readInt16();
		option["OpNx3 Value3"] = ds.readInt16();
		option["OpNx3 Value4"] = ds.readInt16();
		option["OpNx3 Value5"] = ds.readInt16();
		option["OpNx3 Value6"] = ds.readInt16();
		option["OpNx3 Value7"] = ds.readInt16();
		option["OpNx3 Value8"] = ds.readInt16();

		option["OpNx4 TextId"] = ds.readInt16();
		option["OpNx4 Value1"] = ds.readInt16();
		option["OpNx4 Value2"] = ds.readInt16();
		option["OpNx4 Value3"] = ds.readInt16();
		option["OpNx4 Value4"] = ds.readInt16();
		option["OpNx4 Value5"] = ds.readInt16();
		option["OpNx4 Value6"] = ds.readInt16();
		option["OpNx4 Value7"] = ds.readInt16();

		option["OpNx4 Value8"] = ds.readInt16();
		option["InstructionLength"] = ds.readUint32();
		option["Instruction"] = arrayToString(ds.readUint8Array(option["InstructionLength"])).replace(/(%0|ÿ)+/g, "_");

		output["ItemDatas"].push(option);

		if (i > max) {
			break;
		}
	}

	// 特定のデータを解析する用
	var output2 = [];
	var i;
	var name;

	for (i = 0; i < output["ItemDatas"].length; i++) {
		itemData = output["ItemDatas"][i];
		output2.push({
			Name: itemData["Name"],
			BitFlags1: itemData["BitFlags1"],
			BitFlags2: itemData["BitFlags2"],
			RankFlags1: itemData["RankFlags1"],
			RankFlags2: itemData["RankFlags2"]
		})
	}

	// 1つのデータを解析する用
	var output3 = {};
	var i;
	var name;
	var target = "__test"

	for (i = 0; i < output["ItemDatas"].length; i++) {
		itemData = output["ItemDatas"][i];
		data = itemData[target]
		if (!(data in output3)) {
			output3[data] = [];
		}
		if (output3[data].length > 100) {
			continue;
		}
		output3[data].push(itemData["Name"]);
	}

	//return output;
	return output3;
}

// flags
// 01110001 00010001
// 2: "取引不可"
// 3: "破壊不可",
// 4: "銀行取引不可",
// 8: "使用不可",
// 9: "ベルト着用可"
// 12: "NPC売却禁止",
