const { Client } = require("pg");

const SQL = `
    CREATE TABLE categories
    (
        id          INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name        VARCHAR(50),
        description VARCHAR(255)
    );

    CREATE TABLE documents
    (
        id       INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        title    VARCHAR(100),
        pages    INTEGER,
        category INTEGER,
        file     VARCHAR(255),
        CONSTRAINT fk_cat FOREIGN KEY (category) REFERENCES categories (id)
    );
    INSERT INTO categories (name, description)
    VALUES ('Office', 'Themen zu Microsoft 365 und andere Office Produkte sowie Betriebssysteme'),
           ('Grafik',
            'Themen zu Adobe Grafikprogramme wie zum Beispiel Photoshop, Illustrator oder Premiere Pro sowie Serif Produkte (Affinity Suete)'),
           ('Online Marketing', 'Themen zu Social Media, Marketing allgemein sowie E-Commerce und Google Suchoptimierung'),
           ('Coding & Web',
            'Themen zu Softwareentwicklung wie OOP sowie Programmiersprachen wie zum Beispiel C#, Pythen und Webentwicklung im Front- sowei Backend (PHP, JS, TS, ...')
    ;

    INSERT INTO documents (title, pages, category, file)
    VALUES ('Word Grundlagen', 114, 1, 'https://1drv.ms/b/s!At7_YMOfzDvkg_UtpaT5d_Gpl_66HQ?e=r9eFbi'),
           ('Adobe Photoshop', 201, 2, 'https://1drv.ms/b/s!At7_YMOfzDvkg_UuXkVCnvHDR7_XhA?e=WgBKov'),
           ('E-Commerce', 159, 3, 'https://1drv.ms/b/s!At7_YMOfzDvkg_UvQ0ApObcTUvrZ_w?e=zfwydB'),
           ('PHP', 336, 4, 'https://1drv.ms/b/s!At7_YMOfzDvkg_Uw-2OPOU7HMoHMjQ?e=upcghd');
`;

async function main() {
  console.log("seeding...");
  const host = process.argv[2];
  const client = new Client({
    connectionString: `postgresql://inventory:geheim@${host}:5432/inventory`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
