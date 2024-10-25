import Link from "next/link";
import React from "react";

const GobilocDescriptionLink = () => {
	return (
		<Link
			href={"/gobiloc"}
			className="text-orange-700 visited:text-orange-800 underline  text-center"
		>
			En savoir plus sur Gobiloc
		</Link>
	);
};

export default GobilocDescriptionLink;
