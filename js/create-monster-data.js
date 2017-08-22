
/* ---------------------------------------------------------------------- */
// analyze MonsterList.xml
function analyze_monster() {
	var xmlData;
	
	$.ajax({
		type: "GET",
		dataType: "xml",
		async: false,
		url: "./data/MonsterList.xml"
	}).done(function(data) {
		xmlData = data;
	});
	
	var $xml = $(xmlData);
	var $mobList = $xml.find("Monster");
	var output = [];
	
	$mobList.each(function(index, mobData) {
		var $this = $(this);
		
		if (parseInt($this.find("Lineage").text()) > 3) {
			return;
		}
		
		var data = {
			Id: parseInt($this.attr("id")),
			Name: $this.find("MonsterName").text(),
			Type: parseInt($this.find("Species").text()),
			Lineage: parseInt($this.find("Lineage").text()),
			AtParam: {
				Min: parseInt($this.find("AtcMinValue").text()),
				Max: parseInt($this.find("AtcMaxValue").text()),
				MinBonus: parseInt($this.find("AtcMinValueBonus").text()),
				MaxBonus: parseInt($this.find("AtcMaxValueBonus").text()),
				Range: parseInt($this.find("ActiveRange").text()),
				Speed: parseInt($this.find("AtcSpeed").text())
			},
			StatusParam: {
				Str: parseInt($this.find("STR").text()),
				Agi: parseInt($this.find("AGI").text()),
				Con: parseInt($this.find("CON").text()),
				Wis: parseInt($this.find("WIS").text()),
				Int: parseInt($this.find("INT").text()),
				Chs: parseInt($this.find("CHS").text()),
				Luc: parseInt($this.find("LUC").text()),
				Hp: parseInt($this.find("DefaultHP").text()),
				Def: parseInt($this.find("DefenseValue").text()),
				Factor: parseInt($this.find("StatusFactor").text()),
				DefBonus: parseInt($this.find("DefenseValueBonus").text()),
				LvBonus: parseInt($this.find("LevelUpBonus").text()),
				ConBonus: parseInt($this.find("ConditionBonus").text())
			},
			Resist: {
				Fire: parseInt($this.find("FireResistance").text()),
				Water: parseInt($this.find("WaterResistance").text()),
				Earth: parseInt($this.find("EarthResistance").text()),
				Wind: parseInt($this.find("WindResistance").text()),
				Light: parseInt($this.find("LightResistance").text()),
				Dark: parseInt($this.find("DarkResistance").text())
			}
		};
		
		output.push(data);
	});
	
	return output;
}
