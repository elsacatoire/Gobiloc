import React from "react";

const ContactLink = () => {
	return (
		<section className="flex flex-col gap-4 md:gap-8">
			<h2 className="text-lg md:text-2xl font-semibold">Contactez-nous</h2>
			<p>
				Si vous avez des questions ou des suggestions, n'hésitez pas à nous
				contacter par email à
				<a
					href="mailto:contact@gobiloc.com"
					className="text-teal-700 hover:underline ml-1 font-semibold"
				>
					contact@gobiloc.com
				</a>
				.
			</p>
		</section>
	);
};

export default ContactLink;
