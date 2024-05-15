import React from 'react'
import Image from 'next/image';

const LogoFullName = () => {
    return (
        <Image
            src="/images/gobilocShort.png"
            width={200}
            height={50}
            alt="Gobiloc logo"
        />
    );
};

export default LogoFullName;