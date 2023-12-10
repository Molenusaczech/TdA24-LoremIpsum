import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
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
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const Email = sequelize.define("Email", {
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

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
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    claim: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price_per_hour: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    picture_url: {
        type: DataTypes.STRING,
        allowNull: false,
    }/*,
    tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },*/
});

const LecturerTag = sequelize.define("LecturerTag", {}, { timestamps: false });

Lecturer.belongsToMany(Tag, { through: LecturerTag });
Tag.belongsToMany(Lecturer, { through: LecturerTag });
Phone.belongsTo(Lecturer);
Lecturer.hasMany(Phone);
Email.belongsTo(Lecturer);
Lecturer.hasMany(Email);

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


export { sequelize, Lecturer, Tag, Phone, Email };