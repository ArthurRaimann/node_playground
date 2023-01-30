import useSWR from 'swr';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Posts() {
  const { data, error } = useSWR(
    'https://jsonplaceholder.typicode.com/posts',
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <ul className={utilStyles.list}>
      {data.map(({ id, data, title }) => (
        <li className={utilStyles.listItem} key={id}>
          {id}
          <br />
          {title}
          <br />
          {data}
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <Layout swr>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          SWR - Hook by Next.js Team - Recommended for CSR {'->'}
          <a href="https://swr.vercel.app/"> SWR Documentation</a>
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>
          Posts from jsonplaceholder that are Client Side Rendered
        </h2>
      </section>
      <section>
        <Posts />
      </section>
    </Layout>
  );
}
