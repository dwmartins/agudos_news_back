const db = require("../../config/dbConnection");
const logger = require("../../config/logger");

class Listing {
    name;
    category;
    summary;
    description;
    keywords;
    email;
    url;
    phone;
    address;
    complement;
    zipCode;
    Country;
    facebook;
    instagram;
    twitter;
    linkedIn;
    openingHours;
    promotionalCode;
    payment;
    image; // 1024px x 768px (JPG, GIF or PNG) max 5MB
    logoImage; // 250 x 250 px (JPG, GIF or PNG) max 5MB
    coverImage; // 1920 x 480 px (JPG, GIF or PNG) max 5MB
}