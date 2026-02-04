import {createDataProvider,CreateDataProviderOptions} from "@refinedev/rest";
import {BACKEND_BASE_URL} from "@/constants";
import {ListResponse} from "@/types";

const options:CreateDataProviderOptions = {
    getList:{
        getEndpoint:({resource}) => resource,

        mapResponse:async (response:Response) => {
        const payload: ListResponse = await response.json();
        return payload.data ?? [];
        },

        getTotalCount: async (response:Response) => {
            const payload:ListResponse = await response.json();
            return payload.pagination?.total ?? payload.data?.length ?? 0;
        }
    }
}

const {dataProvider} = createDataProvider(BACKEND_BASE_URL, options);

export {dataProvider};