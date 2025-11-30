import { type Cat } from "@/types/cat";

const baseUrl = process.env.NEXT_PUBLIC_CATAAS_URL;

interface CataasResponse {
	id: string;
	url: string;
}

export async function fetchRandomCat(): Promise<Cat> {
	const response = await fetch(`${baseUrl}/cat?json=true`, {
		cache: "no-store",
	});

	if (!response.ok) {
		throw new Error("Failed to fetch cat");
	}

	const data: CataasResponse = await response.json();
	const imageUrl = new URL(data.url, baseUrl).toString();

	return {
		id: data.id,
		url: imageUrl,
	};
}

export async function fetchRandomCats(count: number): Promise<Cat[]> {
	const cats = await Promise.all(
		Array.from({ length: count }, () => fetchRandomCat())
	);
	return cats;
}
