
function getCode(pro) {
     function quote(text) {
         return "\"" + text + "\"";
     }
     var code = "";
     code += "<a href=" + quote(pro.link) + ">";
     code += "<img class=\"favicon withtext\" alt=\"\" title=\"\" src=";
     code += quote("http://www.google.com/s2/favicons?domain=" + pro.site)
     code += " />" + pro.name + "</a><br />"
     return "<td>" + code + "</td>";
}
