import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import Axios from "axios";

function App() {

  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [publi, setPubli] = useState("");

  const [newCategory, setNewCategory] = useState("");

  const [movieList, setMovieList] = useState([]);

  const addMovie = () => {
    Axios.post("http://localhost:3001/create", {
      id: id,
      title: title,
      category: category,
      publi: publi,
    }).then(() => {
      // console.log("success");
      setMovieList([
        ...movieList,
        {
          id: id,
          title: title,
          category: category,
          publi: publi,
        },
      ]);
    });
  };

  const getMovies = () => {
    Axios.get("http://localhost:3001/movies").then((response) => {
      setMovieList(response.data);
    });
  };

  const updateMovieCategory = (id) => {
    Axios.put("http://localhost:3001/update", { category: newCategory, id: id }).then(
      (response) => {
        setMovieList(
          movieList.map((val) => {
            return val.id == id
              ? {
                id: val.id,
                title: val.title,
                category: newCategory,
                publi: val.publi,
              }
              : val;
          })
        );
      }
    );
  };

  const deleteMovie = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setMovieList(
        movieList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div class="mv">
      <div class="crew">
        <div class="grid-container-crew">
          <h1> Crew Memeber </h1>
          <div class="grid-item">
            <label>Id:</label>
            <input type="number"></input>
          </div>
          <div class="grid-item">
            <label>Name:</label>
            <input type="text"></input>
          </div>
          <div class="grid-item">
            <label>Role:</label>
            <input type="text"></input>
          </div>
          <button>Add Crew Member</button>
        </div>

      </div>
      <div class="grid-container-mov">
        <h1> Movies </h1>
        <div class="grid-item">
          <label>Id:</label>
          <input
            type="number"
            onChange={(event) => {
              setId(event.target.value);
            }}
          />
          <div class="grid-item">
            <label>Title:</label>
            <input
              type="text"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div class="grid-item">
            <label>Category:</label>
            <input
              type="text"
              onChange={(event) => {
                setCategory(event.target.value);
              }}
            />
          </div>
          <div class="grid-item">
            <label>Publication Date:</label>
            <input
              type="date"
              onChange={(event) => {
                setPubli(event.target.value);
              }}
            />
          </div>

          <button onClick={addMovie}>Add Movie</button>
          <button onClick={getMovies}>Show Movies</button>
        </div>

        <div className="movie">

          {movieList.map((val, key) => {
            return (
              <div className="movie">
                <div class="grid-item">
                  <h3>Id: {val.id}</h3>
                  <h3>Title: {val.title}</h3>
                  <h3>Category: {val.category}</h3>
                  <h3>Publication Date: {val.publi}</h3>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="comedy/action/horror"
                    onChange={(event) => {
                      setNewCategory(event.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      updateMovieCategory(val.id);
                    }}
                  >
                    {" "}
                    Update
                  </button>

                  <button
                    onClick={() => {
                      deleteMovie(val.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

  );
}

export default App;
