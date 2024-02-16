import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
    transactionType: "IMMEDIATE",
});

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
    });

const LecturerTag = sequelize.define("LecturerTag", {}, { timestamps: false });

Lecturer.belongsToMany(Tag, { through: LecturerTag });
Tag.belongsToMany(Lecturer, { through: LecturerTag });
Phone.belongsTo(Lecturer);
Lecturer.hasMany(Phone);
Email.belongsTo(Lecturer);
Lecturer.hasMany(Email);
Token.belongsTo(Lecturer);
Lecturer.hasMany(Token);

/*Lecturer.sync({ force: true});
Tag.sync({ force: true});
Phone.sync({ force: true});
Email.sync({ force: true});
LecturerTag.sync({ force: true});*/

Lecturer.sync();
Tag.sync();
Phone.sync();
Email.sync();
LecturerTag.sync();
Token.sync();


export { sequelize, Lecturer, Tag, Phone, Email, Token };