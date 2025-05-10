import { Order } from "@/models/Order.model";
import axios from "axios";

const BASE_URL="https://front-end-task.bmbzr.ir"

export class ServicesClass {

  static getAddressesList() {
    return axios
      .get(`${BASE_URL}/my-addresses`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.error(err));
  }

  static orderSubmission(orderBody: Order) {
    return axios
      .post(`${BASE_URL}/order/completion`, orderBody)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }
}
