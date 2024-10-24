import React, { useState, useEffect } from "react";

type Coloc = {
	id: string;
	name: string;
	paid: number;
};

type HousematesBalanceProps = {
	housemates: Coloc[];
	totalPaid: number;
	balance: number;
};

export function HousematesBalance() {
	const [housemates, setHousemates] = useState<Coloc[]>([]);
	const [totalPaid, setTotalPaid] = useState<number>(0);
	const [balance, setBalance] = useState<number>(0);

	// Mock data
	useEffect(() => {
		setHousemates([
			{ id: "1", name: "Alice", paid: 100 },
			{ id: "2", name: "Bob", paid: 150 },
			{ id: "3", name: "Charlie", paid: 50 },
		]);
		setTotalPaid(300);
		setBalance(100);
	}, []);

	return (
		<div className="p-4 bg-white rounded shadow">
			<h2 className="md:text-xl font-bold mb-4">Balance des colocs</h2>
			<table className="w-full text-left table-auto text-xs md:text-base">
				<thead>
					<tr>
						<th className="px-4 py-2">Colocataire</th>
						<th className="px-4 py-2">Payé</th>
						<th className="px-4 py-2">Équilibre</th>
					</tr>
				</thead>
				<tbody>
					{housemates.map((coloc) => (
						<tr key={coloc.id}>
							<td className="border px-4 py-2">{coloc.name}</td>
							<td className="border px-4 py-2">{coloc.paid} €</td>
							<td className="border px-4 py-2">
								{(coloc.paid - balance).toFixed(2)} €
							</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td className="px-4 py-2 font-bold">Total</td>
						<td className="px-4 py-2 font-bold">{totalPaid} €</td>
						<td className="px-4 py-2 font-bold">Moy: {balance.toFixed(1)} €</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
}
