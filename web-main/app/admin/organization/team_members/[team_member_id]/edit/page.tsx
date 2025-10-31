'use client'
import TeamMemberForm from "@/modules/organization/team_member/components/team_member.form";
import { useParams } from "next/navigation";

export default function TeamMemberEdit(){
    const params = useParams()
    const id = params.team_member_id as string

    return <TeamMemberForm id={id} />
}