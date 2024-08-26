import axios from "axios";

async function fetchData(method, who, endpoint, dataToSend = null, multipart = false) {
    const apiUrl = `${process.env.REACT_APP_URL_API}${who}/${endpoint}`;

    try {
        let response;

        if (multipart) {
            const headers = {
                'Content-Type': 'multipart/form-data'
            };

            response = await axios.post(apiUrl, dataToSend, { headers });
        } else {
            response = await axios[method](apiUrl, dataToSend);
        }

        return response.data;
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
}

export default fetchData;
