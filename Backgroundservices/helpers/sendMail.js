const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

function createTransporter(config) {
    const transporter =nodemailer.createTransport(config);
    return transporter;
}

let configurations = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
};

const sendMail = async (messageOptions) => {
    try {
        const transporter = createTransporter(configurations);

        // Verify connection configuration
        await transporter.verify();
        console.log("Transporter verified successfully.");

        // Send the email
        const info = await transporter.sendMail(messageOptions);
        console.log("Email sent successfully:", info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = sendMail;
