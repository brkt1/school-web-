import { FetchedApi } from "@/utils/common_models/commons.model";
import { GroupSearch, Group } from "./group.model";
import useApi from "@/utils/api/api";

const useGroupService = () => {
    const commonApi = useApi('commons');

    const getGroup = (id: string) => {
        const response = commonApi.get<Group>(`groups/${id}/`);
        return response;
    };

    const addGroup = (group: Group) => {
        const response = commonApi.post<Group>("groups/", group);
        return response;
    };

    const updateGroup = (id: string, group: Group) => {
        const response = commonApi.put<Group>(`groups/${id}/`, group);
        return response;
    };

    const groupDetailDo = (id: string, method: string, payload: any) => {
        const response = commonApi.patch<Group>(`groups/${id}/?method=${method}`, payload);
        return response;
    };

    const getGroups = (filteredData?: GroupSearch) => {
        const response = commonApi.get<FetchedApi<any>>("groups/", {
            params: {
                ...filteredData
            },
        });
        return response;
    };

    const deleteGroup = (id: string) => {
        const response = commonApi.delete<Group>(`groups/${id}/`);
        return response;
    };

    return {
        getGroups,
        getGroup,
        addGroup,
        deleteGroup,
        updateGroup,
        groupDetailDo,
    };
};

export default useGroupService;
