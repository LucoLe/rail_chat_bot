import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Rail chat bot</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Rail Chat Bot</h1>
      </main>
    </div>
  );
}
