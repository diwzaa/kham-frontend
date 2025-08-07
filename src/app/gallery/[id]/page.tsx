'use client';
import { useParams, useSearchParams } from "next/navigation"

export default function GalleryPage() {
    const params = useParams()
    const search = useSearchParams()
    return (
        <div>
            Gallery Page {params.id} {search}
            </div>
    )
}