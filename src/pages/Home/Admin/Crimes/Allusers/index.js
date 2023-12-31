import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Post from './Post'
import { db } from '../../../../../firebase';


function Allusers({ filteredPosts, searchTerm }) {
      const [posts, setPosts] = React.useState([])
      const pageSize = 10; // Number of posts per page
      const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = localStorage.getItem("currentPage");
        return savedPage ? parseInt(savedPage, 5) : 1;
      });
    const [prevPage, setPrevPage] = useState(1);

      const totalPages = Math.ceil(posts.length / pageSize);
  
       React.useEffect(() => {
           db.collection('crimes').orderBy("timestamp","desc").onSnapshot(snapshot => {
               setPosts(snapshot.docs.map(doc => ({
                   id: doc.id,
                   post: doc.data(),
               })));
           })
       }, []);
  
  // Handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

    // Save the currentPage to localStorage when it changes
    useEffect(() => {
      localStorage.setItem("currentPage", currentPage);
    }, [currentPage]);

// Get the posts for the current page
const getCurrentPosts = () => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return posts.slice(startIndex, endIndex);
};

  useEffect(() => {
    // Save the current page before updating the data
    setPrevPage(currentPage);
  }, [posts]);

  useEffect(() => {
    // Set the current page back to its previous value after data update
    setCurrentPage(prevPage);
  }, [prevPage]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead sx={{ display: "table-header-group" }}>
          <TableRow>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #3498db",color:"#3498db"}}>No.</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #3498db",color:"#3498db"}} align="right">TITLE</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #3498db",color:"#3498db"}} align="right">CATEGORY</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #3498db",color:"#3498db"}} align="right">STATUS</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #3498db",color:"#3498db"}} align="right">VIEW</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #3498db",color:"#3498db"}} align="right">SENT ON</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #3498db",color:"#3498db"}} align="right">ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {searchTerm === "" ?(
          posts?.length > 0 ?(
             <>
             {
                getCurrentPosts().map(({id, post}, index) => (
                    <Post
                    key={id} 
                    crimeId={id}
                    title={post?.title}
                    description={post?.description}
                    category={post?.category}
                    fileType={post?.fileType}
                    fromId={post?.fromId}
                    timestamp={post?.timestamp}
                    lat={post?.lat}
                    long={post?.long}
                    media={post?.media}
                    number={index+1}
                    status={post?.status}
                    visibility={post?.visibility}
                    />
                  ))
  }
             </>
          ):(
            <div style={{display:'table',margin:'auto',fontSize:18}}>loading...</div>
          )
       ):(
        <>
        {
         filteredPosts.length > 0 ?(
           <>
           {
                           filteredPosts.map((posts2, index) => (
 
 <Post 
 crimeId={posts2?.crimeId}
 title={posts2?.title}
 description={posts2?.description}
 category={posts2?.category}
 fileType={posts2?.fileType}
 fromId={posts2?.fromId}
 timestamp={posts2?.timestamp}
 lat={posts2?.lat}
 long={posts2?.long}
 media={posts2?.media}
 number={index+1}
 status={posts2?.status}
 />
 ))
                           }
           </>
         ):(
            <><center><h4>Not found...</h4></center></>
         )       
       
       }
        </>
       )}
        </TableBody>
      </Table>
    </TableContainer>

    <center style={{display:'table',margin:'auto',marginTop:5,marginBottom:5}}>
    <Pagination
    count={totalPages}
    page={currentPage}
    onChange={handlePageChange}
    variant="outlined"
    shape="rounded"
    color="primary"
  />
    </center>
  </Paper>
  )
}

export default Allusers