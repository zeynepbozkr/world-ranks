import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import React, { useState } from "react";

import styles from "../styles/Home.module.css";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState();

  const FilteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    //*** ?  **
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}> Found {countries.length} countries</div>
        <div className={styles.input}>
          <SearchInput
            placeholder="Filter by Name, Region,SubRegion"
            onChange={onInputChange}
          />
        </div>
      </div>

      <CountriesTable countries={FilteredCountries} />
      {/* <CountriesTable countries={countries} /> */}
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(`https://restcountries.com/v2/all
  `);

  const countries = await res.json();
  return {
    props: {
      countries,
    },
  };
};
