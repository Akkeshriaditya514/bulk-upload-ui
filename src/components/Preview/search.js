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
    let cancel;
    axios({
      method: "GET",
      url: "https://bulk-uploadlist-app.herokuapp.com/items",
      params: { page: pageNumber, limit: 20 },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        // console.log(res.data.results);
        // setProduct([...product, ...res.data.results]);
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
        if (axios.isCancel(e)) return;
        console.log(e);
        setError(true);
      });
    return () => cancel();
  }, [pageNumber]);

  return { loading, error, product, hasMore };
}
