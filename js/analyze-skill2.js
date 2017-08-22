
/* ---------------------------------------------------------------------- */
// analyze skill
function analyze_skill2(ds) {
	decodeBuffer(ds, 0xc);
	
	var i, j, k;
	var output = {};
	
	// header
	output["Header"] = {};
	output["Header"]["--1"] = ds.readUint32();
	output["Header"]["--2"] = ds.readUint32();
	output["Header"]["--3"] = ds.readUint32();
	
	// skill datas
	output["SkillDataSize"] = ds.readUint32();
	output["SkillDataLength"] = ds.readUint32();
	output["SkillDatas"] = [];
	
	for (i = 0; i < output["SkillDataLength"] /*+ 845*/; i++) {
		var ppos = ds.position;
		var skill = {};
		skill["-----"] = "-----------------------------------";
		skill["Id"] = ds.readUint16();
		skill["EffectId"] = ds.readUint16();
		skill["Id--"] = ds.readUint16();
		skill["Id3"] = ds.readUint16();
		skill["--FFFF"] = ds.readUint16Array(6);
		skill["--100"] = ds.readUint16();
		skill["Name"] = arrayToString(ds.readUint8Array(32)).replace(/%0.+/, "");
		skill["難易度"] = ds.readUint16();
		skill["--1"] = ds.readUint16Array(8);
		skill["BaseConsumeCP"] = ds.readUint16();
		skill["UpConsumeCP"] = ds.readUint16();
		skill["BaseGetCP"] = ds.readUint16();
		skill["UpGetCP"] = ds.readUint16();
		ds.seekOffset(112);
		skill["--100-1"] = ds.readUint16();
		skill["--100-2"] = ds.readUint16();
		skill["--100-3"] = ds.readUint16();
		skill["--100-4"] = ds.readUint16();
		ds.seekOffset(108);
		skill["--1000-1"] = ds.readUint16();
		skill["BaseAttackValue"] = ds.readInt16();
		skill["UpAttackValue"] = ds.readInt16();
		skill["--1000-4"] = ds.readUint16();
		ds.seekOffset(18); // 00
		ds.seekOffset(78); // 3075
		
		// option
		for (j = 0; j < 10; j++) {
			var option = {};
			option["Id"] = ds.readUint16();
			
			for (k = 0; k < 5; k++) {
				var param = {};
				param["base1"] = ds.readUint16()
				param["(％)"] = ds.readUint16();
				param["量"] = ds.readUint16();
				param["up3"] = ds.readUint16();
				param["up4"] = ds.readUint16();
				
				option["param" + k] = param;
			}
			
			if (option["Id"] !== 65535) {
				skill["OptionDatas" + j] = option;
			}
			
			ds.seekOffset(12);
		}
		
		skill["--a10"] = ds.readUint16();
		ds.seekOffset(8);
		skill["速度(frame)"] = ds.readUint16();
		skill["---bvfe"] = ds.readUint16();
		skill["---vfec"] = ds.readUint16();
		skill["最高速度(frame)"] = ds.readInt16();
		skill["--a50"] = ds.readUint16();
		skill["最低射程距離"] = ds.readUint16();
		skill["最大射程距離"] = ds.readUint16();
		skill["最高攻撃速度"] = ds.readUint16();
		skill["最低攻撃速度"] = ds.readUint16();
		skill["----f3"] = ds.readUint16();
		skill["----f4"] = ds.readUint16();
		skill["効果範囲"] = ds.readUint16();
		skill["効果範囲上昇"] = ds.readUint16();
		skill["--a100-1"] = ds.readUint16();
		skill["--a100-2"] = ds.readUint16();
		skill["命中"] = ds.readInt16();
		skill["命中上昇"] = ds.readInt16();
		skill["命中最大"] = ds.readInt16();
		skill["回避"] = ds.readInt16();
		skill["回避上昇"] = ds.readInt16();
		skill["回避最大"] = ds.readInt16();
		skill["致命打"] = ds.readInt16();
		skill["致命打上昇"] = ds.readInt16();
		skill["致命打最大"] = ds.readInt16();
		skill["決定打"] = ds.readInt16();
		skill["決定打上昇"] = ds.readInt16();
		skill["決定打最大"] = ds.readInt16();
		ds.seekOffset(42);
		skill["ブロック率"] = ds.readInt16();
		skill["ブロック率上昇"] = ds.readInt16();
		skill["ブロック率最大"] = ds.readInt16();
		ds.seekOffset(60);
		skill["回数最大"] = ds.readInt16();
		skill["回数"] = ds.readInt16();
		skill["回数上昇"] = ds.readInt16();
		skill["---0"] = ds.readInt16();
		skill["---1"] = ds.readInt16();
		skill["---02"] = ds.readInt16();
		ds.seekOffset(72);
		
		// 前提スキル
		for (j = 0; j < 5; j++) {
			var option = {};
			option["Id"] = ds.readUint16();
			option["Level"] = ds.readUint16();
			
			if (option["Id"] !== 65535) {
				skill["前提スキル" + j] = option;
			}
		}
		
		
		skill["Sound0"] = arrayToString(ds.readUint8Array(32)).replace(/%0.+/, "");
		skill["Sound1"] = arrayToString(ds.readUint8Array(32)).replace(/%0.+/, "");
		skill["Sound2"] = arrayToString(ds.readUint8Array(32)).replace(/%0.+/, "");
		skill["Sound3"] = arrayToString(ds.readUint8Array(32)).replace(/%0.+/, "");
		skill["Sound4"] = arrayToString(ds.readUint8Array(32)).replace(/%0.+/, "");
		skill["Sound5"] = arrayToString(ds.readUint8Array(32)).replace(/%0.+/, "");
		ds.seekOffset(44);
		skill["--64"] = ds.readUint16();
		skill["--sG4gh6"] = ds.seekOffset(274) + " Byte";
		skill["Description"] = arrayToString(ds.readUint8Array(256)).replace(/%0.+/, "");
		skill["UpType"] = arrayToString(ds.readUint8Array(64)).replace(/%0.+/, "");
		
		if (skill["Id"] !== 65535) {
			output["SkillDatas"].push(skill);
		}
		
		skill["--sgaxdsefewn"] = ds.seekOffset(output["SkillDataSize"] - (ds.position - ppos));
	}
	
	return output;
}
