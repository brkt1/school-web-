

export interface ProjectType {
    id: string;
    title: string;
    description: string;
    start_date: Date;
    end_date: Date;
    status: number;
    progress: number;
    priority: number;
    responsble_department: string;
    project_lead: string;
    project_doc: string; 
    create_date: Date;
    created_by: string;
    project_image: string;

}

export default function(){}