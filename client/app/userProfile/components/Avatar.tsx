import React from 'react';

interface AvatarProps {
    src: string;
    style?: string;
    alt: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, style = "w-10 h-10" }) => {

    return (
        <div className={`overflow-hidden rounded-full ${style}`}>
            <img src={src} alt={alt} className="object-cover w-full h-full" />
        </div>
    );
};

export default Avatar;
