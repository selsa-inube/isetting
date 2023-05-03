const invitationEntriesDataMock = [
  {
    id: 11,
    userID: "45645",
    username: "David Leonardo Garzón",
    mail: "LGARZON",
    invitationDate: "11/JUN/2022",
    status: "Sent",
  },
  {
    id: 65,
    userID: "534693",
    username: "Cristina Schmidt",
    mail: "cristina_schmidt@gmail.com",
    invitationDate: "11/ENE/2022",
    status: "Pending",
  },
  {
    id: 96,
    userID: "757712",
    username: "Roberta Wallace",
    mail: "roberta_wallace@gmail.com",
    invitationDate: "26/AGO/2022",
    status: "Sent",
  },
  {
    id: 48,
    userID: "440652",
    username: "Gross Mendez",
    mail: "gross_mendez@gmail.com",
    invitationDate: "17/MAY/2022",
    status: "Sent",
  },
  {
    id: 61,
    userID: "846779",
    username: "Martinez French",
    mail: "martinez_french@gmail.com",
    invitationDate: "07/OCT/2022",
    status: "Pending",
  },
  {
    id: 66,
    userID: "838645",
    username: "Lowe Ellis",
    mail: "lowe_ellis@gmail.com",
    invitationDate: "05/ENE/2022",
    status: "Sent",
  },
  {
    id: 38,
    userID: "835761",
    username: "Barlow Ballard",
    mail: "barlow_ballard@gmail.com",
    invitationDate: "03/MAR/2022",
    status: "Sent",
  },
  {
    id: 30,
    userID: "592492",
    username: "Madeline Ayers",
    mail: "madeline_ayers@gmail.com",
    invitationDate: "20/JUL/2022",
    status: "Pending",
  },
  {
    id: 5,
    userID: "683321",
    username: "Bowen Greene",
    mail: "bowen_greene@gmail.com",
    invitationDate: "26/ABR/2022",
    status: "Sent",
  },
  {
    id: 38,
    userID: "695730",
    username: "Deborah Elliott",
    mail: "deborah_elliott@gmail.com",
    invitationDate: "03/AGO/2022",
    status: "Pending",
  },
  {
    id: 10,
    userID: "682422",
    username: "Karina Fitzgerald",
    mail: "karina_fitzgerald@gmail.com",
    invitationDate: "07/FEB/2022",
    status: "Pending",
  },
  {
    id: 13,
    userID: "746049",
    username: "Rachel Carpenter",
    mail: "rachel_carpenter@gmail.com",
    invitationDate: "24/FEB/2022",
    status: "Pending",
  },
  {
    id: 42,
    userID: "816645",
    username: "Judith Santana",
    mail: "judith_santana@gmail.com",
    invitationDate: "10/JUN/2022",
    status: "Pending",
  },
  {
    id: 81,
    userID: "486616",
    username: "Angelita Stein",
    mail: "angelita_stein@gmail.com",
    invitationDate: "27/AGO/2022",
    status: "Pending",
  },
  {
    id: 20,
    userID: "774335",
    username: "Pamela Gibbs",
    mail: "pamela_gibbs@gmail.com",
    invitationDate: "01/JUN/2022",
    status: "Pending",
  },
  {
    id: 92,
    userID: "536431",
    username: "Osborn Larsen",
    mail: "osborn_larsen@gmail.com",
    invitationDate: "09/AGO/2022",
    status: "Pending",
  },
  {
    id: 78,
    userID: "479249",
    username: "Tisha Stevens",
    mail: "tisha_stevens@gmail.com",
    invitationDate: "20/JUN/2022",
    status: "Sent",
  },
  {
    id: 43,
    userID: "448172",
    username: "Rosemarie Snow",
    mail: "rosemarie_snow@gmail.com",
    invitationDate: "10/JUL/2022",
    status: "Sent",
  },
  {
    id: 94,
    userID: "898779",
    username: "Terry Shaffer",
    mail: "terry_shaffer@gmail.com",
    invitationDate: "07/ABR/2022",
    status: "Sent",
  },
  {
    id: 60,
    userID: "692860",
    username: "Sofia Osborn",
    mail: "sofia_osborn@gmail.com",
    invitationDate: "22/ABR/2022",
    status: "Sent",
  },
  {
    id: 90,
    userID: "666124",
    username: "Campos Christensen",
    mail: "campos_christensen@gmail.com",
    invitationDate: "18/MAR/2022",
    status: "Pending",
  },
  {
    id: 84,
    userID: "454377",
    username: "Stacy Cooke",
    mail: "stacy_cooke@gmail.com",
    invitationDate: "23/MAR/2022",
    status: "Sent",
  },
  {
    id: 55,
    userID: "404949",
    username: "Goff Mejia",
    mail: "goff_mejia@gmail.com",
    invitationDate: "15/SEP/2022",
    status: "Pending",
  },
  {
    id: 51,
    userID: "615315",
    username: "Mcintyre Wells",
    mail: "mcintyre_wells@gmail.com",
    invitationDate: "12/FEB/2022",
    status: "Pending",
  },
  {
    id: 35,
    userID: "842395",
    username: "Alyce Powers",
    mail: "alyce_powers@gmail.com",
    invitationDate: "24/ABR/2022",
    status: "Sent",
  },
  {
    id: 89,
    userID: "801730",
    username: "Kathleen Matthews",
    mail: "kathleen_matthews@gmail.com",
    invitationDate: "30/OCT/2022",
    status: "Sent",
  },
  {
    id: 89,
    userID: "700677",
    username: "Susana Davidson",
    mail: "susana_davidson@gmail.com",
    invitationDate: "16/ABR/2022",
    status: "Sent",
  },
  {
    id: 18,
    userID: "421571",
    username: "Carr Brady",
    mail: "carr_brady@gmail.com",
    invitationDate: "06/FEB/2022",
    status: "Pending",
  },
  {
    id: 100,
    userID: "576861",
    username: "Whitney Copeland",
    mail: "whitney_copeland@gmail.com",
    invitationDate: "15/NOV/2022",
    status: "Sent",
  },
];

export { invitationEntriesDataMock };
