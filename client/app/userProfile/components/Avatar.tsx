import React from 'react';

interface AvatarProps {
    src: string;
    alt: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {

    return (
        <div className="overflow-hidden rounded-full w-10 h-10">
            <img src={src} alt={alt} className="object-cover w-full h-full" />
        </div>
    );
};

export default Avatar;
