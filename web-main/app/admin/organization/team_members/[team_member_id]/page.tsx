'use client'
import TeamMemberDetail from "@/modules/organization/team_member/components/team_member.detail";
import { useParams } from "next/navigation";

export default function TeamMember(){
    const params = useParams()
    const id = params.team_member_id as string

    return <TeamMemberDetail id={id} />
}