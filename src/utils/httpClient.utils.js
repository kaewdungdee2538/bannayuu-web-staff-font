import axios from "axios";

export const httpClientGetMethod = async (props) => {
    const {urlClient,valuesObj} = props
    const access_token = valuesObj ? valuesObj.access_token : '';
    const config = {
        headers: { Authorization: `Bearer ${access_token}` },
    };
    const url = urlClient;
    return axios.get(url, config)
        .then((res) => {
            return res.data;
        }).catch(err => {
            console.log(err)
        });
};

export const httpClientPOSTMethodNotAuth = async (props) => {
    const { urlClient, valuesObj } = props;
    const bodyParameters = {
        ...valuesObj
    };
    const url = urlClient;
    console.log(url)
    console.log(valuesObj)
    try {
        const res = await axios.post(url, bodyParameters);
        return res.data;
    } catch (err) {
        console.log(err)
        return {
            result: null,
            error: true,
            message: `เชื่อมต่อ API : ${url} ล้มเหลว`
        };
    }
};

