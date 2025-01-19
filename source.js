
const navbar_data = [
    { "link": "/index.html", "display": "Home" },
    { "link": "/4040.html", "display": "4040 Universe" },
    { "link": "/cv.html", "display": "CV and Portfolio" },
    { "link": "/portfolio.html", "display": "Gallery" },
]

let voc_list = [];

function on_load() {
    let navbar = document.getElementById("navbar");
    let vertical_nav = document.getElementById("vertical-nav");
    let picture_grid = document.getElementById("picture-grid");
    let vocabulary_tag = document.getElementById("vocabulary");

    if (navbar !== null) {
        for (data of navbar_data) {
            if ( window.location.pathname.endsWith(data.link) ) {
                navbar.innerHTML += `<a href="${data.link}" self="true"> ${data.display} </a>`;
            } else {
                navbar.innerHTML += `<a href="${data.link}"> ${data.display}</a>`;
            }
        }
    }

    if (vertical_nav !== null) {
        vertical_nav.innerHTML = ''
        + '<a href="/4040.html#header"> Top </a>'

        + '<a href="/4040.html#orgs"> Orgs </a>'
        + '<a href="/4040/KROMZZAKA.html"> &nbsp KROMZZAKA </a>'
        + '<a href="/4040/socio.html"> &nbsp Socio de Liberaj Nacioj  </a>'

        + '<a href="/4040.html#vehicles"> Vehicles </a>'
        + '<a href="/4040/hamster.html"> &nbsp Hamster </a>'
        + '<a href="/4040/damocles.html"> &nbsp Damocles Sword </a>'

        + '<a href="/4040.html#lore"> Lore </a>'
        + '<a href="/4040/UXOKFOX.html"> UXOKFOX </a>'
        + '<a href="/4040/UXOKFOX-Vocabulary.html"> &nbsp Vocabulary </a>'
        ;
    }

    // For portfolio
    if (picture_grid !== null) {
        for (pic_idx in images_data) {
            let pic = images_data[pic_idx];
            let file_path = "Portfolio/" + pic.src;
            picture_grid.innerHTML += `<a name="${pic.src}">`
                                    + `<img class='portfolio-img' onclick='show_img("${pic_idx}");'`
                                    + `src="${file_path}" title="${pic.title}" alt="${pic.title}">`
                                    + "</a>";
        }
    }

    if (vocabulary_tag !== null) {
        populate_vocabulary_recursive(vocabulary_tag, vocabulary_data)
    }
}

function matches_input(test, query) {
    if (query == "") {
        return true;
    }
    return test[0].toLowerCase() == query[0].toLowerCase();
}

function on_search(search_query) {
    for (v of voc_list) {
        elem = document.getElementById(v);
        if (elem === null) {
            continue;
        }
        //elem.style.visibilityState = "hidden";
        if (matches_input(v, search_query)) {
            elem.style.visibility = "visible";
            elem.style.height = "1.5em";
        } else {
            elem.style.visibility = "collapse";
            elem.style.height = "0em";
        }
    }
}

function show_img(pic_idx) {
    let picture_detail = document.getElementById("picture-detail");
    let pic = images_data[pic_idx];
    let file_path = "Portfolio/" + pic.src;
    picture_detail.style.visibility = "visible";
    picture_detail.getElementsByTagName("img")[0].src = file_path;
    for (link of picture_detail.getElementsByTagName("a")) {
        link.href = file_path;
    }
    document.getElementById("picture-detail-descr").innerHTML = 
        `<h4>${pic.title}</h4>${pic.description}`;
}

function unshow_img() {
    let picture_detail = document.getElementById("picture-detail");
    picture_detail.style.visibility = "hidden";
}

function vocabulary_row(key, value, level) {
    span_style = "color:var(--palette-secondary); display: inline-block; width: 10em; height: 1.5em;";
    voc_list.push(key);
    return `<div style="padding-left:${level * 15}px;" id="${key}">
            <span style="${span_style}">${key}</span> ${value}
        </div>`;
}

function populate_vocabulary_recursive(parent_tag, data, level=0) {
    for (key in data) {
        if (key.startsWith("_")) {
            continue;
        }
        if (typeof(data[key]) === "object") {
            var child_tag = document.createElement("div");
            parent_tag.innerHTML += vocabulary_row(key, "", level);
            parent_tag.appendChild(child_tag);
            populate_vocabulary_recursive(child_tag, data[key], level + 1);
        }
        else if (typeof(data[key]) === "string") {
            parent_tag.innerHTML += vocabulary_row(key, data[key], level);
        }
    }
}
