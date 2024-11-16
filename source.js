function on_load_portfolio() {
}

const navbar_data = [
    { "link": "/index.html", "display": "Home" },
    { "link": "/4040.html", "display": "4040 Universe" },
    { "link": "/cv.html", "display": "CV and Portfolio" },
    { "link": "/portfolio.html", "display": "Gallery" },
]

function on_load() {
    let navbar = document.getElementById("navbar");
    let vertical_nav = document.getElementById("vertical-nav");
    let picture_grid = document.getElementById("picture-grid");

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
        + '<a href="/4040/UZTAFOX.html"> &nbsp UZTAFOX </a>'
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
