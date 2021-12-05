import MovieCard from "../components/MovieCard";
import MovieListFilter from "../components/MovieListFilter";

import movies from "../dummy-data";

import { useLocation } from "react-router-dom";

const MovieList = () => {
  const shows = [10, 20, 30];
  const categories = ["TV", "Movie"];
  const fields = ["title", "score"];

  // ambil seluruh query param
  let queryParam = useLocation().search.slice(1)
  const qs = require('qs')    // pemanggilan library qs

  // ubah parameter dari string ke object, simpan ke variabel params
  // Variable yang akan menampung parameter yang telah diberikan oleh user
  const params = qs.parse(queryParam);
  
  // Variable yang kita gunakan untuk melakukan penyaringan data
  const filter = {
    show: Number(params.show) || shows[0],
    category: params.category || categories[0],
    sort: params.sort || fields[0]
  };
  
  // fungsi untuk sorting list movie berdasarkan sort value
  const sortBy = (key) => {
    // fungsi untuk membandingkan setiap value yang ada dalam array
    return (value1, value2) => {
      // jika tidak ditemukan key dalam objectnya
      if(!value1.hasOwnProperty(key) || !value2.hasOwnProperty(key)) {
        return 0
      }

      // mengubah value dari key yang ingin diurutkan ke huruf kapital semua jika berbentuk string untuk mendapatkan ascii yang setara, jika bukan string maka valuenya tetap
      const item1 = (typeof value1[key] === 'string') ? value1[key].toUpperCase() : value1[key]
      const item2 = (typeof value2[key] === 'string') ? value2[key].toUpperCase() : value2[key]

      // membandingkan kedua value untuk mendapatkan urutannya secara ascending
      let comparison = 0
      if(item1 > item2) {
        comparison = 1
      } else if(item1 < item2) {
        comparison = -1
      }

      return comparison
    }
  }

  // Variable yang akan menyimpan data-data yang sudah difilter menggunakan variable filter diatas
  const filteredMovies = movies.filter(movie => movie.type === filter.category).sort(sortBy(filter.sort)).slice(0, filter.show);

  return (
    <div className="row">
      <MovieListFilter />
      {filteredMovies.map((movie) => (
        <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={movie.mal_id}>
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
};

export default MovieList;