import { BookContext } from "../../context/BooksContext";
import { useContext, useCallback, useMemo, useEffect } from "react";
import classNames from "classnames";
import styles from "./filter.module.scss";
import { useSearchParams } from "react-router-dom";
import { OptionType } from "../../types/enums";

export const Filter = () => {
  const { books, setFilteredBook } = useContext(BookContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("price") || "";
  const query = searchParams.get("query") || "";

  const checkQuery = useMemo(() => {
    return (query: string, content: string) =>
      content.toLowerCase().includes(query.toLowerCase());
  }, []);

  const options = [
    {
      id: 1,
      value: OptionType.ALL,
      text: "All",
    },
    {
      id: 2,
      value: OptionType.FROM_0_TO_15,
      text: "from $0 to $15",
    },
    {
      id: 3,
      value: OptionType.FROM_15_TO_30,
      text: "from $15 to $30",
    },
    {
      id: 4,
      value: OptionType.FROM_30,
      text: "from $30 to ...",
    },
  ];

  const onQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      !event.target.value
        ? searchParams.delete("query")
        : searchParams.set("query", event.target.value.replace(/^(\s)*/g, ""));

      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const onSortChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      searchParams.set("price", event.target.value);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const filteredBook = useMemo(() => {
    if (!Array.isArray(books)) {
      return [];
    }
    return books
      .filter((book) => {
        switch (sort) {
          case OptionType.FROM_0_TO_15:
            return book.price <= 15 && checkQuery(query, book.title);

          case OptionType.FROM_15_TO_30:
            return (
              book.price >= 15 &&
              book.price <= 30 &&
              checkQuery(query, book.title)
            );

          case OptionType.FROM_30:
            return book.price >= 30 && checkQuery(query, book.title);

          default:
            return checkQuery(query, book.title);
        }
      })
      .filter((book) =>
        book.title.toLowerCase().includes(query?.toLowerCase())
      );
  }, [books, checkQuery, query, sort]);

  useEffect(() => {
    setFilteredBook(filteredBook);
  }, [filteredBook, setFilteredBook]);

  return (
    <section className={styles.filter_container}>
      <section className={styles.booklist_input}>
        <input
          className={styles.booklist_input__field}
          onChange={onQueryChange}
          placeholder='Search by book name '
          value={query}
        />
        {query.length < 1 ? (
          <span
            className={classNames(
              styles.booklist_input__icon,
              styles.booklist_input__icon_search
            )}
          >
            ☌
          </span>
        ) : (
          <span
            onClick={() => {
              searchParams.delete("query");
              setSearchParams(searchParams);
            }}
            className={classNames(
              styles.booklist_input__icon,
              styles.booklist_input__icon_cancel
            )}
          >
            ✖
          </span>
        )}
      </section>
      <section className={styles.booklist_select}>
        <select name='price' value={sort} onChange={onSortChange}>
          <option value='' disabled>
            Price
          </option>
          {options.map((el) => (
            <option value={el.value} key={el.id}>
              {el.text}
            </option>
          ))}
        </select>
      </section>
    </section>
  );
};
