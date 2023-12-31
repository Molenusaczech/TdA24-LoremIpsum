import { Lecturer, Tag, Phone, Email } from "./dbModels.js";

async function cleanup() {
  let tags = await Tag.findAll({
    include: [
      Lecturer
    ]
  });

  tags.forEach(async (tag) => {
    let lecturers = await tag.Lecturers;

    if (lecturers.length == 0) {
      await tag.destroy();
    }
  });
}

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

  if (input.first_name == null || input.first_name == "" || !input.hasOwnProperty("first_name")) {
    return {
      code: 400,
      message: "First name is required"
    }
  }

  if (input.last_name == null || input.last_name == "" || !input.hasOwnProperty("last_name")) {
    return {
      code: 400,
      message: "Last name is required"
    }
  }

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

  if (input.hasOwnProperty("tags") && input.tags != null) {
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

  if (input.hasOwnProperty("contact") && input.contact != null) {
    if (input.contact.hasOwnProperty("telephone_numbers") && input.contact.telephone_numbers != null) {
      //input.contact.telephone_numbers.forEach(async (telephone_number) => {


      for (let telephone_number of input.contact.telephone_numbers) {
        let finalPhone = await Phone.create({
          number: telephone_number
        });
        lector.addPhone(finalPhone);
      };
    }

    if (input.contact.hasOwnProperty("emails") && input.contact.emails != null) {
      //input.contact.emails.forEach(async (email) => {
      for (let email of input.contact.emails) {
        let finalEmail = await Email.create({
          email: email
        });
        lector.addEmail(finalEmail);
      };
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

  if (!result) {
    return {
      code: 404,
      message: "User not found"
    }
  }

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

async function editLector(uuid, input) {

  if (input.first_name == null || input.first_name == "") {
    return {
      code: 400,
      message: "First name is required"
    }
  }

  if (input.last_name == null || input.last_name == "") {
    return {
      code: 400,
      message: "Last name is required"
    }
  }

  let lector = await Lecturer.findOne({
    where: {
      uuid: uuid,
    }
  },
    {
      include: [
        Tag, Phone, Email
      ],
    }
  )

  if (!lector) {
    return {
      code: 404,
      message: "User not found"
    }
  }

  //lector = JSON.parse(JSON.stringify(lector));

  if (input.hasOwnProperty("title_before")) lector.title_before = input.title_before;
  if (input.hasOwnProperty("first_name")) lector.first_name = input.first_name;
  if (input.hasOwnProperty("middle_name")) lector.middle_name = input.middle_name;
  if (input.hasOwnProperty("last_name")) lector.last_name = input.last_name;
  if (input.hasOwnProperty("title_after")) lector.title_after = input.title_after;
  if (input.hasOwnProperty("picture_url")) lector.picture_url = input.picture_url;
  if (input.hasOwnProperty("location")) lector.location = input.location;
  if (input.hasOwnProperty("claim")) lector.claim = input.claim;
  if (input.hasOwnProperty("bio")) lector.bio = input.bio;
  if (input.hasOwnProperty("price_per_hour")) lector.price_per_hour = input.price_per_hour;

  if (input.hasOwnProperty("tags")) {
    lector.setTags([]);

    for (let tag of input.tags) {
      let [finalTag, created] = await Tag.findOrCreate({
        where: {
          name: tag.name
        },
        defaults: {
          name: tag.name
        }
      });

      await lector.addTag(finalTag);
    };
  }

  if (input.hasOwnProperty("contact")) {
    if (input.contact.hasOwnProperty("telephone_numbers")) {
      
      // delete all phones
      let oldPhones = await lector.getPhones();

      for (let phone of oldPhones) {
        await phone.destroy();
      }

      // add new phones

      for (let phone of input.contact.telephone_numbers) {
        let [finalPhone, created] = await Phone.findOrCreate({
          where: {
            number: phone
          },
          defaults: {
            number: phone
          }
        });

        await lector.addPhone(finalPhone);
      };
    }

    if (input.contact.hasOwnProperty("emails")) {
      
      // delete all emails
      let oldEmails = await lector.getEmails();

      for (let email of oldEmails) {
        await email.destroy();
      }


      for (let email of input.contact.emails) {
        let [finalEmail, created] = await Email.findOrCreate({
          where: {
            email: email
          },
          defaults: {
            email: email
          }
        });

        await lector.addEmail(finalEmail);
      };
    }
  }

  console.log(lector);

  await lector.save();

  await cleanup();

  return await getLectorById(uuid);

}

async function deleteLector(uuid) {

  let lector = await Lecturer.findOne({
    where: {
      uuid: uuid,
    }
  })

  if (!lector) {
    return {
      code: 404,
      message: "User not found"
    }
  }

  await lector.destroy();
  await cleanup();

  return {
    code: 200,
    message: "User deleted"
  }
}

export { getLectors, createLector, getLectorById, editLector, deleteLector };