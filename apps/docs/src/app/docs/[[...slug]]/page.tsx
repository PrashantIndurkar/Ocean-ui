import { notFound } from "next/navigation";
import { DocsPage, DocsBody } from "fumadocs-ui/page";
import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

export async function generateStaticParams() {
  return source.generateParams();
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Next.js optional catch-all provides undefined for /docs
  // Fumadocs expects [] (empty array) for the root index page
  const page = source.getPage(slug ?? []);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      tableOfContent={{
        enabled: true,
      }}
    >
      <DocsBody>
        <div className="docs-content-wrapper">
          <MDXContent components={getMDXComponents()} />
        </div>
      </DocsBody>
    </DocsPage>
  );
}
