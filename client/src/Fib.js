import React, { useState, useEffect,useMemo} from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import { BrowserRouter as  Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Fib.css';

function Fib() {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setvalues] = useState({});
  const [index, setIndex] = useState('');
  // To add an item:
/* setIndex(prevItems => [
  ...prevItems,
  {  text: newText, offset: 100 }
]);

// To remove an item:
setIndex(prevItems => prevItems.filter(item => item.id !== id));

// To update the offset of each item:
setIndex(prevItems =>
  prevItems.map(item => {
    if (item.id === id) {
      return { ...item, offset: -100 };
    } else {
      return item;
    }
  })
); */

  const columns = useMemo(
    () => [
      {
        accessorKey: 'key', //access nested data with dot notation
        header: 'item',
      },
      {
        accessorKey: 'link',
        header: 'link',
      },
    ],
    [],);
  useEffect(() => {
    const fetchvalues = async () => {
      const values = await axios.get('/api/values/current');
      setvalues(values.data);
    };
    const fetchIndexes = async () => {
      const seenIndexes = await axios.get('/api/values/all');
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
    if(index.trim()!==""){
    event.preventDefault();
    await axios.post('/api/values', {
      index: index.toLowerCase(),
    });
    setIndex('');
    try {
      const seenIndexes = await axios.get('/api/values/all');
      setSeenIndexes(seenIndexes.data);
//      console.log("index  "+seenIndexes.data)
      const values = await axios.get('/api/values/current');
      setvalues(values.data);
      console.log("values "+JSON.stringify(values.data))
    } catch (error) {
      console.log(error);
    }}
  };
  const RenderSeenIndexes = React.memo(() => {
    console.log('rendering SeenIndexes');
    const ind = [];
    for (let key in values) {
      ind.push(key);
    }
    ind.sort();
    return (
    <>{ind.map((number) => number).join(", ")}
    <ul>
  {ind.map(key => (
    <li className="slide-in">{key}</li>
  ))}
</ul>
<TransitionGroup>
  {ind.map(item => (
    <CSSTransition classNames="slide-in" timeout={300}>
      <li>{item}</li>
    </CSSTransition>
  ))}
</TransitionGroup>
    </>)
  });
  const Rendervalues = React.memo(() => {
    var arr = [];
    for (let key in values) {
      arr.push({ key: key, link: values[key] });
    }
      arr.sort((a,b) => (a.key > b.key) ? 1 : ((b.key > a.key) ? -1 : 0))

    return (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        >
        <MaterialReactTable columns={columns} data={arr} />
        </Box>
      );
    });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          value={index}
          onChange={(event) => setIndex(event.target.value)}
        />
        <button>Submit</button>
      </form>
      <h3>Indexes I have seen:</h3>
      <RenderSeenIndexes />
      

      <h3>Calculated values:</h3>
      <Rendervalues />
      </div>
  );
}
export default Fib;
