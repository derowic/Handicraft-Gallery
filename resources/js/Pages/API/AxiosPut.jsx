import axios from "axios";
import Notify from "@/Pages/API/Notify";

async function AxiosPut(rout, routeData, data, setData) {
    return await axios
        .put(route(rout, routData), data)
        .then((response) => {
            if (setData) {
                setData(response.data.data);
            }
            Notify(response.data.message, null, response.status);
            Notify(response.message, null, response.status);

            return response;
        })
        .catch((error) => {
            if (error.response.data) {
                Notify("Błąd", "error");
                console.error(error);
            } else {
                Notify("Błąd", "error");
                console.error("error");
                console.error(error);
            }
        });
}

export default AxiosPut;
