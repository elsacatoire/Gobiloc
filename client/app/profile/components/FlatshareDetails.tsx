import { fetchFlatshare } from "@/api/services/flatService";
import type { FlatType } from "@/types/FlatType";
import { FishSymbol, Home } from "lucide-react";
import { useEffect, useState } from "react";

const FlatshareDetails: React.FC = () => {
	const [flatshare, setFlatshare] = useState<FlatType | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const getFlatshareData = async () => {
			try {
				const data = await fetchFlatshare();
				setFlatshare(data);
				console.log("data from flatshare fetch", data);
			} catch (err) {
				console.error(err);
				setError("Failed to fetch flatshare data.");
			} finally {
				setLoading(false);
			}
		};
		getFlatshareData();
	}, []);

	return (
		<div>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			{flatshare && (
				<div className="flex flex-col gap-3">
					<div className="flex  items-center">
						<Home className="min-w-10" />
						<p>Coloc : {flatshare.name}</p>
					</div>
					<div className="flex  items-center">
						<FishSymbol className="min-w-10" />
						<p>Quelques mots : {flatshare.description}</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default FlatshareDetails;
