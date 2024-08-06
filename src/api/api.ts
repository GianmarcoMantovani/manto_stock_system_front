import { ApiListResponse, KeyValuePair, PatchObject } from "./types";
import axios from "axios";

export const client = axios.create({
    baseURL: import.meta.env["VITE_API_URL"],
});

export const getResource = async <T>(resource: string, authHeader: string | null) => {
    return await client.get<T>(resource, {
        headers: { Authorization: authHeader },
    });
};

export const getResourceList = async <T>(
    resource: string,
    authHeader: string | null
) => {
    return await client.get<ApiListResponse<T>>(resource, {
        headers: { Authorization: authHeader },
        params: {
            "range.Start": 0,
            "range.End": 10000,
        },
    });
};

export const postResource = async (
    resource: string,
    authHeader: string | null,
    data: KeyValuePair | KeyValuePair[]
) => {
    return await client.post(`/${resource}`, data, {
        headers: { Authorization: authHeader },
    });
};

export const patchResource = async (
    resource: string,
    id: number,
    authHeader: string | null,
    initialValues: KeyValuePair,
    newValues: KeyValuePair
) => {
    const patchItems: KeyValuePair = {};
    // Entry is an object where entry [0] is the key and [1] the value
    // We iterate through the object and check if the initial value is different from the new value (initivalValue[key] !== newValue)
    // If it's different, we add it to updatedValues
    Object.entries(newValues).forEach(
        (entry) =>
            entry[1] !== initialValues[entry[0]] &&
            (patchItems[entry[0]] = entry[1])
    );

    const patchDocument = Object.keys(patchItems).map((key) =>
        keyValueToPatchObject(key, patchItems[key])
    );
    return await client.patch(`/${resource}/${id}`, patchDocument, {
        headers: { Authorization: authHeader },
    });
};

const keyValueToPatchObject = (
    key: string,
    value: any
): PatchObject => {
    return {
        op: "replace",
        path: `/${key}`,
        value: value,
    };
};

export const deleteResource = async (
    resource: string,
    id: number,
    authHeader: string | null
) => {
    return await client.delete(`/${resource}/${id}`, {
        headers: { Authorization: authHeader },
    });
};