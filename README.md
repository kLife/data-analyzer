# データ解析ツール
https://klife.github.io/data-analyzer/

REDSTONEのデータを解析するツールです。

プログラムもデザインもひどいのでいつか直します。

# 使い方
ファイルを選択するとJSONデータを吐き出します

対応ファイルは以下（ほぼ未解析）
- item.dat
- senario/item.dat
- text.dat
- skill.dat
- job.dat

アイテムデータは2つありますが、senario以下にあるitem.datは `senario_item.dat` に名前を書き換えてください。

# 暗号と複合

## 暗号化ファイル
一部のファイルはXOR暗号で暗号化されています。
生成方法が不明の326Byteの長さのキーで暗号化されており、ファイルごとにキーも違います。

## 複合手法
今回紹介する複合の手法は一般的なものではなくオレオレ手法なので、調べればもっといいものが出てくると思います。
また、この手法では以下のファイルは解析不能です。
- ファイルサイズが小さい
- 0x00のデータが少ない

対象コードは `main.js` の `decodeBuffer` です。

1. キーの長さが326Byteわかっているので、256*326の二次元配列を用意
2. データの326Byte分を見て、出現した値にを+1をする
3. 2を繰り返す
4. 出現数がもっとも多いもの元の値として326Byteのキーを得る

※ 暗号化が始まるポジションはファイルによって違います

# データ構造
## item.dat
不明な部分も多く書き出すのが困難なので、詳しくは `js/analyze-scenario-item` の50行目以降をご覧ください。なんとなくわかると思います。

## アイテム画像
`iconItem.smi` にすべて入っています。
こちらで解説しています。
http://kou0120.blog.fc2.com/blog-entry-177.html
http://kou0120.blog.fc2.com/blog-entry-183.html
