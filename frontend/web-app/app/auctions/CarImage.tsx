'use client';

import Image from "next/image";
import { useState } from "react";

type Props = {
    imageUrl: string;
    priority?: boolean; // For LCP optimization
}

export default function CarImage({imageUrl, priority = false}: Props) {
    const [loading, setLoading] = useState(true);

    return (
        <Image
            src={imageUrl}
            alt='Image of car'
            fill
            className={
                `
                object-cover duration-700 ease-in-out
                ${loading ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}
                hover:scale-105
                `
            }
            priority={priority}
            fetchPriority={priority ? "high" : "auto"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            onLoad={() => setLoading(false)}
        />
    )
}