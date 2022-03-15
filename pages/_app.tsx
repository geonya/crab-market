import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
	console.log("app is running");
	return (
		<SWRConfig
			value={{
				fetcher: (url: string) =>
					fetch(url).then((response) => response.json()),
			}}
		>
			<div className="w-full max-w-xl mx-auto">
				<Component {...pageProps} />
			</div>
		</SWRConfig>
	);
}

export default MyApp;
