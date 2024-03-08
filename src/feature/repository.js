import { schema } from "./schema.js";
import mongoose from "mongoose";
import nodemailer from "nodemailer"


const UserModel = mongoose.model('UserData', schema);

export default class User {

    async sendData(req, res) {
        console.log(req.body);
        const { selectedItems } = req.body;
        let userData=await UserModel.find({_id:selectedItems}, { _id: 0, name: 1, email: 1,phone:1,hobbies:1})
        let transporter = await nodemailer.createTransport({
            service: "gmail",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: "abhishek4321u@gmail.com",
                pass: "dmoq tipd dagv zwof",
            }
        });
        async function main() {
            // send mail with defined transport object
            const info = await transporter.sendMail({
                from: {
                    address: "abhishek4321@gmail.com"
                }, // sender address
                to: "info@redpositive.in", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "selected item", // plain text body
                html: `Selected items: ${userData.join(",")}`, // html body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
        }
        main().catch(console.error);
    }

    async addData(req, res) {
        const { name, phone, email, hobbies } = req.body
        const { id } = req.params

        const exsistingData = await UserModel.findOne({ _id: id })
        console.log("Exsisting data", exsistingData);
        if (exsistingData) {
            await UserModel.findOneAndUpdate({ _id: id }, { name, phone, email, hobbies });
            res.json({ message: 'Data updated successfully!' });

        }
        else {

            console.log("data from frontend", req.body);
            const add = new UserModel({ name, phone, email, hobbies })
            await add.save()
            res.send("data added")
        }

    }

    async getData(req, res) {
        const data = (await UserModel.find())
        res.send(data)
        // console.log(req.body);
    }

    async delete(req, res) {
        const { id } = req.params

        const deletedUser = await UserModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    }

}
