import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { useState, useEffect } from 'react';

function Posts() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(
      () =>
        fetch('https://jsonplaceholder.typicode.com/posts')
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            setLoading(false);
          }),
      3000
    );
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No Posts data</p>;

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
    <Layout csr>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>CSR</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>
          Posts from jsonplaceholder that are Client Side Rendered with 3
          seconds timeout to notice the CSR.
        </h2>
      </section>
      <section>
        <Posts />
      </section>
    </Layout>
  );
}
