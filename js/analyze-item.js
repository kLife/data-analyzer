
/* ---------------------------------------------------------------------- */
// analyze item
function analyze_item(ds) {
	var i;
	var output = {};
	
	// header
	output["Header"] = {};
	output["Header"]["ItemDataLength"] = ds.readUint32();
	output["Header"]["TextDataStartAddress"] = ds.readUint32();
	
	// item datas
	output["ItemDatas"] = [];
	
	for (i = 0; i < output["Header"]["ItemDataLength"]; i++) {
		var item = {};
		item["Id"] = ds.readUint32();
		item["--"] = ds.readUint16Array(211);
		//output["ItemDatas"].push(item);
	}
	
	// option datas
	output["OptionDataLength"] = ds.readUint32();
	output["OptionDatas"] = [];
	
	for (i = 0; i < output["OptionDataLength"]; i++) {
		var option = {};
		option["Id"] = ds.readUint16();
		option["IdForType"] = ds.readUint16();
		option["TextId"] = ds.readUint16();
		option["Arg1Min"] = ds.readUint16();
		option["Arg1Max"] = ds.readUint16();
		option["Arg2Mim"] = ds.readUint16();
		option["Arg2Max"] = ds.readUint16();
		option["Arg3"] = ds.readUint16();
		option["Name"] = arrayToString(ds.readUint8Array(20)).replace(/%0.+/, "");
		option["Name2"] = arrayToString(ds.readUint8Array(20)).replace(/%0.+/, "");
		option["DemandLevel"] = ds.readUint16();
		option["PriceAddFrag"] = ds.readUint16();
		option["Price"] = ds.readUint32();
		option["StatusCalcType"] = ds.readUint16();
		option["PriceMulFrag"] = ds.readUint16();
		option["--Flag1"] = ds.readUint8();
		option["--Flag2"] = ds.readUint8();
		option["--Flag3"] = ds.readUint8();
		option["--Flag4"] = ds.readUint8();
		option["equip"] = ds.readUint8Array(48);
		option["--Factor1"] = ds.readUint16();
		option["--Factor2"] = ds.readUint16();
		option["--00array18"] = ds.readUint16Array(18);
		
		output["OptionDatas"].push(option);
	}
	
	return output;
}
