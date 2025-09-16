import { Blob } from "buffer";
import fs from "fs";
import vton from "../../config/vton.js";

//done
// first I'll get user's personal Image then get product Image (get Image has product only) then receiver as Buffer then convert it into Blob then use send param to
// provider's service and get result data formatting:
// result.data:
//  [
//         {
//             "path": "/tmp/gradio/364a595443dff1713971f2577c7716508b9106cb/image.png",
//             "url": "https://yisol-idm-vton.hf.space/file=/tmp/gradio/364a595443dff1713971f2577c7716508b9106cb/image.png", // this is url to get final image (user + product)
//             "size": null,
//             "orig_name": "image.png",
//             "mime_type": null,
//             "is_stream": false,
//             "meta": {
//                 "_type": "gradio.FileData"
//             }
//         },
//         {
//             "path": "/tmp/gradio/e0641ca18b6291157f588f63e2ac77bef09130bc/image.png",
//             "url": "https://yisol-idm-vton.hf.space/file=/tmp/gradio/e0641ca18b6291157f588f63e2ac77bef09130bc/image.png",
//             "size": null,
//             "orig_name": "image.png",
//             "mime_type": null,
//             "is_stream": false,
//             "meta": {
//                 "_type": "gradio.FileData"
//             }
//         }
//     ]
// TODO: here need to receive form data by getting image from upload
const getTryOn = async (req, res) => {
  // receive user image and product image (must be in order)
  const files = req.files;
  const HumanImgBuffer = fs.readFileSync(files[0].path);
  //   const ClothImgBuffer = fs.readFileSync("./assets/Tshirt.png");
  const ClothImgBuffer = fs.readFileSync(files[1].path);
  for (let index = 0; index < files.length; index++) {
    fs.unlinkSync(files[index].path);
  }
  //   const human = new Blob([HumanImgBuffer], { type: "image/jpg" });
  const human = new Blob([HumanImgBuffer], { type: `${files[0].mimetype}` });
  //   const cloth = new Blob([ClothImgBuffer], { type: "image/png" });
  const cloth = new Blob([ClothImgBuffer], { type: `${files[1].mimetype}` });
  const inputHuman = {
    background: human,
    layers: [],
    composite: null,
  };
  let result;
  try {
    result = await vton.predict("/tryon", [
      inputHuman,
      cloth,
      "virtual try-on", // 🔄 better than ""
      true,
      true,
      30,
      0, // random seed
    ]);
  } catch (error) {
    console.log("failed: ", error);
    return res.status(400).json({ Message: "Please try again after 24 hours" });
  }
  return res.status(200).json({ data: result.data });
};

const getTryOnUsingImage = async (req, res) => {
  // receive user image and product image (must be in order)
  const files = req.files;
  const { imageProduct } = req.body;
  console.log("files", files[0]);
  console.log("imageProduct: ", imageProduct);
  const response_0 = await fetch(`${imageProduct}`);
  const productBlob = await response_0.blob();
  const HumanImgBuffer = fs.readFileSync(files[0].path);
  //   const ClothImgBuffer = fs.readFileSync("./assets/Tshirt.png");
  // const ClothImgBuffer = fs.readFileSync(files[1].path);
  for (let index = 0; index < files.length; index++) {
    fs.unlinkSync(files[index].path);
  }
  //   const human = new Blob([HumanImgBuffer], { type: "image/jpg" });
  const human = new Blob([HumanImgBuffer], { type: `${files[0].mimetype}` });
  //   const cloth = new Blob([ClothImgBuffer], { type: "image/png" });
  // const cloth = new Blob([ClothImgBuffer], { type: `${files[1].mimetype}` });
  const inputHuman = {
    background: human,
    layers: [],
    composite: null,
  };
  let result;
  try {
    result = await vton.predict("/tryon", [
      inputHuman,
      productBlob,
      "virtual try-on", // 🔄 better than ""
      true,
      true,
      30,
      0, // random seed
    ]);
  } catch (error) {
    console.log("failed: ", error);
    return res.status(400).json({ Message: "Please try again after 24 hours" });
  }
  return res.status(200).json({ data: result.data[0] });
};

export { getTryOn, getTryOnUsingImage };
