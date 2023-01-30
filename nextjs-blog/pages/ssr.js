import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export async function getServerSideProps(context) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default function Home({ data }) {
  return (
    <Layout ssr>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>SSR</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>
          Posts from jsonplaceholder that are Server Side Rendered
        </h2>
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
      </section>
    </Layout>
  );
}
