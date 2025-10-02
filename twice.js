document.addEventListener('DOMContentLoaded', () => {
    const memberButtons = document.querySelectorAll('.member-button');
    const memberInfoContainer = document.getElementById('member-info');
    
    // Objeto con la información de cada integrante
    const membersData = {
        nayeon: {
            name: "Nayeon",
            photo: "images/nayeon.jpeg",
            birthplace: "Seúl, Corea del Sur",
            birthday: "22 de septiembre de 1995",
            joinDate: "2015",
            position: "Vocalista principal, Centro, 'Fake Maknae'",
            biography: "Im Nayeon, conocida como Nayeon, es la miembro mayor de TWICE y una de las vocalistas principales. Es famosa por su voz clara y dulce, así como por su personalidad alegre y su carisma en el escenario. Antes de unirse a TWICE, Nayeon fue una de las concursantes más populares en el reality show 'SIXTEEN'. Su apodo 'Fake Maknae' se debe a que a menudo se comporta como la más joven del grupo."
        },
        jeongyeon: {
            name: "Jeongyeon",
            photo: "images/jeongyeon.jpeg",
            birthplace: "Suwon, Corea del Sur",
            birthday: "1 de noviembre de 1996",
            joinDate: "2015",
            position: "Vocalista líder",
            biography: "Yoo Jeongyeon es una vocalista líder de TWICE. Es conocida por su voz estable y su estilo andrógino en los inicios del grupo. Jeongyeon tiene una personalidad fuerte y protectora, y a menudo es vista como la 'madre' del grupo, cuidando de las demás miembros. Su talento vocal y su dedicación la han convertido en un pilar del grupo."
        },
        momo: {
            name: "Momo",
            photo: "images/momo.jpeg",
            birthplace: "Kyōtanabe, Kioto, Japón",
            birthday: "9 de noviembre de 1996",
            joinDate: "2015",
            position: "Bailarina principal, Sub-vocalista, Sub-rapera",
            biography: "Hirai Momo, conocida como Momo, es la bailarina principal de TWICE. Su impresionante habilidad en la danza la ha hecho una de las bailarinas más respetadas del K-pop. Es conocida por su baile enérgico y sus movimientos precisos. A pesar de su poderosa presencia en el escenario, tiene una personalidad dulce y a veces torpe fuera de él."
        },
        sana: {
            name: "Sana",
            photo: "images/sana.jpeg",
            birthplace: "Osaka, Japón",
            birthday: "29 de diciembre de 1996",
            joinDate: "2015",
            position: "Sub-vocalista",
            biography: "Minatozaki Sana, conocida como Sana, es una de las sub-vocalistas de TWICE. Es famosa por su encanto natural y su personalidad burbujeante y optimista, lo que le ha ganado el apodo de 'cutie sexy'. Su voz distintiva y su habilidad para atraer la atención de las cámaras la han convertido en una de las miembros más populares."
        },
        jihyo: {
            name: "Jihyo",
            photo: "images/jihyo.jpeg",
            birthplace: "Guri, Gyeonggi, Corea del Sur",
            birthday: "1 de febrero de 1997",
            joinDate: "2015",
            position: "Líder, Vocalista principal",
            biography: "Park Jihyo es la líder y vocalista principal de TWICE. Con más de 10 años de entrenamiento en JYP Entertainment, es una de las idols con más experiencia en la industria. Su voz potente y su liderazgo firme son los pilares del grupo. Jihyo es conocida por su trabajo duro y su capacidad para guiar a las miembros."
        },
        mina: {
            name: "Mina",
            photo: "images/mina.jpeg",
            birthplace: "San Antonio, Texas, EE. UU.",
            birthday: "24 de marzo de 1997",
            joinDate: "2015",
            position: "Bailarina principal, Sub-vocalista",
            biography: "Myoui Mina es una bailarina principal y sub-vocalista de TWICE. Nacida en Estados Unidos, creció en Japón y tiene un pasado en el ballet, lo que se refleja en sus movimientos gráciles y elegantes. Es conocida por su personalidad tranquila y reservada, pero su belleza y talento brillan en el escenario."
        },
        dahyun: {
            name: "Dahyun",
            photo: "images/dahyun.jpeg",
            birthplace: "Seongnam, Gyeonggi, Corea del Sur",
            birthday: "28 de mayo de 1998",
            joinDate: "2015",
            position: "Sub-rapera, Sub-vocalista",
            biography: "Kim Dahyun es una rapera y sub-vocalista de TWICE. Es famosa por su piel pálida, que le ha valido el apodo de 'Tofu'. Su personalidad divertida y enérgica, junto con su icónico 'Eagle Dance', la hacen una de las miembros más queridas por los fans. Dahyun es conocida por su versatilidad y sus habilidades de improvisación."
        },
        chaeyoung: {
            name: "Chaeyoung",
            photo: "images/chaeyoung.jpeg",
            birthplace: "Seúl, Corea del Sur",
            birthday: "23 de abril de 1999",
            joinDate: "2015",
            position: "Rapera principal, Sub-vocalista",
            biography: "Son Chaeyoung es la rapera principal de TWICE. Además de su talento para el rap, es una artista versátil que también canta y dibuja. Chaeyoung es conocida por su voz profunda y su estilo artístico único. Su personalidad es curiosa y valiente, siempre dispuesta a probar cosas nuevas."
        },
        tzuyu: {
            name: "Tzuyu",
            photo: "images/tzuyo.jpeg",
            birthplace: "Tainan, Taiwán",
            birthday: "14 de junio de 1999",
            joinDate: "2015",
            position: "Bailarina líder, Sub-vocalista, Visual, Maknae",
            biography: "Chou Tzuyu es la miembro más joven de TWICE. Es la 'visual' del grupo, reconocida por su belleza. Tzuyu es una bailarina y sub-vocalista talentosa, y su crecimiento en el escenario es notable. A pesar de ser la maknae, tiene una personalidad tranquila y madura, ganándose el cariño de sus compañeras y fans."
        }
    };

    memberButtons.forEach(button => {
        button.addEventListener('click', () => {
            const memberKey = button.dataset.member;
            const memberData = membersData[memberKey];

            if (memberData) {
                // Rellenar los elementos con la información de la integrante
                document.getElementById('member-photo').src = memberData.photo;
                document.getElementById('member-name').textContent = memberData.name;
                document.getElementById('member-birthplace').textContent = memberData.birthplace;
                document.getElementById('member-birthday').textContent = memberData.birthday;
                document.getElementById('member-join-date').textContent = memberData.joinDate;
                document.getElementById('member-position').textContent = memberData.position;
                document.getElementById('member-biography').textContent = memberData.biography;

                // Mostrar el contenedor de la información
                memberInfoContainer.classList.remove('hidden');
            }
        });
    });
});