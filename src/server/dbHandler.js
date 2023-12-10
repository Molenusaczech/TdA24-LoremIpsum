import crypto from "crypto";

import { Lecturer, Tag, Phone, Email } from "./dbModels.js";

async function getLectors() { // vypíše všechny lektory


  let result = await Lecturer.findAll({
    include: [
      //Tag, Phone, Email
      {
        model: Tag
      },
      {
        model: Phone
      },
      {
        model: Email
      },
    ],
  });

  let final = result.map((lector) => {
    lector = JSON.parse(JSON.stringify(lector));

    lector.contact = {}

    if (lector.hasOwnProperty("Tags")) lector.tags = lector.Tags.map((tag) => {
      return {
        uuid: tag.uuid,
        name: tag.name,
      };
    
    }) 
    else lector.tags = [];

    if (lector.hasOwnProperty("Phones")) lector.contact.telephone_numbers = lector.Phones.map((phone) => phone.number)
    else lector.contact.telephone_numbers = [];

    if (lector.hasOwnProperty("Emails")) lector.contact.emails = lector.Emails.map((email) => email.email)
    else lector.contact.emails = [];


    delete lector.Phones;
    delete lector.Emails;
    delete lector.Tags;

    return lector;
    });


  console.log(final);
  return final;
}

async function createLector(input) { // vytvoří lektora
  //return (input)  

  let lector = await Lecturer.create({
    title_before: input.title_before,
    first_name: input.first_name,
    middle_name: input.middle_name,
    last_name: input.last_name,
    title_after: input.title_after,
    picture_url: input.picture_url,
    location: input.location,
    claim: input.claim,
    bio: input.bio,
    price_per_hour: input.price_per_hour,
  });

  if (input.hasOwnProperty("tags")) {
    //input.tags.forEach(async (tag) => {
    for (let tag of input.tags) {
      /*let finalTag = await Tag.create({
        //uuid: crypto.randomUUID(),
        name: tag.name
      });*/

      let [finalTag, created] = await Tag.findOrCreate({
        where: {
          name: tag.name
        },
        defaults: {
          name: tag.name
        }
      });

      lector.addTag(finalTag);
    };
  }

  if (input.hasOwnProperty("contact")) {
    if (input.contact.hasOwnProperty("telephone_numbers")) {
      input.contact.telephone_numbers.forEach(async (telephone_number) => {
        let finalPhone = await Phone.create({
          number: telephone_number
        });
        lector.addPhone(finalPhone);
      });
    }

    if (input.contact.hasOwnProperty("emails")) {
      input.contact.emails.forEach(async (email) => {
        let finalEmail = await Email.create({
          email: email
        });
        lector.addEmail(finalEmail);
      });
    }
  }

  let final = await getLectorById(lector.uuid);

  return final;
}

async function getLectorById(uuid) { // vypíše lektora podle id


  // get lector record from database

  let result = await Lecturer.findOne({
    where: {
      uuid: uuid,
    },
    include: [
      Tag, Phone, Email
    ],
  });

  let tags = await result.getTags()
  let emails = await result.getEmails()
  let telephone_numbers = await result.getPhones()
  tags = tags.map((tag) => {
    return {
      uuid: tag.uuid,
      name: tag.name,
    };
  });

  let final = JSON.parse(JSON.stringify(result));

  final.tags = tags;
  final.contact = {
    telephone_numbers: telephone_numbers.map((telephone_number) => telephone_number.number),
    emails: emails.map((email) => email.email),
  };

  delete final.Tags;
  delete final.Phones;
  delete final.Emails;

  return final;

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
  if (input.hasOwnProperty("tags")) {
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
  if (input.hasOwnProperty("contact") && input.contact.hasOwnProperty("telephone_numbers")) {
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
  if (input.hasOwnProperty("contact") && input.contact.hasOwnProperty("emails")) {
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

export { getLectors, createLector, getLectorById, editLector, deleteLector };