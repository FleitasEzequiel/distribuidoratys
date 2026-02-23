export interface Product {
    id: number;
    image: string;
    title: string;
    description: string;
    price: number;
    badge?: string;
    badgeType?: 'new' | 'best-seller';
}

export const products: Product[] = [
    {
        id: 1,
        image: "/tys/berlin500.png",
        title: "Vaso Chop Berlin 500cc",
        description: "Vaso de vidrio estilo chop modelo Berlin con capacidad de 500cc. Ideal para disfrutar de una cerveza bien fría con un agarre ergonómico y vidrio de alta resistencia.",
        price: 1200,
    },
    {
        id: 2,
        image: "/tys/berlin1000.png",
        title: "Vaso Chop Berlin 1000cc",
        description: "Versión de gran tamaño del clásico Vaso Chop Berlin. Su capacidad de 1 litro lo hace perfecto para reuniones y eventos, fabricado con vidrio grueso para mantener la temperatura.",
        price: 2200,
    },
    {
        id: 3,
        image: "/tys/aluminiovidrio.png",
        title: "Vaso Chop Brasil 500cc",
        description: "Diseño elegante y moderno con detalles en aluminio. Combina la sofisticación del vidrio con la durabilidad de detalles metálicos, capacidad 500cc.",
        price: 1500,
    },
    {
        id: 4,
        image: "/tys/copanoruega.png",
        title: "Copa Noruega",
        description: "Copa de diseño escandinavo minimalista. Su forma estilizada realza los aromas y sabores de tus bebidas favoritas, aportando elegancia a cualquier mesa.",
        price: 1800,
    },
    {
        id: 5,
        image: "/tys/praga500.png",
        title: "Vaso Chop Praga 500cc",
        description: "Inspirado en los bares de la República Checa, este vaso de 500cc ofrece un diseño robusto y funcional, excelente para cervezas artesanales.",
        price: 1300,
    },
    {
        id: 6,
        image: "/tys/aluminiogris.png",
        title: "Jarra Chop Aluminio",
        description: "Jarra metálica de aluminio con acabado gris mate. Ultra ligera e irrompible, ideal para uso en exteriores o gastronomía de alto tráfico.",
        price: 2500,
    },
    {
        id: 7,
        image: "/tys/copacristal.png",
        title: "Copa Cristal",
        description: "Copa fabricada en cristal de alta pureza. Transparencia absoluta y sonido característico al brindar, ideal para vinos finos y ocasiones especiales.",
        price: 3500,
    },
    {
        id: 8,
        image: "/tys/copaacapulco.png",
        title: "Copa Acapulco",
        description: "Copa vibrante y festiva ideal para cócteles y postres. Su diseño aporta un toque veraniego y alegre a tu vajilla.",
        price: 2800,
    },
    {
        id: 9,
        image: "/tys/compoteraopalinanegra.png",
        title: "Compotera Opalina Negra",
        description: "Cuenco de vidrio opalino en color negro profundo. Acabado satinado que no se raya, perfecta para presentaciones gastronómicas modernas y sofisticadas.",
        price: 900,
    },
    {
        id: 10,
        image: "/tys/cacerola50.png",
        title: "Cacerola Gastronomica 50lts",
        description: "Cacerola de uso profesional con capacidad de 50 litros. Fabricada en aluminio de alto impacto con triple remache en asas, garantizando durabilidad extrema.",
        price: 45000,
    },
    {
        id: 11,
        image: "/tys/cacerola100.png",
        title: "Cacerola Gastronomica 100lts",
        description: "Equipamiento industrial para grandes cocinas. Capacidad de 100 litros, diseñada para una distribución uniforme del calor en cocciones de gran volumen.",
        price: 75000,
    },
    {
        id: 12,
        image: "/tys/cacerolahornoholandes.png",
        title: "Cacerola Hierro",
        description: "Cacerola de hierro fundido estilo horno holandés. Retención de calor superior para guisos perfectos, con esmaltado resistente al fuego directo y horno.",
        price: 32000,
    },
    {
        id: 13,
        image: "/tys/barrehojaschico.png",
        title: "Barrehojas Chico",
        description: "Barrehojas metálico reforzado. Ideal para mantenimiento de jardín.",
        price: 3500,
    },
    {
        id: 14,
        image: "/tys/pulverizador1.png",
        title: "Pulverizador 1lt",
        description: "Pulverizador manual de 1 litro con boquilla regulable. Resistente a químicos suaves.",
        price: 2100,
    },
    {
        id: 15,
        image: "/tys/vasogenesis.png",
        title: "Vaso Genesis",
        description: "Vaso de vidrio con forma de cama. Ideal para presentaciones gastronómicas modernas y sofisticadas.",
        price: 2100,
    },
    {
        id: 16,
        image: "/tys/vasopinta.png",
        title: "Vaso Pinta 500cc",
        description: "Vaso de vidrio estilo pinta con capacidad de 500cc. Ideal para disfrutar de una cerveza bien fría con un agarre ergonómico y vidrio de alta resistencia.",
        price: 1200,
    },
];
