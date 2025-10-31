'use client'
import GalleryForm from "@/modules/engagement/gallery/components/gallery.form";
import { useParams } from "next/navigation";

export default function GalleryEdit(){
    const params = useParams()
    const id = params.gallery_id as string

    return <GalleryForm id={id} />
}