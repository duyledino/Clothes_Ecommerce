import 'dotenv/config'
import dayjs from 'dayjs' 
import { v4 as uuid } from 'uuid';
import QueryString from 'qs'
import crypto from 'node:crypto'

const createPaymentUrl = (req, res) => {
  //get orderId and total of order
  const { id,total } = req.body;
  console.log("id,total: ",id,total );
  try {
    console.log(
      "ENV:",
      process.env.vnp_Url,
      process.env.vnp_TmnCode,
      process.env.vnp_HashSecret
    );
    let ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
    const createDate = dayjs().format("YYYYMMDDHHmmss");
    let currCode = "VND";
    let vnp_Params = {};
    let vnpUrl = process.env.vnp_Url;
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = `${process.env.vnp_TmnCode}`;
    vnp_Params["vnp_Locale"] = "vn";
    vnp_Params["vnp_CurrCode"] = currCode;
    // planId is testing
    const planId = uuid();
    vnp_Params["vnp_TxnRef"] = `${planId}`;
    vnp_Params["vnp_OrderInfo"] = `Thanh toán đơn hàng ${planId}`;
    vnp_Params["vnp_OrderType"] = "other";
    vnp_Params["vnp_Amount"] = total * 100;
    vnp_Params[
      "vnp_ReturnUrl"
    ] = `${process.env.vnp_ReturnUrl}?id=${id}`;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    vnp_Params["vnp_BankCode"] = "NCB"; // cannot use QRCODE because of testing only
    vnp_Params = sortObject(vnp_Params);
    console.log("VPN params: ",vnp_Params);
    const signData = QueryString.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", `${process.env.vnp_HashSecret}`);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    console.log(signed);
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + QueryString.stringify(vnp_Params, { encode: false });
    console.log(vnp_Params);
    console.log(vnpUrl);
    //resposne payment URL and order id
    return res.status(200).json({ PaymentURL: vnpUrl, id: id });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ Message: "Failed to create payment" });
  }
};

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

export {createPaymentUrl};