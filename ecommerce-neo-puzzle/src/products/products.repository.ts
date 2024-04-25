import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductsRepository {
    private products = [
        {
            id: 1,
            name: "Laptop HP Pavilion",
            description: "Potente laptop con procesador Intel Core i7 y pantalla de 15.6 pulgadas.",
            price: 899.99,
            stock: true,
            imgUrl: "https://example.com/laptop-hp-pavilion.jpg"
        },
        {
            id: 2,
            name: "Smartphone Samsung Galaxy S21",
            description: "Teléfono inteligente de alta gama con pantalla AMOLED de 6.2 pulgadas y cámara de 108 MP.",
            price: 1099.99,
            stock: true,
            imgUrl: "https://example.com/samsung-galaxy-s21.jpg"
        },
        {
            id: 3,
            name: "Tablet Apple iPad Pro",
            description: "Potente tablet con pantalla Retina de 12.9 pulgadas y chip M1 de Apple.",
            price: 1299.99,
            stock: true,
            imgUrl: "https://example.com/apple-ipad-pro.jpg"
        },
        {
            id: 4,
            name: "Smart TV LG OLED",
            description: "Televisor inteligente con pantalla OLED de 55 pulgadas y resolución 4K.",
            price: 1799.99,
            stock: true,
            imgUrl: "https://example.com/lg-oled-tv.jpg"
        },
        {
            id: 5,
            name: "Cámara Canon EOS Rebel T7",
            description: "Cámara réflex digital con sensor CMOS de 24.1 MP y grabación de video Full HD.",
            price: 599.99,
            stock: true,
            imgUrl: "https://example.com/canon-eos-rebel-t7.jpg"
        },
        {
            id: 6,
            name: "Auriculares Sony WH-1000XM4",
            description: "Auriculares inalámbricos con cancelación de ruido y hasta 30 horas de autonomía.",
            price: 349.99,
            stock: true,
            imgUrl: "https://example.com/sony-wh-1000xm4.jpg"
        },
        {
            id: 7,
            name: "Impresora Epson EcoTank",
            description: "Impresora de inyección de tinta con tanque de tinta recargable y conexión Wi-Fi.",
            price: 299.99,
            stock: true,
            imgUrl: "https://example.com/epson-ecotank-printer.jpg"
        },
        {
            id: 8,
            name: "Robot aspirador Roomba",
            description: "Robot aspirador inteligente con navegación avanzada y función de mapeo de la casa.",
            price: 499.99,
            stock: true,
            imgUrl: "https://example.com/roomba-vacuum.jpg"
        },
        {
            id: 9,
            name: "Teclado mecánico Razer BlackWidow",
            description: "Teclado para juegos con interruptores mecánicos y retroiluminación personalizable.",
            price: 149.99,
            stock: true,
            imgUrl: "https://example.com/razer-blackwidow-keyboard.jpg"
        },
        {
            id: 10,
            name: "Mouse Logitech MX Master 3",
            description: "Mouse inalámbrico ergonómico con sensor de alta precisión y botón de rueda de desplazamiento rápido.",
            price: 99.99,
            stock: true,
            imgUrl: "https://example.com/logitech-mx-master-3.jpg"
        },
        {
            id: 11,
            name: "Monitor Dell UltraSharp",
            description: "Monitor IPS de 27 pulgadas con resolución 4K y cobertura de color 99% sRGB.",
            price: 699.99,
            stock: true,
            imgUrl: "https://example.com/dell-ultrasharp-monitor.jpg"
        },
        {
            id: 12,
            name: "Altavoz Bluetooth JBL Charge 4",
            description: "Altavoz portátil resistente al agua con batería de hasta 20 horas de reproducción.",
            price: 149.99,
            stock: true,
            imgUrl: "https://example.com/jbl-charge-4-speaker.jpg"
        }
    ];
    

    async getProducts() {
    return await this.products;
    }
}