import axios from "axios";

export const httpClientGetMethod = async (props) => {
    const { urlClient, valuesObj } = props
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
export const httpClientGetMethodWithPost = async (props) => {
    const { urlClient, valuesObj, authStore } = props
    const access_token = authStore ? authStore.access_token : '';
    const config = {
        headers: { Authorization: `Bearer ${access_token}` },
    };
    const bodyParameters = {
        ...valuesObj
    };
    const url = urlClient;
    return axios.post(url, bodyParameters, config)
        .then((res) => {
            return res.data;
        }).catch(err => {
            console.log(err)
        });
};
//----------------------------Post
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

export const httpClientPOSTMethodVerifyAuth = async (props) => {
    const { urlClient, valuesObj, authStore } = props;
    const bodyParameters = {
        ...valuesObj
    };
    const config = {
        headers: { Authorization: `Bearer ${authStore.access_token}` }
    }
    const url = urlClient;
    console.log(url)
    console.log(valuesObj)
    try {
        const res = await axios.post(url, bodyParameters, config);
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

export const httpClientPOSTMethodFormData = async (props) => {
    var bodyFormData = new FormData();
    const { urlClient, valuesObj, authStore } = props;
    const config = {
        headers: { Authorization: `Bearer ${authStore.access_token}` }
    }
    const url = urlClient;
    console.log(url)
    console.log(valuesObj)
    //-------------Setup data to body form-data
    for (const [key, value] of Object.entries(valuesObj)) {
        console.log(`${key}: ${value}`);
        bodyFormData.append(key, value)
    }

    try {
        const res = await axios.post(url, bodyFormData, config);
        return res.data;
    } catch (err) {
        console.log(err)
        return {
            result: null,
            error: true,
            message: `เชื่อมต่อ API : ${url} ล้มเหลว`
        };
    }
}
