// components/FishList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllFish } from '../services/fishService';

function FishList() {
  const [fish, setFish] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFish = async () => {
      try {
        const data = await fetchAllFish();
        setFish(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load fish data');
        setLoading(false);
        console.error(err);
      }
    };

    loadFish();
  }, []);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border"></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="row">
      <div className="col-12">
        <h2 className="mb-4">Fish List</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Név</th>
                <th>Fajok</th>
                <th>Méret (cm)</th>
                <th>Kép</th>
                <th>Műveletek</th>
              </tr>
            </thead>
            <tbody>
              {fish.map(fishItem => (
                <tr key={fishItem.id}>
                  <td>{fishItem.id}</td>
                  <td>{fishItem.nev}</td>
                  <td>{fishItem.faj}</td>
                  <td>{fishItem.meretCm} cm</td>
                  <td>
                    {fishItem.kep && (
                      <img 
                        src={`data:image/jpeg;base64,${fishItem.kep}`} 
                        alt={fishItem.nev} 
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                      />
                    )}
                  </td>
                  <td>
                    <Link to={`/fish/${fishItem.id}`} className="btn btn-sm btn-info me-2">
                      <i className="bi bi-text-paragraph"></i> Adatok
                    </Link>
                    <Link to={`/fish/${fishItem.id}/edit`} className="btn btn-sm btn-warning">
                      <i className="bi bi-pencil-square"></i> Módosítás
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FishList;