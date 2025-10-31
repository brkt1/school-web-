import useApi from "@/utils/api/api";
import { TeamMember } from "./team_member.model";
import { FetchedApi } from "@/utils/common_models/commons.model";

const useTeamMemberService = () => {
  const commonApi = useApi('organization');

  const getTeamMember = (id: string) => {
    return commonApi.get<TeamMember>(`team-members/${id}`);
  };

  const addTeamMember = (teammember: FormData) => {
    return commonApi.post<TeamMember>(`team-members`, teammember, {headers: {
      'Content-Type': 'multipart/form-data',
    }});
  };

  const updateTeamMember = (id: string, teammember: FormData) => {
    return commonApi.put<TeamMember>(`team-members/${id}`, teammember, {headers: {
      'Content-Type': 'multipart/form-data',
    }});
  };

  const deleteTeamMember = (id: string) => {
    return commonApi.delete<TeamMember>(`team-members/${id}`);
  };

  const getTeamMembers = (params?: Record<string, any>) => {
    return commonApi.get<FetchedApi<TeamMember>>(`team-members`, {
      params,
    });
  };

  return {
    getTeamMember,
    getTeamMembers,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
  };
};

export default useTeamMemberService;
