import React, { ChangeEvent, useEffect, useState } from "react";

import styles from "./CreatePromo.module.css";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { postPromotion } from "../../services/actions/promotions";

export function CreatePromo({ db }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateStart, setStart] = useState("");
  const [dateEnd, setEnd] = useState("");
  const [link, setLink] = useState("");
  const [levels, setLevels] = useState([]); // Используем массив для хранения выбранных уровней
  const dispatch = useDispatch();
  const { showSuccessMessage } = useSelector((state) => state.promotion);
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    return (
      title !== "" &&
      description !== "" &&
      dateStart !== "" &&
      dateEnd !== "" &&
      link !== "" &&
      levels.length > 0 &&
      new Date(dateStart) <= new Date(dateEnd)
    );
  };

  const onSave = () => {
    if (!isFormValid) {
      // Если форма не валидна, не отправляем данные
      console.error("Form is not valid");
      return;
    }

    dispatch(
      postPromotion({
        db,
        title,
        description,
        levels,
        link,
        dateEnd,
        dateStart,
      })
    );
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
    validationFunction?: () => boolean
  ) => {
    setter(e.target.value);
  };

  const handleLevelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedLevels: string[] | any = Array.from(
      event.target.selectedOptions,
      (option: HTMLOptionElement) => option.value
    );

    setLevels(selectedLevels);
    setIsFormValid(validateForm());
  };

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [title, description, dateStart, dateEnd, link, levels]);

  return (
    <div className={styles.CreatePromo}>
      <input
        type="date"
        placeholder="дата старта"
        // type={"date"}
        value={dateStart}
        onChange={(e) => {
          handleInputChange(e, setStart);
          validateForm();
        }}
      />
      <input
        type="date"
        placeholder="дата окончания"
        // type={"date"}
        value={dateEnd}
        onChange={(e) => {
          handleInputChange(e, setEnd);
          validateForm();
        }}
      />
      <input
        type="text"
        placeholder="Название"
        value={title}
        onChange={(e) => {
          handleInputChange(e, setTitle);
          validateForm();
        }}
      />
      <input
        type="text"
        placeholder="Ссылка"
        value={link}
        onChange={(e) => {
          handleInputChange(e, setLink);
          validateForm();
        }}
      />
      <input
        type="text"
        placeholder="Описание"
        value={description}
        onChange={(e) => {
          handleInputChange(e, setDescription);
          validateForm();
        }}
      />
      <select
        multiple
        value={levels}
        onChange={handleLevelChange}
        className={styles.last}
      >
        <option value="A1">A1</option>
        <option value="A2">A2</option>
        <option value="B1">B1</option>
        <option value="B2">B2</option>
        <option value="C1">C1</option>
      </select>
      <button onClick={onSave} disabled={!isFormValid}>
        SAVE
      </button>
      {showSuccessMessage && (
        <div className={styles.CreatePromoSuccess}>
          Данные успешно сохранены!
        </div>
      )}{" "}
      {/* Условный рендеринг уведомления */}
    </div>
  );
}
