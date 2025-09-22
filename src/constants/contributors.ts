const cloudinaryBase = 'https://res.cloudinary.com/glovooker/image/upload/v1702798842/portfolio';

export const gabrielLobo = `${ cloudinaryBase }/contributors/gabrielLobo.jpg`;
export const franklinCastro = `${ cloudinaryBase }/contributors/franklinCastro.jpg`;
export const thomasBermudez = `${ cloudinaryBase }/contributors/thomasBermudez.jpg`;
export const josiasHidalgo = `${ cloudinaryBase }/contributors/josiasHidalgo.jpg`;
export const luisMonge = `${ cloudinaryBase }/contributors/luisMonge.jpg`;
export const andreLopez = `${ cloudinaryBase }/contributors/andreLopez.jpg`;
export const fabianMena = `${ cloudinaryBase }/contributors/fabianMena.jpg`;
export const eduardoFont = `${ cloudinaryBase }/contributors/eduardoFont.jpg`;
export const estefaniaRegidor = `${ cloudinaryBase }/contributors/estefaniaRegidor.jpg`;
export const anabelleVelasquez = `${ cloudinaryBase }/contributors/anabelleVelasquez.jpg`;
export const jeremyVillegas = `${ cloudinaryBase }/contributors/jeremyVillegas.jpg`;
export const alvaroCastillo = `${ cloudinaryBase }/contributors/alvaroCastillo.jpg`;
export const andreyVillalobos = `${ cloudinaryBase }/contributors/andreyVillalobos.jpg`;
export const jocselynAguilar = `${ cloudinaryBase }/contributors/jocselynAguilar.jpg`;
export const brandonLen = `${ cloudinaryBase }/contributors/brandonLen.jpg`;
export const keylorGomez = `${ cloudinaryBase }/contributors/keylorGomez.jpg`;
export const isaacSandoval = `${ cloudinaryBase }/contributors/isaacSandoval.jpg`;
export const marcosSaenz = `${ cloudinaryBase }/contributors/marcosSaenz.jpg`;
export const sebastianLopez = `${ cloudinaryBase }/contributors/sebastianLopez.jpg`;
export const monseSandi = `${ cloudinaryBase }/contributors/monseSandi.jpg`;
export const luciaManzanares = `${ cloudinaryBase }/contributors/luciaManzanares.jpg`;
export const arielMontero = `${ cloudinaryBase }/contributors/arielMontero.jpg`;
export const marceloAlbacete = `${ cloudinaryBase }/contributors/marceloAlbacete.jpg`;
export const sergioMonge = `${ cloudinaryBase }/contributors/sergioMonge.jpg`;
export const luisNaranjo = `${ cloudinaryBase }/contributors/luisNaranjo.jpg`;
export const tomasDeCamino = `${ cloudinaryBase }/contributors/tomasDeCamino.jpg`;

export type ContributorsList = {
    [key: string]: {
        name: string;
        handle: string;
        image: string;
        link: string;
    };
};

export const contributors: ContributorsList = {
    glovooker: {
        name: 'Gabriel Lobo',
        handle: 'thegabrielobo',
        image: gabrielLobo,
        link: 'https://www.linkedin.com/in/glovooker/',
    },
    woodsoul: {
        name: 'Franklin Castro',
        handle: 'woodsoul',
        image: franklinCastro,
        link: 'https://www.linkedin.com/in/franklin-castro-rodr%C3%ADguez/',
    },
    saturnxs: {
        name: 'Thomas Bermúdez',
        handle: 'saturnxs',
        image: thomasBermudez,
        link: 'https://www.linkedin.com/in/thomas-bermudez-mora/',
    },
    bistec: {
        name: 'Josías Hidalgo',
        handle: 'bistec',
        image: josiasHidalgo,
        link: 'https://www.linkedin.com/in/josias-hidalgo-b3238b21a/',
    },
    forlucho: {
        name: 'Luis Monge',
        handle: 'forlucho',
        image: luisMonge,
        link: 'https://www.linkedin.com/in/luis-monge-cort%C3%A9s-15574a211/',
    },
    anderlyn: {
        name: 'André López',
        handle: 'anderlyn',
        image: andreLopez,
        link: 'https://www.linkedin.com/in/alstoria/',
    },
    fabianMena: {
        name: 'Fabián Mena',
        handle: 'fabianMena',
        image: fabianMena,
        link: 'https://www.linkedin.com/in/fabi%C3%A1n-mena-garro-b25233202/',
    },
    eduardoFont: {
        name: 'Eduardo Font',
        handle: 'eduardoFont',
        image: eduardoFont,
        link: 'https://www.linkedin.com/in/eduardo-font-0ab75895/',
    },
    estefaniaRegidor: {
        name: 'Estefanía Regidor',
        handle: 'estefaniaRegidor',
        image: estefaniaRegidor,
        link: 'https://www.linkedin.com/in/estefania-regidor-1971a680/',
    },
    jocselynAguilar: {
        name: 'Jocselyn Aguilar',
        handle: 'jocselynAguilar',
        image: jocselynAguilar,
        link: 'https://www.linkedin.com/in/jocselyn-aguilar-a85749251/',
    },
    anabelleVelasquez: {
        name: 'Anabelle Velásquez',
        handle: 'anabelleVelasquez',
        image: anabelleVelasquez,
        link: 'https://www.linkedin.com/in/anabellevg/',
    },
    jeremyVillegas: {
        name: 'Jeremy Villegas',
        handle: 'jeremyVillegas',
        image: jeremyVillegas,
        link: 'https://www.linkedin.com/in/jeremy-alejandro-villegas-rodriguez-a60bab218/',
    },
    alvaroCastillo: {
        name: 'Álvaro Castillo',
        handle: 'alvaroCastillo',
        image: alvaroCastillo,
        link: 'https://github.com/lvroc',
    },
    andreyVillalobos: {
        name: 'Andrey Villalobos',
        handle: 'andreyVillalobos',
        image: andreyVillalobos,
        link: 'https://github.com/andrey2620',
    },
    brandonLen: {
        name: 'Brandon Len',
        handle: 'brandonLen',
        image: brandonLen,
        link: 'https://github.com/LenVr',
    },
    keylorGomez: {
        name: 'Keylor Gomez',
        handle: 'keylorGomez',
        image: keylorGomez,
        link: 'https://www.linkedin.com/in/keylorgomez/',
    },
    isaacSandoval: {
        name: 'Isaac Sandoval',
        handle: 'isaacSandoval',
        image: isaacSandoval,
        link: 'https://github.com/Zhepyrinus',
    },
    marcosSaenz: {
        name: 'Marcos Sáenz',
        handle: 'marcosSaenz',
        image: marcosSaenz,
        link: 'https://www.linkedin.com/in/msaenz97/',
    },
    sebastianLopez: {
        name: 'Sebastian López',
        handle: 'sebastianLopez',
        image: sebastianLopez,
        link: 'https://github.com/Nanez17',
    },
    monseSandi: {
        name: 'Monserrat Sandí',
        handle: 'monseSandi',
        image: monseSandi,
        link: 'https://www.linkedin.com/in/monserrat-sand%C3%AD-fonseca-ab7536230/',
    },
    luciaManzanares: {
        name: 'Lucía Manzanares',
        handle: 'luciaManzanares',
        image: luciaManzanares,
        link: 'https://www.linkedin.com/in/luc%C3%ADa-manzanares-ram%C3%ADrez-2931a9211/',
    },
    marceloAlbacete: {
        name: 'Marcelo Albacete de la Cruz',
        handle: 'marceloAlbacete',
        image: marceloAlbacete,
        link: 'https://www.linkedin.com/in/marceloalbacetedelacruz/',
    },
    arielMontero: {
        name: 'Ariel Montero',
        handle: 'arielMontero',
        image: arielMontero,
        link: 'https://www.linkedin.com/in/ariel-montero-monestel-74a337186/',
    },
    sergioMonge: {
        name: 'Sergio Monge',
        handle: 'sergioMonge',
        image: sergioMonge,
        link: 'https://www.linkedin.com/in/sergio-monge-49363050/',
    },
    luisNaranjo: {
        name: 'Luis Naranjo',
        handle: 'luisNaranjo',
        image: luisNaranjo,
        link: 'https://www.linkedin.com/in/luisnaranjozeledon/',
    },
    tomasDeCamino: {
        name: 'Tomás De Camino Beck',
        handle: 'tomasDeCamino',
        image: tomasDeCamino,
        link: 'https://www.linkedin.com/in/tomas-de-camino-beck-ph-d-a64887102/',
    },
};
