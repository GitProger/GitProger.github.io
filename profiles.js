
twitter = {
    name: "twitter.com",
    site: "https://twitter.com/",
    link: "https://twitter.com/GitProger",
};

vk = {
    name: "vk.com",
    site: "https://vk.com/",
    link: "https://vk.com/1ksta",
};

github = {
    name: "github.com",
    site: "https://github.com/",
    link: "https://github.com/GitProger",
};

facebook = {
    name: "facebook.com",
    site: "https://www.facebook.com/",
    link: "https://www.facebook.com/profile.php?id=100049113921229",
};

function getCode(pro) {
     var code = "";
     code += "<a href=\"" + pro.link + "\" class=\"darklink\">";
     code += "<img class=\"favicon withtext\" src=\"";
     code += "http://www.google.com/s2/favicons?domain=" + pro.site + "\" />";
     code += pro.name + "</a><br />";
     return code;
}
