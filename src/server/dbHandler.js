import Database from "better-sqlite3";
import crypto from "crypto";
const db = new Database('database.sqlite', { verbose: console.log });

let cachedLectors = null;

function getLectors() { // vypíše všechny lektory

    
    // #region Očekávaný output
    /*
    [
  {
    "uuid": "67fda282-2bca-41ef-9caf-039cc5c8dd69",
    "title_before": "Mgr.",
    "first_name": "Petra",
    "middle_name": "Swil",
    "last_name": "Plachá",
    "title_after": "MBA",
    "picture_url": "https://picsum.photos/200",
    "location": "Brno",
    "claim": "Bez dobré prezentace je i nejlepší myšlenka k ničemu.",
    "bio": "<b>Formátovaný text</b> s <i>bezpečnými</i> tagy.",
    "tags": [
      {
        "uuid": "c20b98dd-f37e-4fa7-aac1-73300abf086e",
        "name": "Marketing"
      }
    ],
    "price_per_hour": 720,
    "contact": {
      "telephone_numbers": [
        "+123 777 338 111"
      ],
      "emails": [
        "user@example.com"
      ]
    }
  }
]
*/
//#endregion

    //copilot návrh
    //return db.prepare(`SELECT * FROM Lectors`).all();

    if (cachedLectors != null) {
      return cachedLectors;
    }

    let lectors = db.prepare(/*sql*/`
    SELECT * FROM Lectors
    `).all()

    lectors.forEach(lector => {
      lector.tags = db.prepare(/*sql*/`
      SELECT * FROM tags WHERE lector_uuid = ?
      `).all(lector.UUID)

      lector.contact = {
        telephone_numbers: db.prepare(/*sql*/`
        SELECT * FROM telephone_numbers WHERE lector_uuid = ?
        `).all(lector.UUID).map(telephone_number => telephone_number.number),
        emails: db.prepare(/*sql*/`
        SELECT * FROM email WHERE lector_uuid = ?
        `).all(lector.UUID).map(email => email.email)
      }

    })

    lectors.forEach(lector => {
      lector.uuid = lector.UUID;
      delete lector.UUID;
    })

    cachedLectors = lectors;
    return lectors;
}

function createLector(input) { // vytvoří lektora
    //return (input)  

    cachedLectors = null;

    // #region Očekávaný input
/*
    {
  "title_before": "Mgr.",
  "first_name": "Petra",
  "middle_name": "Swil",
  "last_name": "Plachá",
  "title_after": "MBA",
  "picture_url": "https://picsum.photos/200",
  "location": "Brno",
  "claim": "Bez dobré prezentace je i nejlepší myšlenka k ničemu.",
  "bio": "<b>Formátovaný text</b> s <i>bezpečnými</i> tagy.",
  "tags": [
    {
      "name": "Marketing"
    }
  ],
  "price_per_hour": 720,
  "contact": {
    "telephone_numbers": [
      "+123 777 338 111"
    ],
    "emails": [
      "user@example.com"
    ]
  }
}
*/
//#endregion

  // create lector record in database

  let uuid = crypto.randomUUID();

  db.prepare(/*sql*/`
  INSERT INTO Lectors (UUID, title_before, first_name, middle_name, last_name, title_after, picture_url, location, claim, bio, price_per_hour)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) 
  `).run(uuid, input.title_before, input.first_name, input.middle_name, input.last_name, input.title_after, input.picture_url, input.location, input.claim, input.bio, input.price_per_hour)
    
  // create tags
  input.tags.forEach(tag => {
    let tag_uuid = crypto.randomUUID();
    db.prepare(/*sql*/`
    INSERT INTO tags (uuid, name, lector_uuid)
    VALUES (?, ?, ?)
    `).run(tag_uuid, tag.name, uuid)
  })

  // create telephone numbers
  input.contact.telephone_numbers.forEach(telephone_number => {
    let telephone_uuid = crypto.randomUUID();
    db.prepare(/*sql*/`
    INSERT INTO telephone_numbers (telephone_uuid, number, lector_uuid)
    VALUES (?, ?, ?)
    `).run(telephone_uuid, telephone_number, uuid)
  })

  // create emails
  input.contact.emails.forEach(email => {
    let email_uuid = crypto.randomUUID();
    db.prepare(/*sql*/`
    INSERT INTO email (email_uuid, email, lector_uuid)
    VALUES (?, ?, ?)
    `).run(email_uuid, email, uuid)
  })

    //#region Očekávaný output: (kopie aktuálního stavu záznamu lektora)
/*
    {
  "uuid": "67fda282-2bca-41ef-9caf-039cc5c8dd69",
  "title_before": "Mgr.",
  "first_name": "Petra",
  "middle_name": "Swil",
  "last_name": "Plachá",
  "title_after": "MBA",
  "picture_url": "https://picsum.photos/200",
  "location": "Brno",
  "claim": "Bez dobré prezentace je i nejlepší myšlenka k ničemu.",
  "bio": "<b>Formátovaný text</b> s <i>bezpečnými</i> tagy.",
  "tags": [
    {
      "uuid": "c20b98dd-f37e-4fa7-aac1-73300abf086e",
      "name": "Marketing"
    }
  ],
  "price_per_hour": 720,
  "contact": {
    "telephone_numbers": [
      "+123 777 338 111"
    ],
    "emails": [
      "user@example.com"
    ]
  }
}

    */
    //#endregion

    return getLectorById(uuid);
  }

function getLectorById(uuid) { // vypíše lektora podle id


  // get lector record from database

  let lector = db.prepare(/*sql*/`
  SELECT * FROM Lectors WHERE UUID = ?
  `).get(uuid)

  if (!lector) {
    return {
      code: 404,
      message: "User not found"
    }
  }

  // get tags
  let tags = db.prepare(/*sql*/`
  SELECT * FROM tags WHERE lector_uuid = ?
  `).all(uuid)

  // get telephone numbers
  let telephone_numbers = db.prepare(/*sql*/`
  SELECT * FROM telephone_numbers WHERE lector_uuid = ?
  `).all(uuid)

  // get emails
  let emails = db.prepare(/*sql*/`
  SELECT * FROM email WHERE lector_uuid = ?
  `).all(uuid)

  // create output
  lector.tags = tags;
  lector.contact = {
    telephone_numbers: telephone_numbers.map(telephone_number => telephone_number.number),
    emails: emails.map(email => email.email)
  }

  lector.uuid = lector.UUID;
  delete lector.UUID;
  
  return lector;
    //#region Očekávaný output
/*
    {
  "uuid": "67fda282-2bca-41ef-9caf-039cc5c8dd69",
  "title_before": "Mgr.",
  "first_name": "Petra",
  "middle_name": "Swil",
  "last_name": "Plachá",
  "title_after": "MBA",
  "picture_url": "https://picsum.photos/200",
  "location": "Brno",
  "claim": "Bez dobré prezentace je i nejlepší myšlenka k ničemu.",
  "bio": "<b>Formátovaný text</b> s <i>bezpečnými</i> tagy.",
  "tags": [
    {
      "uuid": "c20b98dd-f37e-4fa7-aac1-73300abf086e",
      "name": "Marketing"
    }
  ],
  "price_per_hour": 720,
  "contact": {
    "telephone_numbers": [
      "+123 777 338 111"
    ],
    "emails": [
      "user@example.com"
    ]
  }
}*/
//#endregion

    //#region Pokud nenajde lektora, vrátí:
/*
    {
  "code": 404,
  "message": "User not found"
}

    */
//#endregion
}

function editLector(uuid, input) {

  cachedLectors = null;
     
    //#region Očekávaný input: (POZOR! Ne všechny atributy musí být vyplněné, pokud není atributa vyplněná, zůstává na předchozí hodnotě)
/*
    {
  "title_before": "Mgr.",
  "first_name": "Petra",
  "middle_name": "Swil",
  "last_name": "Plachá",
  "title_after": "MBA",
  "picture_url": "https://picsum.photos/200",
  "location": "Brno",
  "claim": "Bez dobré prezentace je i nejlepší myšlenka k ničemu.",
  "bio": "<b>Formátovaný text</b> s <i>bezpečnými</i> tagy.",
  "tags": [
    {
      "name": "Marketing"
    }
  ],
  "price_per_hour": 720,
  "contact": {
    "telephone_numbers": [
      "+123 777 338 111"
    ],
    "emails": [
      "user@example.com"
    ]
  }
}*/
//#endregion

  let lector = db.prepare(/*sql*/`
  SELECT * FROM Lectors WHERE UUID = ?
  `).get(uuid)

  if (!lector) {
    return {
      code: 404,
      message: "User not found"
    }
  }

  //Edit lector
  db.prepare(/*sql*/`
  UPDATE Lectors SET title_before = coalesce(NULLIF(?, ''), title_before), 
  first_name = coalesce(NULLIF(?, ''), first_name),
  middle_name = coalesce(NULLIF(?, ''), middle_name),
  last_name = coalesce(NULLIF(?, ''), last_name),
  title_after = coalesce(NULLIF(?, ''), title_after),
  picture_url = coalesce(NULLIF(?, ''), picture_url),
  location = coalesce(NULLIF(?, ''), location),
  claim = coalesce(NULLIF(?, ''), claim),  
  bio = coalesce(NULLIF(?, ''), bio),
  price_per_hour = coalesce(NULLIF(?, ''), price_per_hour) 
  WHERE UUID = ?
  `).run(input.title_before, input.first_name, input.middle_name, input.last_name, input.title_after, input.picture_url, input.location, input.claim, input.bio, input.price_per_hour, uuid)

  //Edit tags
  if(input.hasOwnProperty("tags")){
    db.prepare(/*sql*/`
    DELETE FROM tags WHERE lector_uuid = ?
    `).run(uuid)

    input.tags.forEach(tag => {
        let tag_uuid = crypto.randomUUID();
        db.prepare(/*sql*/`
        INSERT INTO tags (uuid, name, lector_uuid)
        VALUES (?, ?, ?)
        `).run(tag_uuid, tag.name, uuid)
    })
  }

  //Edit telephone
  if(input.hasOwnProperty("contact") && input.contact.hasOwnProperty("telephone_numbers")){
    db.prepare(/*sql*/`
    DELETE FROM telephone_numbers WHERE lector_uuid = ?
    `).run(uuid)

    input.contact.telephone_numbers.forEach(telephone_number => {
      let telephone_uuid = crypto.randomUUID();
      db.prepare(/*sql*/`
      INSERT INTO telephone_numbers (telephone_uuid, number, lector_uuid)
      VALUES (?, ?, ?)
      `).run(telephone_uuid, telephone_number, uuid)
    })
  }
    
  //Edit Emails
  if(input.hasOwnProperty("contact") && input.contact.hasOwnProperty("emails")){
    db.prepare(/*sql*/`
    DELETE FROM email WHERE lector_uuid = ?
    `).run(uuid)

    input.contact.emails.forEach(email => {
      let email_uuid = crypto.randomUUID();
      db.prepare(/*sql*/`
      INSERT INTO email (email_uuid, email, lector_uuid)
      VALUES (?, ?, ?)
      `).run(email_uuid, email, uuid)
    })
  }

  return getLectorById(uuid);

    //#region Očekávaný output: (kopie aktuálního stavu záznamu lektora)
/*
{
  "uuid": "67fda282-2bca-41ef-9caf-039cc5c8dd69",
  "title_before": "Mgr.",
  "first_name": "Petra",
  "middle_name": "Swil",
  "last_name": "Plachá",
  "title_after": "MBA",
  "picture_url": "https://picsum.photos/200",
  "location": "Brno",
  "claim": "Bez dobré prezentace je i nejlepší myšlenka k ničemu.",
  "bio": "<b>Formátovaný text</b> s <i>bezpečnými</i> tagy.",
  "tags": [
    {
      "uuid": "c20b98dd-f37e-4fa7-aac1-73300abf086e",
      "name": "Marketing"
    }
  ],
  "price_per_hour": 720,
  "contact": {
    "telephone_numbers": [
      "+123 777 338 111"
    ],
    "emails": [
      "user@example.com"
    ]
  }
}
*/
//#endregion

    //#region Pokud lektor s uuid neexistuje, vrátí:
/*
    {
  "code": 404,
  "message": "User not found"
}

    */
//#endregion
}

function deleteLector(uuid) {

  cachedLectors = null;
  
  let lector = db.prepare(/*sql*/`
  SELECT * FROM Lectors WHERE UUID = ?
  `).get(uuid)

  if (!lector) {
    return {
      code: 404,
      message: "User not found"
    }
  }

  db.prepare(/*sql*/`
  DELETE FROM Lectors WHERE UUID = ?
  `).run(uuid)

  db.prepare(/*sql*/`
  DELETE FROM telephone_numbers WHERE lector_uuid = ?
  `).run(uuid)

  db.prepare(/*sql*/`
  DELETE FROM email WHERE lector_uuid = ?
  `).run(uuid)

  db.prepare(/*sql*/`
  DELETE FROM tags WHERE lector_uuid = ?
  `).run(uuid)

  return {
    code: 200,
    message: "User deleted"
  }

    //#region Očekávaný output:
/*
    {
  "code": 200,
  "message": "User deleted"
    }

    */
//#endregion

    //#region    Pokud lektor s uuid neexistuje, vrátí:
/*
    {
  "code": 404,
  "message": "User not found"
}
*/
//#endregion
}

export { db, getLectors, createLector, getLectorById, editLector, deleteLector };