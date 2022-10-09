import { useEffect, useState } from "react";
import axios from "axios";

export default function Search(pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios({
      method: "GET",
      url: "https://bulk-uploadlist-app.herokuapp.com/items",
      params: { page: pageNumber, limit: 20 },
    })
      .then((res) => {
        setProduct((prevproduct) => {
          return [
            ...new Set([
              ...prevproduct,
              ...res.data.results.map((b) => {
                return b;
              }),
            ]),
          ];
        });
        setHasMore(res.data.next !== undefined);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(true);
      });
  }, [pageNumber]);

  return { loading, error, product, hasMore };
}
