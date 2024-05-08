const invitationEntriesDataMock = [
  {
    id: "10",
    userID: "45645",
    username: "David Leonardo Garzón",
    email: "lgarzon@gmail.com",
    invitationDate: "11/JUN/2022",
    status: "Sent",
    phone: "3123456789",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "11",
    userID: "534693",
    username: "Cristina Schmidt",
    email: "cristina_schmidt@gmail.com",
    invitationDate: "11/ENE/2022",
    status: "Pending",
    phone: "3209876543",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "12",
    userID: "757712",
    username: "Roberta Wallace",
    email: "roberta_wallace@gmail.com",
    invitationDate: "26/AGO/2022",
    status: "Sent",
    phone: "3145678901",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "13",
    userID: "440652",
    username: "Gross Mendez",
    email: "gross_mendez@gmail.com",
    invitationDate: "17/MAY/2022",
    status: "Sent",
    phone: "3187654321",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "14",
    userID: "846779",
    username: "Martinez French",
    email: "martinez_french@gmail.com",
    invitationDate: "07/OCT/2022",
    status: "Pending",
    phone: "3198765432",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "15",
    userID: "838645",
    username: "Lowe Ellis",
    email: "lowe_ellis@gmail.com",
    invitationDate: "05/ENE/2022",
    status: "Sent",
    phone: "3134567890",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "16",
    userID: "835761",
    username: "Barlow Ballard",
    email: "barlow_ballard@gmail.com",
    invitationDate: "03/MAR/2022",
    status: "Sent",
    phone: "3176543210",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "17",
    userID: "592492",
    username: "Madeline Ayers",
    email: "madeline_ayers@gmail.com",
    invitationDate: "20/JUL/2022",
    status: "Pending",
    phone: "3156789012",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "18",
    userID: "683321",
    username: "Bowen Greene",
    email: "bowen_greene@gmail.com",
    invitationDate: "26/ABR/2022",
    status: "Sent",
    phone: "3167890123",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "19",
    userID: "695730",
    username: "Deborah Elliott",
    email: "deborah_elliott@gmail.com",
    invitationDate: "03/AGO/2022",
    status: "Pending",
    phone: "3145678901",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "20",
    userID: "682422",
    username: "Karina Fitzgerald",
    email: "karina_fitzgerald@gmail.com",
    invitationDate: "07/FEB/2022",
    status: "Pending",
    phone: "3209876543",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "21",
    userID: "746049",
    username: "Rachel Carpenter",
    email: "rachel_carpenter@gmail.com",
    invitationDate: "24/FEB/2022",
    status: "Pending",
    phone: "3176543210",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "22",
    userID: "816645",
    username: "Judith Santana",
    email: "judith_santana@gmail.com",
    invitationDate: "10/JUN/2022",
    status: "Pending",
    phone: "3187654321",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "23",
    userID: "486616",
    username: "Angelita Stein",
    email: "angelita_stein@gmail.com",
    invitationDate: "27/AGO/2022",
    status: "Pending",
    phone: "3156789012",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "24",
    userID: "774335",
    username: "Pamela Gibbs",
    email: "pamela_gibbs@gmail.com",
    invitationDate: "01/JUN/2022",
    status: "Pending",
    phone: "3134567890",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "25",
    userID: "536431",
    username: "Osborn Larsen",
    email: "osborn_larsen@gmail.com",
    invitationDate: "09/AGO/2022",
    status: "Pending",
    phone: "3198765432",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "26",
    userID: "479249",
    username: "Tisha Stevens",
    email: "tisha_stevens@gmail.com",
    invitationDate: "20/JUN/2022",
    status: "Sent",
    phone: "3123456789",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "27",
    userID: "448172",
    username: "Rosemarie Snow",
    email: "rosemarie_snow@gmail.com",
    invitationDate: "10/JUL/2022",
    status: "Sent",
    phone: "3187654321",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "28",
    userID: "898779",
    username: "Terry Shaffer",
    email: "terry_shaffer@gmail.com",
    invitationDate: "07/ABR/2022",
    status: "Sent",
    phone: "3198765432",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "29",
    userID: "692860",
    username: "Sofia Osborn",
    email: "sofia_osborn@gmail.com",
    invitationDate: "22/ABR/2022",
    status: "Sent",
    phone: "3167890123",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "30",
    userID: "666124",
    username: "Campos Christensen",
    email: "campos_christensen@gmail.com",
    invitationDate: "18/MAR/2022",
    status: "Pending",
    phone: "3145678901",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "31",
    userID: "454377",
    username: "Stacy Cooke",
    email: "stacy_cooke@gmail.com",
    invitationDate: "23/MAR/2022",
    status: "Sent",
    phone: "3134567890",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "32",
    userID: "404949",
    username: "Goff Mejia",
    email: "goff_mejia@gmail.com",
    invitationDate: "15/SEP/2022",
    status: "Pending",
    phone: "3156789012",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "33",
    userID: "615315",
    username: "Mcintyre Wells",
    email: "mcintyre_wells@gmail.com",
    invitationDate: "12/FEB/2022",
    status: "Pending",
    phone: "3176543210",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "34",
    userID: "842395",
    username: "Alyce Powers",
    email: "alyce_powers@gmail.com",
    invitationDate: "24/ABR/2022",
    status: "Sent",
    phone: "3187654321",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "35",
    userID: "801730",
    username: "Kathleen Matthews",
    email: "kathleen_matthews@gmail.com",
    invitationDate: "30/OCT/2022",
    status: "Sent",
    phone: "3123456789",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "36",
    userID: "700677",
    username: "Susana Davidson",
    email: "susana_davidson@gmail.com",
    invitationDate: "16/ABR/2022",
    status: "Sent",
    phone: "3198765432",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "37",
    userID: "421571",
    username: "Carr Brady",
    email: "carr_brady@gmail.com",
    invitationDate: "06/FEB/2022",
    status: "Pending",
    phone: "3156789012",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
  {
    id: "38",
    userID: "576861",
    username: "Whitney Copeland",
    email: "whitney_copeland@gmail.com",
    invitationDate: "15/NOV/2022",
    status: "Sent",
    phone: "3145678901",
    cargoId: "001",
    cargo: "Adminstrador Funcional",
  },
];

export { invitationEntriesDataMock };
