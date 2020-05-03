var types = {
    "У": 1, // Учебник
    "Д": 2, // Диск или Группа
};

var subjects = {
    "Алгебра"     : 1,
    "Геометрия"   : 2,
    "Физика"      : 3,
    "Химия"       : 4,
    "Русский"     : 5,
    "Литература"  : 6,
    "История"     : 7,
    "Информатика" : 8,
    "География"   : 9,
    "Биология"    : 10,
    "Английский"  : 11,
};

function Item(type, sub, ex, link) {
    return {
        "type": type,
        "subject": sub,
        "link": link,
        "explan": ex,
    };
}

var items = [
    Item("Д", "Геометрия", "Табличка по геометрии", "https://docs.google.com/spreadsheets/d/10pc-xpPX8pCG4Zc_dV3GxifS6GLyIk9QZcdJPiD_DKU/edit"),
    Item("Д", "Алгебра", "Диск алгебры",            "https://drive.google.com/drive/folders/1RsM5lHj_W4zYEGM4VhNTKf-FQYbmVo1f"),
    Item("Д", "Физика", "Группа физики",            "https://vk.com/club193706921"),
    Item("У", "История", "Учебник по истории",      "http://www.belgtis.ru/images/obuch/pm/IstoriyaRossiiimirasdrevnejshihvremendokoncaXIXvekaklassZagladinNVidr.pdf"),
    Item("У", "Химия", "Задачник по химии",         "https://vk.com/doc572297054_543760232?hash=cd65ebfda1a3c873d4&dl=a22a98f48ac93d1ab9"),
];

