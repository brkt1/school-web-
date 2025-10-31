'use client'
import GalleryDetail from "@/modules/engagement/gallery/components/gallery.detail";
import { useParams } from "next/navigation";

export default function Gallery(){
    const params = useParams()
    const id = params.gallery_id as string

    return <GalleryDetail id={id} />
}