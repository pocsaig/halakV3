// components/EditFish.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFishById, updateFish } from '../services/fishService';

function EditFish() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [fish, setFish] = useState({
    id: '',
    nev: '',
    faj: '',
    meretCm: '',
    toId: '',
    kep: null
  });
  const [newImage, setNewImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    const loadFishDetails = async () => {
      try {
        const data = await getFishById(id);
        setFish(data);
        if (data.kep) {
          setPreviewUrl(`data:image/jpeg;base64,${data.kep}`);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load fish details');
        setLoading(false);
        console.error(err);
      }
    };

    loadFishDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFish(prevFish => ({
      ...prevFish,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewImage(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    
    try {
      // Create updated fish object
      const updatedFish = { ...fish };
      
      // Handle the image update
      if (newImage) {
        const reader = new FileReader();
        reader.readAsDataURL(newImage);
        
        reader.onload = async () => {
          // Convert base64 image to format expected by API
          const base64String = reader.result.split(',')[1];
          updatedFish.kep = base64String;
          
          try {
            await updateFish(id, updatedFish);
            navigate(`/fish/${id}`);
          } catch (err) {
            setSubmitError('Failed to update fish');
            console.error(err);
          }
        };
        
        reader.onerror = () => {
          setSubmitError('Error processing the image');
        };
      } else {
        // Update without changing the image
        await updateFish(id, updatedFish);
        navigate(`/fish/${id}`);
      }
    } catch (err) {
      setSubmitError('Failed to update fish');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border"></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card">
      <div className="card-header">
        <h3>Edit Fish</h3>
      </div>
      <div className="card-body">
        {submitError && (
          <div className="alert alert-danger mb-3">{submitError}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="nev" className="form-label">Név</label>
                <input
                  type="text"
                  className="form-control"
                  id="nev"
                  name="nev"
                  value={fish.nev || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="faj" className="form-label">Fajok</label>
                <input
                  type="text"
                  className="form-control"
                  id="faj"
                  name="faj"
                  value={fish.faj || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="meretCm" className="form-label">Méret (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  className="form-control"
                  id="meretCm"
                  name="meretCm"
                  value={fish.meretCm || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="toId" className="form-label">Tó ID</label>
                <input
                  type="number"
                  className="form-control"
                  id="toId"
                  name="toId"
                  value={fish.toId || ''}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="kep" className="form-label">Kép</label>
                <input
                  type="file"
                  className="form-control"
                  id="kep"
                  name="kep"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                <small className="form-text text-muted">Válassz ki egy másik képet ha megszeretnéd változtatni a jelenlegit</small>
              </div>
              {previewUrl && (
                <div className="text-center mt-3">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="img-fluid rounded" 
                    style={{ maxHeight: '200px' }} 
                  />
                </div>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => navigate(`/fish/${id}`)}
            >
              Mégse
            </button>
            <button type="submit" className="btn btn-primary">Változtatások mentése</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditFish;