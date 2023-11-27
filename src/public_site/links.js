import bread from "./img/bread.jpeg";
import bread1 from "./img/bread1.jpeg";
import bread2 from "./img/bread2.jpeg";
import buffet from "./img/buffet.jpeg";
import catering from './img/catering.jpeg'
import catering1 from './img/catering1.jpeg'
import catering2 from './img/catering2.jpeg'
import catering3 from './img/catering3.jpeg'
import catering4 from './img/catering4.jpeg'
import delivery from './img/delivery.jpeg'
import events from './img/events.jpeg'
import events1 from './img/events1.jpeg'
import events2 from './img/events2.jpeg'
import events3 from './img/events3.jpeg'
/* ---envs--- */
const GOOGLE_MAPS = process.env.REACT_APP_GOOGLE_MAPS;

//open directly on app
/*let fb = "https";
if ('ontouchstart' in window === true) { fb = "fb"; }*/

export const photos = {
    bread: bread,
    bread1: bread1,
    bread2: bread2,
    buffet: buffet,
    catering: catering,
    catering1: catering1,
    catering2: catering2,
    catering3: catering3,
    catering4: catering4,
    delivery: delivery,
    events: events,
    events1: events1,
    events2: events2,
    events3: events3
}

export const links = {
    google_map_route: "https://www.google.com/maps/dir//Restaurante+Romana/data=!4m8!4m7!1m0!1m5!1m1!1s0x94dce3ed84fcfe3f:0xb0f46ad6235e4953!2m2!1d-49.2948793!2d-25.435646199999997",
    waze_map_route: "https://www.waze.com/pt-BR/live-map/directions/restaurante-romana-r.-bruno-filgueira-1633-curitiba?navigate=yes&to=place.w.203621898.2036284512.7190782",
    waze_map_route_mobile: "https://ul.waze.com/ul?preview_venue_id=203621898.2036284512.7190782&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location",
    apple_map_route: "https://maps.apple.com/place?address=Rua%20Bruno%20Filgueira,%201633,%20Curitiba%20-%20PR,%2080730-380,%20Brazil&auid=9644452811156207043&ll=-25.435630,-49.294893&lsp=9902&q=Restaurante%20Romana&_ext=CioKBAgEEBkKBAgFEAMKBAgGEBQKBAgKEAAKBAhSEAEKBAhVEBAKBAhZEAMSJil2wSpGqnA5wDEgYLp6XqZIwDl6Ft+NXW45wEEs/S2GGKVIwFAE&t=m",
    google_maps_api_overview: `https://www.google.com/maps/embed/v1/place?q=place_id:ChIJP_78hO3j3JQRU0leI9Zq9LA&key=${GOOGLE_MAPS}`,
    facebook: `https://www.facebook.com/RomanaRestaurante`,
    instagram: "https://www.instagram.com/",
    google_page_desktop: "https://www.google.com/search?kgmid=/g/1ptw4b8d9&hl=en-BR&q=Restaurante+Romana&kgs=1ad9d0684f65edbb&shndl=0&source=sh/x/kp/osrp/m5/3#lrd=0x94dce3ed84fcfe3f:0xb0f46ad6235e4953,1,,,,",
    google_page_mobile: "https://g.co/kgs/i4oXT2",
    linkedin: "https://www.linkedin.com/in/brunodec/",
    whatsapp_link_0150: "https://wa.me/41987180150"
}