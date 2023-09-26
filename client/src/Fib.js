import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Box,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Paper,
} from "@mui/material";
import MaterialReactTable from "material-react-table";
import "./Fib.css";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import Trans from "./Trans.jsx";
import CatchingPokemonTwoToneIcon from "@mui/icons-material/CatchingPokemonTwoTone";

function Fib() {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setvalues] = useState({});
  const [index, setIndex] = useState("");


  const columns = useMemo(
    () => [
      {
        accessorKey: "key", //access nested data with dot notation
        header: "item",
      },
      {
        accessorKey: "link",
        header: "link",
      },
    ],
    []
  );
  useEffect(() => {
    const fetchvalues = async () => {
      const values = await axios.get("/api/values/current");
      setvalues(values.data);
    };
    const fetchIndexes = async () => {
      const seenIndexes = await axios.get("/api/values/all");
      setSeenIndexes(seenIndexes.data);
    };
    try {
      fetchvalues();
      fetchIndexes();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (index.trim() !== "") {
      await axios.post("/api/values", {
        index: index.toLowerCase(),
      });}
      setIndex("");
      try {
        const seenIndexes = await axios.get("/api/values/all");
        setSeenIndexes(seenIndexes.data);
        const values = await axios.get("/api/values/current");
        setvalues(values.data);
      } catch (error) {
        console.log(error);
      
    }
  };
  const RenderSeenIndexes = React.memo(() => {
    const ind = [];
    for (let key in values) {
      ind.push(key);
    }

    ind.sort();
    return (
      <Box display="flex"   sx={{alignItems:"center", justifyContent:"center",}}>
       <Trans data={ind}/>
      </Box>
    );
  });

  const Rendervalues = React.memo(() => {
    var arr = [];
    for (let key in values) {
      arr.push({ key: key, link: values[key] });
    }
    arr.sort((a, b) => (a.key > b.key ? 1 : b.key > a.key ? -1 : 0));
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <MaterialReactTable
        columns={columns}
        data={arr}
        muiTablePaperProps={{
          elevation: 0, //change the mui box shadow
          //customize paper styles
          sx: {
            borderRadius: '4px',
            width:{xs:"75vw", md:"60vw"}
          }}}
          muiTableHeadCellProps={{
            sx:{
              width:"25px"
            }
          }}
           />
      </Box>
    );
  });
  const BarStyle = {  background: "#F0F0F0", border: "none" };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          style={BarStyle}
          sx={{ mt: "55px",minWidth:"200px",width:{xs:"30vw",md:"25vw"},maxWidth:"300px"}}
          key="search-bar"
          value={index}
          size="small"
          variant="standard"
          label="..Search Pokemon"
          color="grey"
          onChange={(event) => setIndex(event.target.value)}
          InputProps={{
            style: {
              padding: 0,
            },
            endAdornment: (
              <InputAdornment>
                <IconButton
                  size="large"
                  onClick={handleSubmit}
                  sx={{ "&:hover": { backgroundColor: "transparent" } }}
                >
                  <SearchSharpIcon fontSize="large" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        left="50%"
        top="50%"
      >
        <Paper sx={{ mt: 3, pb: 2, width: {xs:"70vw",md:"50vw"}, minWidth:"300px",maxWidth:"550px"}}>
          <Chip
            icon={
              <CatchingPokemonTwoToneIcon
                fontSize="medium"
                htmlColor="#E3242B"
              />
            }
            label="Pokemons found till now"
            variant="outlined"
            style={{ backgroundColor: "white" }}
            color="error"
            sx={{
              m: 2,
              "& .MuiChip-label": {
                fontSize: 17,
                fontFamily: "futura",
                fontWeight: "bold",
                color: "black",
              },
            }}
            size="large"
          />
          <RenderSeenIndexes />
        </Paper>
      </Box>

      <Chip
        icon={
          <CatchingPokemonTwoToneIcon fontSize="medium" htmlColor="#E3242B" />
        }
        label="Your Pokedex"
        variant="outlined"
        style={{ backgroundColor: "white" }}
        color="error"
        sx={{
          m: 2,
          "& .MuiChip-label": {
            fontSize: 18,
            fontFamily: "futura",
            fontWeight: "bold",
            color: "black",
          },
        }}
        size="large"
      />
      <Rendervalues />
    </div>
  );
}
export default Fib;