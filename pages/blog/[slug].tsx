import LayOut from "@components/layout";
import { readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticProps, NextPage, NextPageContext } from "next";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse/lib";
import { unified } from "unified";

interface IData {
	title: string;
	data: string;
	category: string;
}
const Post: NextPage<{ data: IData; post: string }> = ({ data, post }) => {
	return (
		<LayOut title={data.title} seoTitle={data.title} hasTabBar canGoBack>
			<div
				className="blog-post-content"
				dangerouslySetInnerHTML={{ __html: post }}
			/>
		</LayOut>
	);
};

export function getStaticPaths() {
	return {
		paths: [],
		fallback: "blocking",
	};
}
export const getStaticProps: GetStaticProps = async (ctx) => {
	const { data, content } = matter.read(`./posts/${ctx.params?.slug}.md`);
	const { value } = await unified()
		.use(remarkParse)
		.use(remarkHtml)
		.process(content);
	return {
		props: {
			data,
			post: value,
		},
	};
};
export default Post;
