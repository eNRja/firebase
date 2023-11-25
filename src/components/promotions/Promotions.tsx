import React, { useEffect } from "react";
import styles from "./Promotions.module.css";
import { useDispatch, useSelector } from "../../hooks/hooks";
import {
  deletePromotion,
  getPromotions,
} from "../../services/actions/promotions";
import { Link } from "react-router-dom";

export function Promotions({ db }: any) {
  const { promotions } = useSelector((state) => state.promotion);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deletePromotion({ id, db }));
  };

  useEffect(() => {
    dispatch(getPromotions({ db }));
  }, []);

  return (
    <ul className={styles.Promotions}>
      {promotions.length > 0 &&
        promotions.map((element) => (
          <li className={styles.Promotion} key={element.id}>
            <h2>{element.title}</h2>
            <p className={styles.PromotionDescription}>{element.description}</p>
            <p>{`${element.start}  -  ${element.end}`}</p>
            <Link to={element.link}>{element.link}</Link>
            <p>{element.level}</p>
            <button onClick={() => handleDelete(element.id)}>delete</button>
          </li>
        ))}
    </ul>
  );
}
