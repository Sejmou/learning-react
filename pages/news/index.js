import Link from 'next/link';

const News = () => {
  return (
    <>
      <h1>News</h1>
      <ul>
        <li>
          <Link href="/news/nextjs-is-great">
            NextJS officially declared greatest React Framework
          </Link>
        </li>
        <li>
          <Link href="/news/angular-sucks">
            Angular: The most dreaded Frontend Framework
          </Link>
        </li>
      </ul>
    </>
  );
};
export default News;
