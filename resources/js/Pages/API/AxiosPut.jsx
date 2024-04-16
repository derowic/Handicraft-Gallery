import axios from "axios";
import Notify from "@/Pages/API/Notify";

async function AxiosPut(rout, routeData, data, setErrors) {
    try {
        const response = await axios
            .put(route(rout, routeData), data)
            .then(function (response) {
                Notify(response.data.message, null, response.status);
                return response.data;
            })
            .catch(function (error) {
                Notify(error.response.data.message, "error");
                console.log(error);
            })

            .finally(function () {
                // always executed
            });
        Notify(response.data.message, null, response.status);
        return response.data;
    } catch (error) {
        Notify(error.response?.data?.message, "error");
        //console.error(error);
        //throw error;
        return "t";
    }
}

export default AxiosPut;
