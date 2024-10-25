// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../styles/dashboard.css';


// const Dashboard = () => {
//   const [auctionItems, setAuctionItems] = useState([]);
//   const [newAuctionItem, setNewAuctionItem] = useState({
//     title: '',
//     description: '',
//     startingBid: '',
//     endDate: '',
//   });
//   const [editAuctionItem, setEditAuctionItem] = useState(null);
//   const navigate = useNavigate();

//   // Fetch auction items when the component loads
//   useEffect(() => {
//     fetchAuctionItems();
//   }, []);

//   // Function to fetch auction items
//   const fetchAuctionItems = async () => {
//     const token = localStorage.getItem('token'); // Retrieve the token
//     if (!token) {
//       console.error('No token found, please login.');
//       return;
//     }

//     try {
//       const response = await axios.get('http://localhost:3001/api/auction/getRecords', {
//         headers: {
//           Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
//         },
//       });
//       setAuctionItems(response.data);
//     } catch (error) {
//       console.error('Error fetching auction items:', error);
//     }
//   };

//   // Function to handle creating a new auction item
//   const handleCreateAuctionItem = async (e) => {
//     e.preventDefault();
    
//     const token = localStorage.getItem('token');
//     if (!token) {
//       console.error('No token found, please login.');
//       return;
//     }

//     try {
//       const response = await axios.post(
//         'http://localhost:3001/api/auction/auction',
//         newAuctionItem,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setAuctionItems([...auctionItems, response.data]); // Update the auction items list
//       setNewAuctionItem({ title: '', description: '', startingBid: '', endDate: '' }); // Clear form
//     } catch (error) {
//       console.error('Error creating auction item:', error);
//     }
//   };

// // Function to handle updating an auction item
// const handleUpdateAuctionItem = async (id, updatedItem) => {
//     const token = localStorage.getItem('token'); 
//     if (!token) {
//       console.error('No token found, please login.');
//       return;
//     }
  
//     try {
//       const response = await axios.put(
//         `http://localhost:3001/api/auction/updateAuction/${id}`, 
//         updatedItem,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
//           },
//         }
//       );
  
//       setAuctionItems(auctionItems.map(item => (item.id === id ? response.data : item))); // Update item in list
//       setEditAuctionItem(null); // Exit edit mode
//     } catch (error) {
//       console.error('Error updating auction item:', error);
//     }
//   };
  

//  // Function to handle deleting an auction item
// const handleDeleteAuctionItem = async (id) => {
//     // Retrieve the token from local storage
//     const token = localStorage.getItem('token'); 
//     if (!token) {
//       console.error('No token found, please login.');
//       return;
//     }
  
//     try {
//       await axios.delete(`http://localhost:3001/api/auction/deleteAuction/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
//         },
//       });
  
//       // Remove the deleted item from the list
//       setAuctionItems(auctionItems.filter(item => item.id !== id));
//     } catch (error) {
//       console.error('Error deleting auction item:', error);
//     }
//   };

//   // Function to handle logout
//   const handleLogout = () => {
//     localStorage.removeItem('token'); // Remove token from localStorage
//     navigate('/'); // Navigate back to login page
//   };

//   const handleUserProfileClick = () =>{
//     navigate('/user')
//   }
  

//   return (
//     <div className="dashboard-container">
//       <h2>Dashboard</h2>

//       <button onClick={handleLogout} style={{ float: 'centre', padding: '10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px' }}>
//         Logout
//       </button>
//       <button onClick={handleUserProfileClick} style={{ float: 'centre', padding: '10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px' }}>
//         User Profile
//       </button>
//       {/* Create New Auction Item */}
//       <form onSubmit={handleCreateAuctionItem}>
//         <h3>Create Auction Item</h3>
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             value={newAuctionItem.title}
//             onChange={(e) => setNewAuctionItem({ ...newAuctionItem, title: e.target.value })}
//             required
//           />
//         </div>
//         <div>
//           <label>Description:</label>
//           <textarea
//             value={newAuctionItem.description}
//             onChange={(e) => setNewAuctionItem({ ...newAuctionItem, description: e.target.value })}
//             required
//           />
//         </div>
//         <div>
//           <label>Starting Bid:</label>
//           <input
//             type="number"
//             value={newAuctionItem.startingBid}
//             onChange={(e) => setNewAuctionItem({ ...newAuctionItem, startingBid: e.target.value })}
//             required
//           />
//         </div>
//         <div>
//           <label>End Date:</label>
//           <input
//             type="date"
//             value={newAuctionItem.endDate}
//             onChange={(e) => setNewAuctionItem({ ...newAuctionItem, endDate: e.target.value })}
//             required
//           />
//         </div>
//         <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>
//           Create Auction
//         </button>
//       </form>

//       {/* List of Auction Items */}
//       <h3>Available Auction Items</h3>
//       <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//         <thead>
//           <tr>
//             <th style={{ border: '1px solid black', padding: '10px' }}>Title</th>
//             <th style={{ border: '1px solid black', padding: '10px' }}>Description</th>
//             <th style={{ border: '1px solid black', padding: '10px' }}>Starting Bid</th>
//             <th style={{ border: '1px solid black', padding: '10px' }}>End Date</th>
//             <th style={{ border: '1px solid black', padding: '10px' }}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {auctionItems.map(item => (
//             <tr key={item.id}>
//               {editAuctionItem?.id === item.id ? (
//                 <>
//                   <td style={{ border: '1px solid black', padding: '10px' }}>
//                     <input
//                       type="text"
//                       value={editAuctionItem.title}
//                       onChange={(e) => setEditAuctionItem({ ...editAuctionItem, title: e.target.value })}
//                     />
//                   </td>
//                   <td style={{ border: '1px solid black', padding: '10px' }}>
//                     <textarea
//                       value={editAuctionItem.description}
//                       onChange={(e) => setEditAuctionItem({ ...editAuctionItem, description: e.target.value })}
//                     />
//                   </td>
//                   <td style={{ border: '1px solid black', padding: '10px' }}>
//                     <input
//                       type="number"
//                       value={editAuctionItem.startingBid}
//                       onChange={(e) => setEditAuctionItem({ ...editAuctionItem, startingBid: e.target.value })}
//                     />
//                   </td>
//                   <td style={{ border: '1px solid black', padding: '10px' }}>
//                     <input
//                       type="date"
//                       value={editAuctionItem.endDate}
//                       onChange={(e) => setEditAuctionItem({ ...editAuctionItem, endDate: e.target.value })}
//                     />
//                   </td>
//                   <td style={{ border: '1px solid black', padding: '10px' }}>
//                     <button onClick={() => handleUpdateAuctionItem(item.id, editAuctionItem)}>Save</button>
//                     <button onClick={() => setEditAuctionItem(null)}>Cancel</button>
//                   </td>
//                 </>
//               ) : (
//                 <>
//                   <td style={{ border: '1px solid black', padding: '10px' }}>{item.title}</td>
//                   <td style={{ border: '1px solid black', padding: '10px' }}>{item.description}</td>
//                   <td style={{ border: '1px solid black', padding: '10px' }}>{item.startingBid}</td>
//                   <td style={{ border: '1px solid black', padding: '10px' }}>{item.endDate}</td>
//                   <td style={{ border: '1px solid black', padding: '10px' }}>
//                     <button onClick={() => setEditAuctionItem(item)}>Edit</button>
//                     <button onClick={() => handleDeleteAuctionItem(item.id)}>Delete</button>
//                   </td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [auctionItems, setAuctionItems] = useState([]);
  const [newAuctionItem, setNewAuctionItem] = useState({
    title: '',
    description: '',
    startingBid: '',
    endDate: '',
  });
  const [editAuctionItem, setEditAuctionItem] = useState(null);
  const [bidAmount, setBidAmount] = useState(''); // State for placing a bid
  const [currentBidItemId, setCurrentBidItemId] = useState(null); // Tracks the item being bid on
  const navigate = useNavigate();

  // Fetch auction items when the component loads
  useEffect(() => {
    fetchAuctionItems();
  }, []);

  // Function to fetch auction items
  const fetchAuctionItems = async () => {
    const token = localStorage.getItem('token'); // Retrieve the token
    if (!token) {
      console.error('No token found, please login.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3001/api/auction/getRecords', {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });
      setAuctionItems(response.data);
    } catch (error) {
      console.error('Error fetching auction items:', error);
    }
  };

  // Function to handle creating a new auction item
  const handleCreateAuctionItem = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, please login.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/api/auction/auction',
        newAuctionItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAuctionItems([...auctionItems, response.data]); // Update the auction items list
      setNewAuctionItem({ title: '', description: '', startingBid: '', endDate: '' }); // Clear form
    } catch (error) {
      console.error('Error creating auction item:', error);
    }
  };

  // Function to handle updating an auction item
  const handleUpdateAuctionItem = async (id, updatedItem) => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      console.error('No token found, please login.');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3001/api/auction/updateAuction/${id}`, 
        updatedItem,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );

      setAuctionItems(auctionItems.map(item => (item.id === id ? response.data : item))); // Update item in list
      setEditAuctionItem(null); // Exit edit mode
    } catch (error) {
      console.error('Error updating auction item:', error);
    }
  };

  // Function to handle deleting an auction item
  const handleDeleteAuctionItem = async (id) => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      console.error('No token found, please login.');
      return;
    }

    try {
      await axios.delete(`http://localhost:3001/api/auction/deleteAuction/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });

      // Remove the deleted item from the list
      setAuctionItems(auctionItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting auction item:', error);
    }
  };

  // Function to handle placing a bid
  const handlePlaceBid = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, please login.');
      return;
    }

    if (!bidAmount || bidAmount <= 0) {
      console.error('Bid amount must be greater than 0');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/api/user/placeBid`,
        { auctionItemId: id, bidAmount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Bid placed successfully:', response.data);
      // Clear bid input and reset item ID after placing bid
      setCurrentBidItemId(null);
      setBidAmount('');
      fetchAuctionItems(); // Refresh auction items to show updated bids
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/'); // Navigate back to login page
  };

  const handleUserProfileClick = () => {
    navigate('/user');
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <button onClick={handleLogout} style={{ float: 'center', padding: '10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px' }}>
        Logout
      </button>
      <button onClick={handleUserProfileClick} style={{ float: 'center', padding: '10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px' }}>
        User Profile
      </button>
      
      {/* Create New Auction Item */}
      <form onSubmit={handleCreateAuctionItem}>
        <h3>Create Auction Item</h3>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={newAuctionItem.title}
            onChange={(e) => setNewAuctionItem({ ...newAuctionItem, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={newAuctionItem.description}
            onChange={(e) => setNewAuctionItem({ ...newAuctionItem, description: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Starting Bid:</label>
          <input
            type="number"
            value={newAuctionItem.startingBid}
            onChange={(e) => setNewAuctionItem({ ...newAuctionItem, startingBid: e.target.value })}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={newAuctionItem.endDate}
            onChange={(e) => setNewAuctionItem({ ...newAuctionItem, endDate: e.target.value })}
            required
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>
          Create Auction
        </button>
      </form>

      {/* List of Auction Items */}
      <h3>Available Auction Items</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '10px' }}>Title</th>
            <th style={{ border: '1px solid black', padding: '10px' }}>Description</th>
            <th style={{ border: '1px solid black', padding: '10px' }}>Starting Bid</th>
            <th style={{ border: '1px solid black', padding: '10px' }}>End Date</th>
            <th style={{ border: '1px solid black', padding: '10px' }}>Actions</th>
            <th style={{ border: '1px solid black', padding: '10px' }}>Place Bid</th>
          </tr>
        </thead>
        <tbody>
          {auctionItems.map(item => (
            <tr key={item.id}>
              {editAuctionItem?.id === item.id ? (
                <>
                  <td style={{ border: '1px solid black', padding: '10px' }}>
                    <input
                      type="text"
                      value={editAuctionItem.title}
                      onChange={(e) => setEditAuctionItem({ ...editAuctionItem, title: e.target.value })}
                    />
                  </td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>
                    <textarea
                      value={editAuctionItem.description}
                      onChange={(e) => setEditAuctionItem({ ...editAuctionItem, description: e.target.value })}
                    />
                  </td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>
                    <input
                      type="number"
                      value={editAuctionItem.startingBid}
                      onChange={(e) => setEditAuctionItem({ ...editAuctionItem, startingBid: e.target.value })}
                    />
                  </td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>
                    <input
                      type="date"
                      value={editAuctionItem.endDate}
                      onChange={(e) => setEditAuctionItem({ ...editAuctionItem, endDate: e.target.value })}
                    />
                  </td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>
                    <button
                      onClick={() => handleUpdateAuctionItem(item.id, editAuctionItem)}
                      style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px' }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditAuctionItem(null)}
                      style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', marginLeft: '10px' }}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{item.title}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{item.description}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{item.startingBid}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{item.endDate}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>
                    <button
                      onClick={() => setEditAuctionItem(item)}
                      style={{ padding: '10px 20px', backgroundColor: 'orange', color: 'white', border: 'none', borderRadius: '5px' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAuctionItem(item.id)}
                      style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', marginLeft: '10px' }}
                    >
                      Delete
                    </button>
                  </td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>
                    {currentBidItemId === item.id ? (
                      <>
                        <input
                          type="number"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          placeholder="Enter your bid"
                          style={{ padding: '5px', width: '100px' }}
                        />
                        <button
                          onClick={() => handlePlaceBid(item.id)}
                          style={{ padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', marginLeft: '10px' }}
                        >
                          Submit
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setCurrentBidItemId(item.id)}
                        style={{ padding: '10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px' }}
                      >
                        Place Bid
                      </button>
                    )}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
