/**********************************************************
 *
 *  URL エンコード・デコード
 *
 *    utf8.js, jcode.js が必要
 *
 *  Copyright (c) 2005 AOK <soft@aokura.com>
 *
 **********************************************************/

function _escape(s) {
  var c, n, r = "";
  for (var i = 0; i < s.length; i++) {
    c = s.charCodeAt(i);
    if ((c >= 0x30 && c <= 0x39) || (c >= 0x40 && c <= 0x5A) ||
        (c >= 0x61 && c <= 0x7A) || (c == 0x2A) ||
        (c == 0x2D) || (c == 0x2E) || (c == 0x5F)) {
      r += s.charAt(i);
    } else {
      n = c.toString(16).toUpperCase();
      r += "%" + (n.length == 1 ? "0" + n : n);
    }
  }
  return r;
}

function _unescape(s) {
  return s.replace(/(%[0-9A-Z][0-9A-Z])/ig, function(e) {
    return String.fromCharCode("0x" + e.charAt(1) + e.charAt(2));
  });
}

function my_escape(s, c) {
  var r;
  if (s == null) return s;
  if (c == "utf-8")
    r = _escape(_to_utf8(s));
  else if (c == "shift-jis")
    r = _escape(_to_sjis(s));
  else if (c == "euc")
    r = _escape(_to_euc(s));
  else if (c == "jis")
    r = _escape(_to_jis(s));
  else
    r = escape(s);
  return r;
}

function my_unescape(s, c) {
  var r;
  if (s == null) return s;
  if (c == "utf-8")
    r = _from_utf8(_unescape(s));
  else if (c == "shift-jis")
    r = _from_sjis(_unescape(s));
  else if (c == "euc")
    r = _from_euc(_unescape(s));
  else if (c == "jis")
    r = _from_jis(_unescape(s));
  else
    r = unescape(s);
  return r;
}
