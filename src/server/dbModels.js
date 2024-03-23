import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
    transactionType: "IMMEDIATE",
});

/*const Objective = sequelize.define("Objective", {
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: true,
        defaultValue: DataTypes.UUIDV4,
    },
    objectiveName: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

const EdLevel = sequelize.define("EdLevel", {
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: true,
        defaultValue: DataTypes.UUIDV4,
    },
    levelName: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

const Tool = sequelize.define("Tool", {
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    toolName: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

const HomePreparation = sequelize.define("HomePreparation", {
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    warn: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    note: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

const Instruction = sequelize.define("Instruction", {
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    warn: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    note: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

const Agenda = sequelize.define("Agenda", {
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

const Link = sequelize.define("Link", {
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

const Gallery = sequelize.define("Gallery", {
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

const Image = sequelize.define("Image", {
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    lowRes: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    highRes: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});*/

const Activity = sequelize.define("Activity", {
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    activityName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    objectives: {
        type: DataTypes.STRING,
        allowNull: true,	
    },
    lengthMin: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    lengthMax: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    classStructure: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    edlevels: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tools: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    homePreparation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    instructions: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    agenda: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    links: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    galleries: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    summary: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

/*const ActivityObjective = sequelize.define("ActivityObjective", {}, { timestamps: false });
const ActivityEdLevel = sequelize.define("ActivityEdLevel", {}, { timestamps: false });
const ActivityTool = sequelize.define("ActivityTool", {}, { timestamps: false });

Activity.belongsToMany(Objective, { through: ActivityObjective });
Objective.belongsToMany(Activity, { through: ActivityObjective });

Activity.belongsToMany(EdLevel, { through: ActivityEdLevel });
EdLevel.belongsToMany(Activity, { through: ActivityEdLevel });

Activity.belongsToMany(Tool, { through: ActivityTool });
Tool.belongsToMany(Activity, { through: ActivityTool });

HomePreparation.belongsTo(Activity);
Activity.hasMany(HomePreparation);

Instruction.belongsTo(Activity);
Activity.hasMany(Instruction);

Agenda.belongsTo(Activity);
Activity.hasMany(Agenda);

Link.belongsTo(Activity);
Activity.hasMany(Link);

Gallery.belongsTo(Activity);
Activity.hasMany(Gallery);

Image.belongsTo(Gallery);
Gallery.hasMany(Image);

Activity.sync();
Objective.sync();
EdLevel.sync();
Tool.sync();
HomePreparation.sync();
Instruction.sync();
Agenda.sync();
Link.sync();
Gallery.sync();
Image.sync();
ActivityObjective.sync();
ActivityEdLevel.sync();
ActivityTool.sync();

export { sequelize, 
    Activity, 
    Objective, 
    EdLevel, 
    Tool, 
    HomePreparation,
    Instruction, 
    Agenda, 
    Link, 
    Gallery, 
    Image 
};*/

Activity.sync();

export { sequelize, Activity };

/*


const Tag = sequelize.define("Tag", {
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        timestamps: false,
    }
);

const Phone = sequelize.define("Phone", {
    uuid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        timestamps: false,
    }
);

const Email = sequelize.define("Email", {
    uuid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        timestamps: false,
    }
);

const Lecturer = sequelize.define("Lecturer", {

    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    title_before: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    middle_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title_after: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    claim: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price_per_hour: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    picture_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
    {
        timestamps: false,
    });

const Token = sequelize.define("Token", {
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiration: {
        type: DataTypes.DATE,
        allowNull: false,
    },
},
    {
        timestamps: false,
    }
);

const Booking = sequelize.define("Booking", {
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    start: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    note: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isOnline: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    length: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
    {
        timestamps: false,
    }
);

const LecturerTag = sequelize.define("LecturerTag", {}, { timestamps: false });
const BookingTag = sequelize.define("BookingTag", {}, { timestamps: false });

Lecturer.belongsToMany(Tag, { through: LecturerTag });
Tag.belongsToMany(Lecturer, { through: LecturerTag });
Phone.belongsTo(Lecturer);
Lecturer.hasMany(Phone);
Email.belongsTo(Lecturer);
Lecturer.hasMany(Email);
Token.belongsTo(Lecturer);
Lecturer.hasMany(Token);
Booking.belongsTo(Lecturer);
Lecturer.hasMany(Booking);

Booking.belongsToMany(Tag, { through: BookingTag });
Tag.belongsToMany(Booking, { through: BookingTag });


Lecturer.sync();
Tag.sync();
Phone.sync();
Email.sync();
LecturerTag.sync();
Token.sync();
Booking.sync();
BookingTag.sync();


export { sequelize, Lecturer, Tag, Phone, Email, Token, Booking};*/