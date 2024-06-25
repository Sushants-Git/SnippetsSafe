import React, { useState } from "react";

const MongoDB = () => {
  const [newData, setnewData] = useState("");
  const [fetchedData, setFetchedData] = useState(null);

  //   const handleSubmit = async () => {
  //     try {
  //       const dataToSubmit = {
  //         Data: newData,
  //       };

  //       // Define the post parameters
  //       const fetchParams = {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(dataToSubmit),
  //       };

  //       // Make the post request
  //       const response = await fetch(
  //         "https://asia-south1.gcp.data.mongodb-api.com/app/application-0-adzlt/endpoint/createData",
  //         fetchParams
  //       );
  //       const data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   const handleSubmit = async (codeSnippitData) => {
  //     try {
  //       const dataToSubmit = {
  //         Data: JSON.stringify(codeSnippitData),
  //       };

  //       // Define the post parameters
  //       const fetchParams = {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(dataToSubmit),
  //       };

  //       // Make the post request
  //       const response = await fetch(
  //         "https://asia-south1.gcp.data.mongodb-api.com/app/application-0-adzlt/endpoint/createData",
  //         fetchParams
  //       );
  //       const data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //delete function
  //   const handleDelete = async (objectId) => {
  //     try {
  //       // Construct the endpoint URL with the objectId parameter
  //       const endpointUrl = `https://asia-south1.gcp.data.mongodb-api.com/app/application-0-adzlt/endpoint/deleteData?id=${objectId}`;

  //       // Make the DELETE request to the endpoint
  //       const response = await fetch(endpointUrl, {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       // Check if the request was successful (status code 200)
  //       if (response.ok) {
  //         const deletedData = await response.json();
  //         console.log("Document deleted:", deletedData);

  //         // Update the UI or perform any other necessary actions
  //       } else {
  //         console.error("Failed to delete document:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //search function to fetch data

  //   const search = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://asia-south1.gcp.data.mongodb-api.com/app/application-0-adzlt/endpoint/fetchData"
  //       );
  //       const data2 = await response.json();

  //       const dataElements = data2.map((item, index) => (
  //         <div key={index}>
  //           <p>{item.Data}</p>
  //           <button onClick={() => handleDelete(item._id)}>Delete</button>
  //         </div>
  //       ));

  //       console.log(dataElements);
  //       setFetchedData(dataElements);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  return (
    <div>
      {/*       <label htmlFor="newData">Code Snippet:</label>
      <textarea
        type="text"
        id="newData"
        value={newData}
        onChange={(e) => setnewData(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={search}>Search</button>
      {fetchedData}  */}
    </div>
  );
};

const handleDelete = async (objectId) => {
  try {
    // Construct the endpoint URL with the objectId parameter
    const endpointUrl = `https://southeastasia.azure.data.mongodb-api.com/app/application-0-hgkxoce/endpoint/deleteData?id=${objectId}`;

    // Make the DELETE request to the endpoint
    const response = await fetch(endpointUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the request was successful (status code 200)
    if (response.ok) {
      const deletedData = await response.json();
      console.log("Document deleted:", deletedData);

      // Update the UI or perform any other necessary actions
    } else {
      console.error("Failed to delete document:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const handleSubmit = async (codeSnippitData) => {
  try {
    const dataToSubmit = {
      Data: JSON.stringify(codeSnippitData),
    };

    // Define the post parameters
    const fetchParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSubmit),
    };

    // Make the post request
    const response = await fetch(
      "https://southeastasia.azure.data.mongodb-api.com/app/application-0-hgkxoce/endpoint/createData",
      fetchParams,
    );
    const data = await response.json();
    return data.insertedId;
  } catch (error) {
    console.error("Error:", error);
  }
};

const search = async () => {
  try {
    const response = await fetch(
      "https://southeastasia.azure.data.mongodb-api.com/app/application-0-hgkxoce/endpoint/fetchData",
    );
    const data2 = await response.json();

    const dataElements = [];

    for (let i = 0; i < data2.length; i++) {
      const { Data, _id } = data2[i];
      if (!Data) continue;
      dataElements.push({ ...JSON.parse(Data), id: _id });
    }

    return dataElements;
  } catch (error) {
    console.error("Error:", error);
  }
};

export { MongoDB, handleSubmit, search, handleDelete };
