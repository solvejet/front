import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { config } from "../../config/config";
import "./Media.css";
import { UploadFile } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material"; // MUI Dialog components
// const token = localStorage.getItem("token");
const API_BASE_URL = config.baseURL;
const PreviewFile = ({ openPreview, previewMedia, setOpenPreview }) => {
  return (
    <Dialog
      open={openPreview}
      onClose={() => setOpenPreview(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Media Preview</DialogTitle>
      <DialogContent>
        {previewMedia && previewMedia.mimeType.startsWith("image") && (
          <img
            src={`${API_BASE_URL}/media/${previewMedia.mediaId}`}
            alt={previewMedia.originalName}
            className="w-full"
          />
        )}
        {previewMedia && previewMedia.mimeType.startsWith("audio") && (
          <audio controls className="w-full">
            <source
              src={`${API_BASE_URL}/media/${previewMedia.mediaId}`}
              type={previewMedia.mimeType}
            />
            Your browser does not support the audio element.
          </audio>
        )}
        {previewMedia && previewMedia.mimeType === "application/pdf" && (
          <iframe
            src={`${API_BASE_URL}/media/${previewMedia.mediaId}`}
            title={previewMedia.originalName}
            className="w-full h-96"
          />
        )}
      </DialogContent>
      <DialogActions>
        <button
          onClick={() => setOpenPreview(false)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </DialogActions>
    </Dialog>
  );
};
const Media = () => {
  const [uploadStatus, setUploadStatus] = useState("");
  const [mediaList, setMediaList] = useState([]);
  const [mediaStats, setMediaStats] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [filters, setFilters] = useState({
    mimeType: "image%2Fjpeg",
    search: "",
    sortOrder: "desc",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState();
  // State to control the modal visibility and the selected media
  const [openPreview, setOpenPreview] = useState(false);
  const [previewMedia, setPreviewMedia] = useState(null);
  const fetchMediaList = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // alert("Please enter a JWT token");
      return;
    }
    setIsLoading(true);

    try {
      const { data } = await axios.get(`${API_BASE_URL}/media/list`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page: pagination.currentPage,
          limit: 10,
        },
      });
      console.log(data);
      // was not working when below line was added
      //    ...filters,
      setMediaList(data.media);
      setMediaStats(data.stats);
      setPagination({
        currentPage: data.pagination.currentPage,
        totalPages: data.pagination.totalPages,
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching media list:", error);
      setMediaList([]);
      setMediaStats(null);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileDrop = async (acceptedFiles) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please enter a JWT token");
      return;
    }

    // Check if any file exceeds the 16MB size limit
    const maxSize = 16 * 1024 * 1024; // 16MB in bytes
    const filesExceedingSize = acceptedFiles.filter(
      (file) => file.size > maxSize
    );

    if (filesExceedingSize.length > 0) {
      // Alert if any file exceeds the size limit
      alert(
        "One or more files exceed the 16MB size limit. Please remove them."
      );

      // Optionally, you can filter out the files that exceed the size limit
      acceptedFiles = acceptedFiles.filter((file) => file.size <= maxSize);
    }

    // Set the files that passed the size check
    setUploadedFiles(acceptedFiles);
  };

  const deleteMedia = async (mediaId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please enter a JWT token");
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/media/${mediaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMediaList();
    } catch (error) {
      console.error("Error deleting media:", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchMediaList();
  }, [pagination.currentPage, filters]);
  const handleUpload = async (uploadedFiles) => {
    const token = localStorage.getItem("token");
    console.log(uploadedFiles);
    if (!uploadedFiles) {
      alert("please upload file");
      return;
    }
    // Create a new FormData instance
    const formData = new FormData();
    uploadedFiles.forEach((file) => {
      formData.append("files", file); // "files" is the key your backend might be expecting
    });

    try {
      setUploadStatus("Uploading files...");
      // Make a single request to upload all files
      await axios.post(`${API_BASE_URL}/media/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadStatus("All files uploaded successfully!");
      fetchMediaList();
    } catch (error) {
      setUploadStatus(`Upload failed: ${error.message}`);
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold">Upload Media</h2>
        <Dropzone
          onDrop={handleFileDrop}
          accept=".jpg,.jpeg,.png,.gif,.mp4,.mp3,.ogg,.pdf"
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="dropzone p-4 border border-dashed rounded"
            >
              <input {...getInputProps()} />
              <p>Drop files here or click to upload</p>
              <p>(Maximum file size: 16MB)</p>
            </div>
          )}
        </Dropzone>
        <div
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-[100px] cursor-pointer m-4"
          onClick={() => handleUpload(uploadedFiles)}
        >
          Upload
        </div>
        <div id="uploadStatus" className="text-sm mt-2">
          {uploadStatus}
        </div>
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
                  <td className="px-4 py-2">
                    {<VisibilityIcon onClick={() => setOpenPreview(true)} />}
                  </td>
                  <td className="px-4 py-2">{item.originalName}</td>
                  <td className="px-4 py-2">{item.mimeType}</td>
                  <td className="px-4 py-2">{item.size}</td>
                  <td className="px-4 py-2">{item?.meta?.uploadDate}</td>
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
      <PreviewFile openPreview={openPreview} setOpenPreview={setOpenPreview} />
    </div>
  );
};

export default Media;
