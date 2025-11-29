"use client";

import { useEffect } from "react";
import ReactDOM from "react-dom";

export function ResourceHints() {
	useEffect(() => {
		// Prefetch DNS for faster connection to external image API
		ReactDOM.prefetchDNS("https://cataas.com");
		// Preconnect to establish early connection
		ReactDOM.preconnect("https://cataas.com", {
			crossOrigin: "anonymous",
		});
	}, []);

	return null;
}

