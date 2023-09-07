/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../utils/context/authContext';
import PartForm from '../../components/forms/PartForm';
import { getCatalogParts, createPart, updatePart } from '../../api/partsData';
import CatalogPartCard from '../../components/CatalogPartCard';
import SelectedPartCard from '../../components/SelectedPartCard';

export default function AddPart() {
  const router = useRouter();
  const data = router.query;
  const { user } = useAuth();

  const [parts, setParts] = useState([]);
  const [selectedParts, setSelectedParts] = useState([]);
  const [partBool, setPartBool] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchResults(parts);
    const results = parts.filter((part) => part.name.toLowerCase().includes(searchTerm));
    setSearchResults(results);
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const partQuantity = (amount, partObj) => {
    const array = selectedParts;
    for (let i = 0; i < array.length; i++) {
      if (array[i].firebaseKey === partObj.firebaseKey) {
        array[i].quantity = amount;
      }
    }
    setSelectedParts(array);
  };

  const handleClick = (part) => {
    const check = selectedParts.find((partObj) => partObj.firebaseKey === part.firebaseKey);
    if (!check) {
      setSelectedParts((oldArray) => [...oldArray, part]);
    }
  };

  const removePart = (part) => {
    const partIndex = selectedParts.indexOf(part);
    if (partIndex > -1) {
      setSelectedParts(selectedParts.filter((item, i) => i !== partIndex));
    }
  };

  const getAllParts = () => {
    getCatalogParts().then(setParts);
  };

  const addParts = () => {
    selectedParts.forEach((part) => {
      const payload = {
        name: part.name, uid: user.uid, job_id: Object.keys(data)[0], cost: part.cost, quantity: part.quantity ? part.quantity : 1,
      };
      createPart(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name, id: name };
        updatePart(patchPayload).then(() => {
          router.push(`/jobs/${Object.keys(data)[0]}`);
        });
      });
    });
  };

  useEffect(() => {
    getAllParts();
  }, []);

  return (
    <>
      {
      partBool === true ? (
        <>
          <PartForm jobId={data} />
        </>
      ) : (
        <div>
          <div className="pageHead">
            <h1>Pick Parts</h1>
            <Button variant="primary" className="addBtn" onClick={addParts}>Add Selected Parts</Button>
            <Button variant="secondary" id="addOwnPartBtn" onClick={() => setPartBool(true)}>Add Your Own Part</Button>
          </div>
          <div id="selectedParts" className="d-flex flex-wrap">
            {
              selectedParts.length === 0 ? (
                <>
                </>
              ) : (
                <>
                  {selectedParts.map((part) => (
                    <SelectedPartCard key={part.firebaseKey} partObj={part} selectedParts={selectedParts} removePart={removePart} partQuantity={partQuantity} />
                  ))}
                </>
              )
            }
          </div>
          <h3>Parts Catalog</h3>
          <input
            type="text"
            placeholder="Search Parts"
            value={searchTerm}
            onChange={handleChange}
          />
          <br />
          <br />
          <div className="d-flex flex-wrap">
            {searchResults.length === 0 ? parts.map((part) => (
              <CatalogPartCard key={part.firebaseKey} partObj={part} selectedParts={selectedParts} handleClick={handleClick} />
            )) : searchResults.map((part) => (
              <CatalogPartCard key={part.firebaseKey} partObj={part} selectedParts={selectedParts} handleClick={handleClick} />
            ))}
          </div>
        </div>
      )
    }
    </>
  );
}
