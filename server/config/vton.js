import { client } from "@gradio/client";
import "dotenv/config";

// const HumanImgBuffer = fs.readFileSync("../assets/human.jpg");
// const ClothImgBuffer = fs.readFileSync("../assets/Tshirt.png"); // 🔄 use PNG instead of JPG

// const human = new Blob([HumanImgBuffer], { type: "image/jpg" });
// const cloth = new Blob([ClothImgBuffer], { type: "image/png" });

// const inputHuman = {
//   background: human,
//   layers: [],
//   composite: null,
// };

//NOTE: job timeout !! wait for it back
console.log("process.env.HuggingFaceToken: ", process.env.HuggingFaceToken);
const tryOn = await client("yisol/IDM-VTON", {
  hf_token: `${process.env.HuggingFaceToken}`,
});

// const result = await app.predict("/tryon", [
//   inputHuman,
//   cloth,
//   "virtual try-on", // 🔄 better than ""
//   true,
//   true,
//   30,
//   0, // random seed
// ]);

export default tryOn;
