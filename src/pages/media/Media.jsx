import React, { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { config } from '../../config/config';
import "./Media.css"
const Media = () => {
  const API_BASE_URL =config.baseURL;
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const [uploadStatus, setUploadStatus] = useState('');
  const [mediaList, setMediaList] = useState([]);
  const [mediaStats, setMediaStats] = useState(null);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [filters, setFilters] = useState({
    mimeType: '',
    search: '',
    sortOrder: 'desc'
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchMediaList = async () => {
    if (!authToken) {
      // alert("Please enter a JWT token");
      return;
    }
    setIsLoading(true);

    try {
      const { data } = await axios.get(`${API_BASE_URL}/media/list`, {
        headers: { Authorization: `Bearer ${authToken}` },
        params: {
          page: pagination.currentPage,
          limit: 10,
          ...filters
        }
      });

      setMediaList(data.media);
      setMediaStats(data.stats);
      setPagination({ currentPage: data.pagination.currentPage, totalPages: data.pagination.totalPages });
    } catch (error) {
      console.error("Error fetching media list:", error);
      setMediaList([]);
      setMediaStats(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileDrop = async (acceptedFiles) => {
    if (!authToken) {
      alert("Please enter a JWT token");
      return;
    }

    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    try {
      setUploadStatus(`Uploading ${acceptedFiles[0].name}...`);
      await axios.post(`${API_BASE_URL}/media/upload`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadStatus("Upload successful!");
      fetchMediaList();
    } catch (error) {
      setUploadStatus(`Upload failed: ${error.message}`);
    }
  };

  const deleteMedia = async (mediaId) => {
    if (!authToken) {
      alert("Please enter a JWT token");
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/media/${mediaId}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      fetchMediaList();
    } catch (error) {
      console.error("Error deleting media:", error);
    }
  };

  const clearToken = () => {
    setAuthToken('');
    localStorage.removeItem('authToken');
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchMediaList();
  }, [pagination.currentPage, filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">JWT Token</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={authToken}
            onChange={(e) => setAuthToken(e.target.value)}
            placeholder="Paste your JWT token here"
            className="flex-1 p-2 border rounded shadow-sm"
          />
          <button
            onClick={clearToken}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Token
          </button>
        </div>
      </div> */}

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold">Upload Media</h2>
        <Dropzone onDrop={handleFileDrop} accept=".jpg,.jpeg,.png,.gif,.mp4,.mp3,.ogg,.pdf">
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzone p-4 border border-dashed rounded">
              <input {...getInputProps()} />
              <p>Drop files here or click to upload</p>
              <p>(Maximum file size: 16MB)</p>
            </div>
          )}
        </Dropzone>
        <div id="uploadStatus" className="text-sm mt-2">{uploadStatus}</div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Media List</h2>
          <button
            onClick={fetchMediaList}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Refresh List
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <select
            name="mimeType"
            value={filters.mimeType}
            onChange={handleFilterChange}
            className="border rounded p-2"
          >
            <option value="">All Types</option>
            <option value="image/jpeg">JPEG Images</option>
            <option value="image/png">PNG Images</option>
            <option value="video/mp4">MP4 Videos</option>
            <option value="audio/mpeg">MP3 Audio</option>
            <option value="application/pdf">PDF Documents</option>
          </select>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search by name..."
            className="border rounded p-2"
          />
          <select
            name="sortOrder"
            value={filters.sortOrder}
            onChange={handleFilterChange}
            className="border rounded p-2"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Preview</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Size</th>
                <th className="px-4 py-2 text-left">Uploaded</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mediaList.map((item) => (
                <tr key={item.mediaId} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{/* Preview logic here */}</td>
                  <td className="px-4 py-2">{item.originalName}</td>
                  <td className="px-4 py-2">{item.mimeType}</td>
                  <td className="px-4 py-2">{item.size}</td>
                  <td className="px-4 py-2">{item.uploadedAt}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => deleteMedia(item.mediaId)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Media;
