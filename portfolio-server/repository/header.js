
export const getHeader = () => {
    const header = {
        "logo": {
            "img": "images/favicon.ico",
            "name": "Judy"
        },
        "menus": [
            {"href": "/",   "style": "header-menu-item", "name": "Home"},
            {"href": "/about",  "style": "header-menu-item", "name": "About"},
            {"href": "/skills", "style": "header-menu-item", "name": "Skills"},
            {"href": "/work",   "style": "header-menu-item", "name": "My Work"},
            {"href": "testimonials", "style": "header-menu-item", "name": "Testimonial"}
        ]
    }

    return header;
}