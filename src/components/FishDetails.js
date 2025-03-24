// components/FishDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFishById } from '../services/fishService';

function FishDetails() {
  const { id } = useParams();
  const [fish, setFish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFishDetails = async () => {
      try {
        const data = await getFishById(id);
        setFish(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load fish details');
        setLoading(false);
        console.error(err);
      }
    };

    loadFishDetails();
  }, [id]);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border"></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!fish) return <div className="alert alert-warning">Fish not found</div>;

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3>Fish Details</h3>
        <Link to={`/fish/${fish.id}/edit`} className="btn btn-warning">
          <i className="bi bi-pencil-square"></i> Módosítás
        </Link>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <table className="table">
              <tbody>
                <tr>
                  <th>ID:</th>
                  <td>{fish.id}</td>
                </tr>
                <tr>
                  <th>Név:</th>
                  <td>{fish.nev}</td>
                </tr>
                <tr>
                  <th>Fajok:</th>
                  <td>{fish.faj}</td>
                </tr>
                <tr>
                  <th>Méret (cm):</th>
                  <td>{fish.meretCm}</td>
                </tr>
                <tr>
                  <th>Tó ID:</th>
                  <td>{fish.toId}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-6 text-center">
            {fish.kep && (
              <img 
                src={`data:image/jpeg;base64,${fish.kep}`} 
                alt={fish.nev} 
                className="img-fluid rounded" 
                style={{ maxHeight: '300px' }} 
              />
            )}
          </div>
        </div>
      </div>
      <div className="card-footer">
        <Link to="/" className="btn btn-primary">Vissza a listához</Link>
      </div>
    </div>
  );
}

export default FishDetails;