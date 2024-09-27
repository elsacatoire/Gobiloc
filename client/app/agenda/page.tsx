"use client";

import { Header } from "@/app/components/customsComponents/layout/Header";
import { NavMenu } from "@/app/enums/NavMenuEnum";
import isAuth from "@/utils/auth/isAuth";
import React from "react";

const agenda = () => {
	return (
		<div>
			<Header title={NavMenu.AGENDA} />
			<div>agenda</div>
		</div>
	);
};

export default isAuth(agenda);
