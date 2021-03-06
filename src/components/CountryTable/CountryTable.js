import Link from "next/link"

import styles from "./CountryTable.module.css"

import { orderBy, SortArrow } from "../../utils/helpers";
import { useState } from "react";


const CountryTable = ({ countries }) => {
    const [dir, setDir] = useState()
    const [value, setValue] = useState()

    const orderedCountry = orderBy(countries, value, dir)

    const switchDirection = () => {
        if (!dir) {
            setDir("desc")
        } else if (dir === "desc") {
            setDir("asc")
        } else {
            setDir(null)
        }
    }

    const setValueAndDirection = value => {
        switchDirection()
        setValue(value)
    }

    return (
        <div>
            <div className={styles.heading}>
                <div className={styles.heading_flag}>

                </div>


                <button className={styles.heading_name} onClick={() => setValueAndDirection("name")}>
                    <div>Name</div>
                    {
                        value === "name" && <SortArrow direction={dir} />
                    }
                </button>

                <button className={styles.heading_population} onClick={() => setValueAndDirection("population")}>
                    <div>Population</div>
                    {
                        value === "population" && <SortArrow direction={dir} />
                    }
                </button>

                <button className={styles.heading_area} onClick={() => setValueAndDirection("area")}>
                    <div>Area (km <sup style={{ fontSize: ".5rem" }}>2</sup>)</div>
                    {
                        value === "area" && <SortArrow direction={dir} />
                    }
                </button>

                <button className={styles.heading_gini} onClick={() => setValueAndDirection("gini")}>
                    <div>Gini</div>
                    {
                        value === "gini" && <SortArrow direction={dir} />
                    }
                </button>
            </div>
            {
                orderedCountry.map(item =>
                    <Link href={`/country/${item.alpha3Code}`} key={item.name}>
                        <div className={styles.row} >
                            <div className={styles.flag}>
                                <img src={item.flag} alt={item.name} />
                            </div>

                            <div className={styles.name}>
                                {item.name}
                            </div>

                            <div className={styles.population}>
                                {item.population}
                            </div>

                            <div className={styles.area}>
                                {item.area || 0} %
                            </div>

                            <div className={styles.gini}>
                                {item.gini || 0} %
                            </div>
                        </div>
                    </Link>
                )
            }
        </div>
    )
};

export default CountryTable
